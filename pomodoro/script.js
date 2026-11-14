const languageUrl = new URL(window.location.href);
const languageParameter = languageUrl.searchParams.get('lang');
const language = languageParameter === 'en' ? 'en' : 'ja';

if (languageParameter !== null && language !== 'en') {
  languageUrl.searchParams.delete('lang');
  window.history.replaceState(null, '', `${languageUrl.pathname}${languageUrl.search}${languageUrl.hash}`);
}

document.documentElement.lang = language;

document.querySelectorAll('[data-tool-link]').forEach((link) => {
  const destination = link.getAttribute('href').split('?')[0];
  link.href = language === 'en' ? `${destination}?lang=en` : destination;
});

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

const translations = {
  ja: {
    title: 'ポモドーロ・テクニック',
    work: '集中',
    short: '休憩',
    long: '長休憩',
    modeLabel: 'モード',
    start: 'スタート',
    pause: '一時停止',
    resume: '再開',
    reset: 'リセット',
    completed: '完了した集中',
    resetCount: '回数をリセット',
    resetCountTitle: '回数をリセットしますか？',
    resetCountMessage: '完了した集中の回数を0にします。',
    confirmResetCount: 'リセットする',
    technique: '25分の集中と5分の休憩を1セットとして繰り返します。4セットごとに15分の長い休憩をとります。',
    switchLabel: 'フェーズの切り替え',
    autoOption: '自動',
    manualOption: '手動',
    autoLocked: 'モードは自動で切り替わります。変更するには手動にしてください。',
    switchRunningConfirm: 'タイマー動作中です。モードを切り替えるとリセットされます。よろしいですか？',
    switchRunningTitle: 'モードを切り替えますか？',
    cancel: 'キャンセル',
    confirmSwitch: '切り替える',
    statusWork: '集中の時間です。',
    statusShort: '休憩の時間です。',
    statusLong: '長めの休憩です。'
  },
  en: {
    title: 'Pomodoro Technique',
    work: 'Focus',
    short: 'Break',
    long: 'Long break',
    modeLabel: 'Mode',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    reset: 'Reset',
    completed: 'Completed focus sessions',
    resetCount: 'Reset count',
    resetCountTitle: 'Reset completed sessions?',
    resetCountMessage: 'The completed focus session count will be set to 0.',
    confirmResetCount: 'Reset count',
    technique: 'Repeat 25 minutes of focus and a 5-minute break as one set. After every 4 sets, take a 15-minute long break.',
    switchLabel: 'Phase switching',
    autoOption: 'Auto',
    manualOption: 'Manual',
    autoLocked: 'Modes switch automatically. Switch to manual to change them.',
    switchRunningConfirm: 'The timer is running. Switching modes will reset it. Continue?',
    switchRunningTitle: 'Switch modes?',
    cancel: 'Cancel',
    confirmSwitch: 'Switch',
    statusWork: 'Time to focus.',
    statusShort: 'Time for a break.',
    statusLong: 'Time for a longer break.'
  }
};

const notifications = (() => {
  const supported = typeof window.Notification !== 'undefined';

  function getPermission() {
    return supported ? window.Notification.permission : 'unsupported';
  }

  function request() {
    if (!supported) return Promise.resolve('unsupported');

    try {
      return window.Notification.requestPermission();
    } catch (error) {
      console.warn('Could not request notification permission.', error);
      return Promise.resolve('denied');
    }
  }

  function show(title, options = {}) {
    if (!supported || window.Notification.permission !== 'granted') return false;

    try {
      const notification = new window.Notification(title, {
        icon: '../icon.png',
        ...options
      });

      notification.addEventListener('click', () => {
        window.focus();
        notification.close();
      });

      return true;
    } catch (error) {
      console.warn('Could not show notification.', error);
      return false;
    }
  }

  return { supported, getPermission, request, show };
})();

const DURATIONS = {
  work: 25 * 60 * 1000,
  short: 5 * 60 * 1000,
  long: 15 * 60 * 1000
};

const STORAGE_KEY = 'time-tools-pomodoro-state-v1';

const display = document.getElementById('pomodoro-display');
const startButton = document.getElementById('pomodoro-start');
const resetButton = document.getElementById('pomodoro-reset');
const countResetButton = document.getElementById('pomodoro-count-reset');
const progress = document.getElementById('pomodoro-progress');
const statusMessage = document.getElementById('pomodoro-status');
const countDisplay = document.getElementById('pomodoro-count');
const tabs = Array.from(document.querySelectorAll('.mode-tab'));
const advanceTabs = Array.from(document.querySelectorAll('.advance-tab'));
const confirmOverlay = document.getElementById('pomodoro-confirm');
const confirmOkButton = document.getElementById('pomodoro-confirm-ok');
const confirmCancelButton = document.getElementById('pomodoro-confirm-cancel');
const countResetOverlay = document.getElementById('pomodoro-count-reset-confirm');
const countResetConfirmButton = document.getElementById('pomodoro-count-reset-confirm-ok');
const countResetCancelButton = document.getElementById('pomodoro-count-reset-confirm-cancel');

