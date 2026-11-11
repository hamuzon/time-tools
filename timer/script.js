const translations = {
  ja: {
    title: 'タイマー',
    hours: '時',
    minutes: '分',
    seconds: '秒',
    start: 'スタート',
    pause: 'ストップ',
    resume: 'スタート',
    reset: 'リセット',
    settings: '設定',
    presetsLabel: 'タイマーの時間',
    preset10s: '10秒',
    preset30s: '30秒',
    preset1: '1分',
    preset3: '3分',
    preset5: '5分',
    preset10: '10分',
    preset25: '25分',
    alarmSound: '終了時の音',
    soundOff: 'オフ',
    soundOn: 'オン',
    displayFormat: '時間の表示',
    displayClock: '00:00:00形式',
    displayUnits: '時・分・秒',
    license: 'ライセンス',
    licenseDescription: '効果音ラボ',
    setTime: '時間を設定してください',
    soundError: '終了音を再生できませんでした。端末の音量をご確認ください。'
  },
  en: {
    title: 'Timer',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    start: 'Start',
    pause: 'Stop',
    resume: 'Start',
    reset: 'Reset',
    settings: 'Settings',
    presetsLabel: 'Timer presets',
    preset10s: '10 sec',
    preset30s: '30 sec',
    preset1: '1 min',
    preset3: '3 min',
    preset5: '5 min',
    preset10: '10 min',
    preset25: '25 min',
    alarmSound: 'Alarm sound',
    soundOff: 'Off',
    soundOn: 'On',
    displayFormat: 'Time display',
    displayClock: '00:00:00 format',
    displayUnits: 'Hours / minutes / seconds',
    license: 'License',
    licenseDescription: 'Sound Effect Lab',
    setTime: 'Set a duration to start',
    soundError: 'Could not play the alarm sound. Check your device volume.'
  }
};

const STORAGE_KEY = 'time-tools-timer-state-v1';
const MAX_DURATION_MS = (99 * 60 * 60 + 59 * 60 + 59) * 1000;
const languageUrl = new URL(window.location.href);
const languageParameter = languageUrl.searchParams.get('lang');
const language = languageParameter === 'en' ? 'en' : 'ja';
if (languageParameter !== null && language !== 'en') {
  languageUrl.searchParams.delete('lang');
  window.history.replaceState(null, '', `${languageUrl.pathname}${languageUrl.search}${languageUrl.hash}`);
}
document.documentElement.lang = language;
const display = document.getElementById('timer-display');
const toolPanel = document.querySelector('.timer-page .tool-panel');
const hoursInput = document.getElementById('timer-hours');
const minutesInput = document.getElementById('timer-minutes');
const secondsInput = document.getElementById('timer-seconds');
const status = document.getElementById('timer-status');
const startButton = document.getElementById('timer-start');
const pauseButton = document.getElementById('timer-pause');
const soundSelect = document.getElementById('timer-sound');
const displayFormatSelect = document.getElementById('timer-display-format');
const settingsToggle = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('timer-settings-panel');
const alarmAudio = new Audio('hatodokei1.mp3');
alarmAudio.preload = 'auto';
let durationMs = 0;
let remainingMs = durationMs;
let deadline = 0;
let intervalId = null;
let paused = false;
let completed = false;
let alarmSound = new URLSearchParams(window.location.search).get('alarm') === 'on' ? 'on' : 'off';
let displayFormat = new URLSearchParams(window.location.search).get('format') === 'units' ? 'units' : 'clock';

function formatTime(milliseconds) {
  const totalSeconds = Math.ceil(Math.max(0, milliseconds) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, '0'))
    .join(':');
}

function formatDurationLabel(milliseconds) {
  let totalSeconds = Math.ceil(Math.max(0, milliseconds) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (language === 'en') {
    return [
      hours ? `${hours} hour${hours === 1 ? '' : 's'}` : '',
      minutes ? `${minutes} min` : '',
      seconds ? `${seconds} sec` : ''
    ].filter(Boolean).join(' ') || '0 sec';
  }

  return [
    hours ? `${hours}時間` : '',
    minutes ? `${minutes}分` : '',
    seconds ? `${seconds}秒` : ''
  ].filter(Boolean).join('') || '0秒';
}

function updateRunningTitle() {
  const remainingLabel = displayFormat === 'units'
    ? formatDurationLabel(remainingMs)
    : formatTime(remainingMs);
  const durationLabel = formatDurationLabel(durationMs);
  const title = language === 'en'
    ? `${remainingLabel} ${durationLabel} Timer | Time Tools`
    : `${remainingLabel} ${durationLabel}タイマー | Time Tools`;
  if (document.title !== title) document.title = title;
}

function updateUrl(url) {
  const lang = url.searchParams.get('lang');
  if (lang !== null) {
    url.searchParams.delete('lang');
    url.searchParams.append('lang', lang);
  }
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      durationMs,
      remainingMs,
      deadline,
      running: intervalId !== null,
      paused,
      completed
    }));
  } catch (error) {
    console.warn('Could not save timer state.', error);
  }
}

function restoreState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const state = JSON.parse(saved);
    if (!Number.isFinite(state.durationMs) || state.durationMs < 0 || state.durationMs > MAX_DURATION_MS ||
        !Number.isFinite(state.remainingMs) || state.remainingMs < 0 || state.remainingMs > MAX_DURATION_MS ||
        typeof state.running !== 'boolean') {
      throw new Error('Saved timer state is invalid.');
    }

    durationMs = state.durationMs;
    remainingMs = state.running && Number.isFinite(state.deadline)
      ? Math.max(0, state.deadline - Date.now())
      : state.remainingMs;
    deadline = Number.isFinite(state.deadline) ? state.deadline : 0;
    paused = !state.running && state.paused === true;
    completed = state.completed === true || (state.running && remainingMs === 0);

    const totalSeconds = durationMs / 1000;
    hoursInput.value = String(Math.floor(totalSeconds / 3600));
    minutesInput.value = String(Math.floor(totalSeconds / 60) % 60);
    secondsInput.value = String(totalSeconds % 60);
  } catch (error) {
    console.warn('Could not restore timer state.', error);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (removeError) {
      console.warn('Could not clear invalid timer state.', removeError);
    }
  }
}