let mode = 'work';
let remaining = DURATIONS[mode];
let endAt = 0;
let intervalId = null;
let completed = 0;
let advanceMode = 'auto';
let restoredRunning = false;
let caughtUpWhileAway = false;
let audioContext = null;
let lockMessageTimer = null;
let pendingMode = null;
let lastFocusedElement = null;
let lastCountResetFocusedElement = null;

const t = (key) => translations[language][key];

function formatRemaining(milliseconds) {
  const totalSeconds = Math.ceil(Math.max(0, milliseconds) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function phaseStatusText() {
  return t(mode === 'work' ? 'statusWork' : mode === 'long' ? 'statusLong' : 'statusShort');
}

function render() {
  display.textContent = formatRemaining(remaining);
  const elapsed = 1 - remaining / DURATIONS[mode];
  progress.style.width = `${Math.min(100, Math.max(0, elapsed * 100))}%`;
  document.title = `${formatRemaining(remaining)} · ${t('title')} | Time Tools`;
}

function updateCountResetButton() {
  countResetButton.disabled = completed === 0;
}

function syncTabs() {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.mode === mode;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });
}

function syncAdvanceTabs() {
  advanceTabs.forEach((tab) => {
    const isActive = tab.dataset.advance === advanceMode;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-pressed', String(isActive));
  });

  const locked = advanceMode === 'auto';

  tabs.forEach((tab) => {
    tab.classList.toggle('is-locked', locked);
    tab.setAttribute('aria-disabled', String(locked));
  });
}

function ensureAudio() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContext) audioContext = new AudioContextClass();
    if (audioContext.state === 'suspended') audioContext.resume();
  } catch (error) {
    console.warn('Could not start audio.', error);
  }
}

function playAlert() {
  if (!audioContext) return;

  const start = audioContext.currentTime;

  [0, 0.18, 0.36].forEach((offset, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = index === 2 ? 880 : 660;

    gain.gain.setValueAtTime(0.0001, start + offset);
    gain.gain.exponentialRampToValueAtTime(0.18, start + offset + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + offset + 0.16);

    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(start + offset);
    oscillator.stop(start + offset + 0.18);
  });
}

function setStartButtonLabel(key) {
  startButton.textContent = t(key);
}

function saveState() {
  try {
    const running = intervalId !== null;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mode,
      remaining: running ? Math.max(0, endAt - Date.now()) : remaining,
      running,
      endAt: running ? endAt : 0,
      completed,
      advanceMode
    }));
  } catch (error) {
    console.warn('Could not save pomodoro state.', error);
  }
}

function loadState() {
  let saved = null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch (error) {
    console.warn('Could not restore pomodoro state.', error);
    return;
  }

  if (!saved || typeof saved !== 'object') return;

  if (saved.advanceMode === 'auto' || saved.advanceMode === 'manual') {
    advanceMode = saved.advanceMode;
  }

  if (Number.isFinite(saved.completed) && saved.completed >= 0) {
    completed = Math.floor(saved.completed);
  }

  if (saved.mode === 'work' || saved.mode === 'short' || saved.mode === 'long') {
    mode = saved.mode;
  }

  remaining = DURATIONS[mode];

  if (saved.running && Number.isFinite(saved.endAt)) {
    const left = saved.endAt - Date.now();

    if (left > 0) {
      remaining = left;
      endAt = saved.endAt;
      restoredRunning = true;
    } else {
      advancePhase(saved.mode);
      caughtUpWhileAway = true;
      statusMessage.textContent = phaseStatusText();
    }
  } else if (Number.isFinite(saved.remaining) && saved.remaining >= 0) {
    remaining = Math.min(saved.remaining, DURATIONS[mode]);
  }
}

function advancePhase(finishedMode) {
  if (finishedMode === 'work') {
    completed += 1;
    mode = completed % 4 === 0 ? 'long' : 'short';
  } else {
    mode = 'work';
  }

  remaining = DURATIONS[mode];
}

function startTimer() {
  if (intervalId !== null) return;

  endAt = Date.now() + remaining;
  intervalId = window.setInterval(tick, 200);

  ensureAudio();
  setStartButtonLabel('pause');
  startButton.classList.add('is-running');
  startButton.setAttribute('aria-pressed', 'true');
  render();
  saveState();
}

function pauseTimer() {
  if (intervalId === null) return;

  remaining = Math.max(0, endAt - Date.now());
  window.clearInterval(intervalId);
  intervalId = null;

  setStartButtonLabel('resume');
  startButton.classList.remove('is-running');
  startButton.setAttribute('aria-pressed', 'false');
  render();
  saveState();
}

function completePhase() {
  window.clearInterval(intervalId);
  intervalId = null;

  playAlert();
  advancePhase(mode);

  countDisplay.textContent = String(completed);
  updateCountResetButton();
  statusMessage.textContent = phaseStatusText();
  syncTabs();
  render();

  notifications.show(t('title'), {
    body: phaseStatusText(),
    tag: 'time-tools-pomodoro',
    requireInteraction: true
  });

  setStartButtonLabel('start');
  startButton.classList.remove('is-running');
  startButton.setAttribute('aria-pressed', 'false');
  saveState();

  if (advanceMode === 'auto') startTimer();
}