function updateDisplay() {
  const totalSeconds = Math.ceil(Math.max(0, remainingMs) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = totalSeconds % 60;
  if (displayFormat === 'units') {
    const formattedTime = formatDurationLabel(remainingMs);
    if (display.textContent !== formattedTime) display.textContent = formattedTime;
    delete display.dataset.formattedTime;
    display.classList.add('is-units');
  } else {
    const formattedTime = [hours, minutes, seconds]
      .map((part) => String(part).padStart(2, '0'))
      .join('<span class="time-colon" aria-hidden="true">:</span>');
    if (display.dataset.formattedTime !== formattedTime) {
      display.innerHTML = formattedTime;
      display.dataset.formattedTime = formattedTime;
    }
    display.classList.remove('is-units');
  }
  display.setAttribute('aria-label', formatTime(remainingMs));
  toolPanel.classList.toggle('is-complete', completed);
}

function getInputDurationSeconds() {
  return Math.min(
    MAX_DURATION_MS / 1000,
    Math.max(0,
      (Number(hoursInput.value) || 0) * 3600 +
      (Number(minutesInput.value) || 0) * 60 +
      (Number(secondsInput.value) || 0)
    )
  );
}

function updateInputDuration() {
  durationMs = getInputDurationSeconds() * 1000;
  remainingMs = durationMs;
  paused = false;
  completed = false;
  status.textContent = '';
  updateDisplay();
  saveState();
}

function readInputs() {
  updateInputDuration();
  let totalSeconds = durationMs / 1000;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  hoursInput.value = String(hours);
  minutesInput.value = String(Math.floor(totalSeconds / 60));
  secondsInput.value = String(totalSeconds % 60);
}

function stopInterval() {
  if (intervalId !== null) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
}

function setRunning(isRunning) {
  toolPanel.classList.toggle('is-running', isRunning);
  startButton.hidden = isRunning;
  pauseButton.hidden = !isRunning;
  pauseButton.disabled = !isRunning;
  pauseButton.setAttribute('aria-pressed', String(isRunning));
  hoursInput.disabled = isRunning;
  minutesInput.disabled = isRunning;
  secondsInput.disabled = isRunning;
  document.querySelectorAll('.preset-button').forEach((button) => {
    button.disabled = isRunning;
  });
}

function setCompletedControls(isCompleted) {
  startButton.hidden = isCompleted;
  pauseButton.hidden = !isCompleted;
  pauseButton.disabled = false;
  pauseButton.setAttribute('aria-pressed', 'false');
  startButton.textContent = translations[language].start;
}

function tick() {
  remainingMs = Math.max(0, deadline - Date.now());
  if (remainingMs === 0) {
    stopInterval();
    paused = false;
    completed = true;
    setRunning(false);
    setCompletedControls(true);
    status.textContent = '';
    document.title = `${translations[language].title} | Time Tools`;
    saveState();
    playAlarm();
  } else {
    updateRunningTitle();
  }
  updateDisplay();
}

function playAlarm() {
  if (alarmSound !== 'on') return;
  const ready = alarmAudio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA
    ? Promise.resolve()
    : new Promise((resolve, reject) => {
      alarmAudio.addEventListener('canplay', resolve, { once: true });
      alarmAudio.addEventListener('error', () => reject(alarmAudio.error ?? new Error('Audio could not be loaded.')), { once: true });
      alarmAudio.load();
    });

  ready
    .then(() => {
      alarmAudio.currentTime = 0;
      return alarmAudio.play();
    })
    .catch((error) => {
      console.warn('Could not play timer alarm.', error);
      status.textContent = translations[language].soundError;
    });
}

function setAlarmSound(value) {
  alarmSound = value === 'on' ? 'on' : 'off';
  soundSelect.value = alarmSound;
  if (alarmSound === 'off') {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
  } else {
    alarmAudio.load();
  }
  const url = new URL(window.location.href);
  if (alarmSound === 'off') url.searchParams.delete('alarm');
  else url.searchParams.set('alarm', 'on');
  updateUrl(url);
}

function setDisplayFormat(value) {
  displayFormat = value === 'units' ? 'units' : 'clock';
  displayFormatSelect.value = displayFormat;
  const url = new URL(window.location.href);
  if (displayFormat === 'clock') url.searchParams.delete('format');
  else url.searchParams.set('format', displayFormat);
  updateUrl(url);
  updateDisplay();
  if (intervalId !== null) updateRunningTitle();
}

function toggleSettings() {
  const isExpanded = settingsToggle.getAttribute('aria-expanded') === 'true';
  settingsToggle.setAttribute('aria-expanded', String(!isExpanded));
  settingsPanel.hidden = isExpanded;
}

function closeSettingsOnOutsideClick(event) {
  if (!event.target.closest('.timer-settings')) {
    settingsPanel.hidden = true;
    settingsToggle.setAttribute('aria-expanded', 'false');
  }
}

function startTimer() {
  if (intervalId !== null) return;
  if (!paused) readInputs();
  if (remainingMs <= 0) {
    status.textContent = translations[language].setTime;
    return;
  }
  paused = false;
  completed = false;
  deadline = Date.now() + remainingMs;
  setRunning(true);
  status.textContent = '';
  updateRunningTitle();
  tick();
  if (remainingMs > 0) {
    intervalId = window.setInterval(tick, 100);
    updateDisplay();
    saveState();
  }
}

function pauseTimer() {
  if (completed) {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    completed = false;
    setRunning(false);
    status.textContent = '';
    document.title = `${translations[language].title} | Time Tools`;
    updateDisplay();
    saveState();
    return;
  }
  if (intervalId === null) return;
  tick();
  if (intervalId === null) return;
  stopInterval();
  paused = true;
  setRunning(false);
  updateDisplay();
  startButton.textContent = translations[language].resume;
  saveState();
}

function resetTimer() {
  stopInterval();
  paused = false;
  completed = false;
  readInputs();
  setRunning(false);
  status.textContent = '';
  document.title = `${translations[language].title} | Time Tools`;
}

function setLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = translations[language][element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    const value = translations[language][element.dataset.i18nAria];
    if (value !== undefined) element.setAttribute('aria-label', value);
  });
  startButton.textContent = translations[language][paused ? 'resume' : 'start'];
  pauseButton.textContent = translations[language].pause;
  document.querySelectorAll('#timer-sound option[data-i18n]').forEach((option) => {
    option.textContent = translations[language][option.dataset.i18n];
  });
  document.querySelectorAll('#timer-display-format option[data-i18n]').forEach((option) => {
    option.textContent = translations[language][option.dataset.i18n];
  });
  updateDisplay();
  if (intervalId !== null) updateRunningTitle();
  else document.title = `${translations[language].title} | Time Tools`;
}