function tick() {
  remaining = Math.max(0, endAt - Date.now());

  if (remaining <= 0) {
    completePhase();
    return;
  }

  render();
}

function setMode(nextMode) {
  if (intervalId !== null) {
    window.clearInterval(intervalId);
    intervalId = null;
  }

  mode = nextMode;
  remaining = DURATIONS[mode];

  statusMessage.textContent = '';
  setStartButtonLabel('start');
  startButton.classList.remove('is-running');
  startButton.setAttribute('aria-pressed', 'false');

  syncTabs();
  render();
  saveState();
}

function setAdvanceMode(nextMode) {
  if (nextMode !== 'auto' && nextMode !== 'manual') return;

  advanceMode = nextMode;
  syncAdvanceTabs();
  saveState();
}

function closeConfirm() {
  if (!confirmOverlay || confirmOverlay.hidden) return;

  confirmOverlay.hidden = true;
  pendingMode = null;

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }

  lastFocusedElement = null;
}

function openModeConfirm(nextMode) {
  if (!confirmOverlay) return;

  pendingMode = nextMode;
  lastFocusedElement = document.activeElement;
  confirmOverlay.hidden = false;

  if (confirmCancelButton) confirmCancelButton.focus();
}

function closeCountResetConfirm() {
  if (!countResetOverlay || countResetOverlay.hidden) return;

  countResetOverlay.hidden = true;

  if (lastCountResetFocusedElement && typeof lastCountResetFocusedElement.focus === 'function') {
    lastCountResetFocusedElement.focus();
  }

  lastCountResetFocusedElement = null;
}

function openCountResetConfirm() {
  if (!countResetOverlay) return;

  lastCountResetFocusedElement = document.activeElement;
  countResetOverlay.hidden = false;

  if (countResetCancelButton) countResetCancelButton.focus();
}

if (confirmOkButton) {
  confirmOkButton.addEventListener('click', () => {
    const nextMode = pendingMode;
    closeConfirm();
    if (nextMode) setMode(nextMode);
  });
}

if (confirmCancelButton) {
  confirmCancelButton.addEventListener('click', closeConfirm);
}

if (confirmOverlay) {
  confirmOverlay.addEventListener('click', (event) => {
    if (event.target === confirmOverlay) closeConfirm();
  });
}

if (countResetConfirmButton) {
  countResetConfirmButton.addEventListener('click', () => {
    completed = 0;
    countDisplay.textContent = '0';
    updateCountResetButton();
    saveState();
    closeCountResetConfirm();
  });
}

if (countResetCancelButton) {
  countResetCancelButton.addEventListener('click', closeCountResetConfirm);
}

if (countResetOverlay) {
  countResetOverlay.addEventListener('click', (event) => {
    if (event.target === countResetOverlay) closeCountResetConfirm();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && confirmOverlay && !confirmOverlay.hidden) {
    event.preventDefault();
    closeConfirm();
  } else if (event.key === 'Escape' && countResetOverlay && !countResetOverlay.hidden) {
    event.preventDefault();
    closeCountResetConfirm();
  }
});

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = t(element.dataset.i18n);
    if (value !== undefined) element.textContent = value;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    const value = t(element.dataset.i18nAria);
    if (value !== undefined) element.setAttribute('aria-label', value);
  });

  document.title = `${t('title')} | Time Tools`;
}

startButton.addEventListener('click', () => {
  if (notifications.getPermission() === 'default') {
    notifications.request();
  }

  if (intervalId === null) startTimer();
  else pauseTimer();
});

resetButton.addEventListener('click', () => setMode(mode));

countResetButton.addEventListener('click', openCountResetConfirm);

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const nextMode = tab.dataset.mode;
    if (nextMode === mode) return;

    if (advanceMode === 'auto') {
      const message = t('autoLocked');
      statusMessage.textContent = message;

      if (lockMessageTimer !== null) window.clearTimeout(lockMessageTimer);
      lockMessageTimer = window.setTimeout(() => {
        if (statusMessage.textContent === message) statusMessage.textContent = '';
        lockMessageTimer = null;
      }, 3000);
      return;
    }

    if (intervalId !== null) {
      openModeConfirm(nextMode);
      return;
    }

    setMode(nextMode);
  });
});

advanceTabs.forEach((tab) => {
  tab.addEventListener('click', () => setAdvanceMode(tab.dataset.advance));
});

window.addEventListener('pagehide', saveState);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) saveState();
});

applyTranslations();
loadState();

countDisplay.textContent = String(completed);
updateCountResetButton();
syncTabs();
syncAdvanceTabs();

if (restoredRunning) {
  intervalId = window.setInterval(tick, 200);
  setStartButtonLabel('pause');
  startButton.classList.add('is-running');
  startButton.setAttribute('aria-pressed', 'true');
  render();
} else if (caughtUpWhileAway && advanceMode === 'auto') {
  startTimer();
} else {
  const partiallyElapsed = remaining > 0 && remaining < DURATIONS[mode];
  setStartButtonLabel(partiallyElapsed ? 'resume' : 'start');
  render();
}