document.querySelectorAll('.preset-button').forEach((button) => {
  button.addEventListener('click', () => {
    stopInterval();
    paused = false;
    completed = false;
    const seconds = Number(button.dataset.seconds);
    hoursInput.value = '0';
    minutesInput.value = String(Math.floor(seconds / 60));
    secondsInput.value = String(seconds % 60);
    readInputs();
    setRunning(false);
  });
});
hoursInput.addEventListener('input', updateInputDuration);
minutesInput.addEventListener('input', updateInputDuration);
secondsInput.addEventListener('input', updateInputDuration);
hoursInput.addEventListener('change', readInputs);
minutesInput.addEventListener('change', readInputs);
secondsInput.addEventListener('change', readInputs);
hoursInput.addEventListener('blur', readInputs);
minutesInput.addEventListener('blur', readInputs);
secondsInput.addEventListener('blur', readInputs);
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
document.getElementById('timer-reset').addEventListener('click', resetTimer);
soundSelect.addEventListener('change', () => setAlarmSound(soundSelect.value));
displayFormatSelect.addEventListener('change', () => setDisplayFormat(displayFormatSelect.value));
settingsToggle.addEventListener('click', toggleSettings);
document.addEventListener('click', closeSettingsOnOutsideClick);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    settingsPanel.hidden = true;
    settingsToggle.setAttribute('aria-expanded', 'false');
  }
});

restoreState();
setLanguage();
setAlarmSound(alarmSound);
setDisplayFormat(displayFormat);
updateDisplay();
setRunning(false);
if (completed) {
  setCompletedControls(true);
  document.title = `${translations[language].title} | Time Tools`;
} else if (Number.isFinite(deadline) && deadline > Date.now() && remainingMs > 0 && !paused) {
  setRunning(true);
  intervalId = window.setInterval(tick, 100);
  tick();
} else {
  saveState();
}

(() => {
  const baseYear = 2026;
  const currentYear = new Date().getFullYear();
  const hostname = window.location.hostname;
  const footerElement = document.getElementById('footer-copy');
  const yearDisplay = currentYear > baseYear ? `${baseYear}–${currentYear}` : baseYear;
  let copyrightContent = '';

  if (hostname === 'hamuzon.github.io') {
    copyrightContent = `&copy; ${yearDisplay} <a href="https://hamuzon.github.io" target="_blank" rel="noopener noreferrer">@hamuzon</a> Time Tools`;
  } else if (hostname === 'hamusata.f5.si') {
    copyrightContent = `&copy; ${yearDisplay} <a href="https://hamusata.f5.si" target="_blank" rel="noopener noreferrer">@hamusata</a> Time Tools`;
  } else if (hostname === 'hamuzon-jp.f5.si') {
    copyrightContent = `&copy; ${yearDisplay} <a href="https://hamuzon-jp.f5.si" target="_blank" rel="noopener noreferrer">@hamuzon</a> Time Tools`;
  } else if (hostname === 'hamuzon.web.fc2.com') {
    copyrightContent = `&copy; ${yearDisplay} <a href="https://hamuzon.web.fc2.com" target="_blank" rel="noopener noreferrer">@hamuzon</a> Time Tools`;
  } else {
    copyrightContent = `&copy; ${yearDisplay} Time Tools`;
  }

  if (footerElement) footerElement.innerHTML = copyrightContent;
})();
