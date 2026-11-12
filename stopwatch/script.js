
const translations = {
  ja: {
    title: 'ストップウォッチ',
    start: 'スタート',
    pause: '一時停止',
    resume: '再開',
    lap: 'ラップ',
    reset: 'リセット',
    laps: 'ラップ',
    lapLabel: 'ラップ',
    lapColumn: 'ラップ',
    splitColumn: 'ラップ時間',
    totalColumn: '合計時間'
  },
  en: {
    title: 'Stopwatch',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    lap: 'Lap',
    reset: 'Reset',
    laps: 'Laps',
    lapLabel: 'Lap',
    lapColumn: 'Lap',
    splitColumn: 'Lap time',
    totalColumn: 'Total time'
  }
};

const STORAGE_KEY = 'time-tools-stopwatch-state-v1';
const languageUrl = new URL(window.location.href);
const languageParameter = languageUrl.searchParams.get('lang');
const language = languageParameter === 'en' ? 'en' : 'ja';

if (languageParameter !== null && language !== 'en') {
  languageUrl.searchParams.delete('lang');
  window.history.replaceState(null, '', `${languageUrl.pathname}${languageUrl.search}${languageUrl.hash}`);
}

document.documentElement.lang = language;

const display = document.getElementById('stopwatch-display');
const startButton = document.getElementById('stopwatch-start');
const lapButton = document.getElementById('stopwatch-lap');
const lapList = document.getElementById('lap-list');
const lapCount = document.getElementById('lap-count');
const resetButton = document.getElementById('stopwatch-reset');

let elapsedMs = 0;
let startedAt = 0;
let performanceStartedAt = 0;
let intervalId = null;
let previousLapMs = 0;
let laps = [];

function formatTime(milliseconds) {
  const centiseconds = Math.floor(Math.max(0, milliseconds) / 10);
  const totalSeconds = Math.floor(centiseconds / 100);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds % 100).padStart(2, '0')}`;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      elapsedMs,
      startedAt,
      running: intervalId !== null,
      previousLapMs,
      laps
    }));
  } catch (error) {
    console.warn('Could not save stopwatch state.', error);
  }
}

function restoreState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const state = JSON.parse(saved);

    if (!Number.isFinite(state.elapsedMs) || state.elapsedMs < 0 ||
        !Number.isFinite(state.previousLapMs) || state.previousLapMs < 0 ||
        typeof state.running !== 'boolean' || !Array.isArray(state.laps) ||
        (state.running && (!Number.isFinite(state.startedAt) || state.startedAt <= 0)) ||
        !state.laps.every((lap) => Number.isInteger(lap.number) && lap.number > 0 &&
          Number.isFinite(lap.split) && lap.split >= 0 &&
          Number.isFinite(lap.total) && lap.total >= 0)) {
      throw new Error('Saved stopwatch state is invalid.');
    }

    elapsedMs = state.running && Number.isFinite(state.startedAt)
      ? Math.max(state.elapsedMs, Date.now() - state.startedAt)
      : state.elapsedMs;

    startedAt = state.running && Number.isFinite(state.startedAt)
      ? state.startedAt
      : 0;

    performanceStartedAt = state.running
      ? performance.now() - elapsedMs
      : 0;

    previousLapMs = state.previousLapMs;
    laps = state.laps;

    if (state.running && startedAt > 0) {
      intervalId = window.setInterval(tick, 50);
    }
  } catch (error) {
    console.warn('Could not restore stopwatch state.', error);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (removeError) {
      console.warn('Could not clear invalid stopwatch state.', removeError);
    }
  }
}

function updateDisplay() {
  display.textContent = formatTime(elapsedMs);
}

function renderLaps() {
  lapCount.textContent = String(laps.length);
  lapList.replaceChildren();

  laps.forEach((lap) => {
    const item = document.createElement('li');
    item.className = 'lap-item';

    const number = document.createElement('span');
    number.className = 'lap-name';
    number.textContent = `${translations[language].lapLabel} ${lap.number}`;

    const split = document.createElement('span');
    split.className = 'lap-split';
    split.textContent = formatTime(lap.split);

    const total = document.createElement('strong');
    total.className = 'lap-total';
    total.textContent = formatTime(lap.total);

    item.append(number, split, total);
    lapList.append(item);
  });
}

function updateControlStyles() {
  const isRunning = intervalId !== null;

  startButton.style.backgroundColor = isRunning ? '#c62828' : '';
  startButton.style.color = isRunning ? '#fff' : '';
  lapButton.style.backgroundColor = isRunning ? '#2563a6' : '';
  lapButton.style.color = isRunning ? '#fff' : '';
}

function tick() {
  elapsedMs = Math.max(0, performance.now() - performanceStartedAt);
  updateDisplay();
}

function setLanguage() {
  document.documentElement.lang = language;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = translations[language][element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });

  startButton.textContent = translations[language][intervalId === null
    ? (elapsedMs > 0 ? 'resume' : 'start')
    : 'pause'];

  document.title = `${translations[language].title} | Time Tools`;
  renderLaps();
}

function startStopwatch() {
  if (intervalId !== null) return;

  startedAt = Date.now() - elapsedMs;
  performanceStartedAt = performance.now() - elapsedMs;

  startButton.textContent = translations[language].pause;
  startButton.classList.add('is-running');
  startButton.setAttribute('aria-pressed', 'true');

  lapButton.disabled = false;
  resetButton.disabled = false;

  updateControlStyles();
  tick();

  intervalId = window.setInterval(tick, 50);
  saveState();
}

function pauseStopwatch() {
  if (intervalId === null) return;

  tick();
  window.clearInterval(intervalId);
  intervalId = null;
  performanceStartedAt = 0;

  startButton.textContent = translations[language].resume;
  startButton.classList.remove('is-running');
  startButton.setAttribute('aria-pressed', 'false');

  lapButton.disabled = true;

  updateControlStyles();
  saveState();
}

function toggleStopwatch() {
  if (intervalId === null) startStopwatch();
  else pauseStopwatch();
}

function addLap() {
  if (intervalId === null) return;

  const split = elapsedMs - previousLapMs;

  laps.unshift({
    number: laps.length + 1,
    split,
    total: elapsedMs
  });

  previousLapMs = elapsedMs;

  renderLaps();
  saveState();
}

function resetStopwatch() {
  if (intervalId !== null) {
    window.clearInterval(intervalId);
    intervalId = null;
  }

  elapsedMs = 0;
  startedAt = 0;
  performanceStartedAt = 0;
  previousLapMs = 0;
  laps = [];

  updateDisplay();

  startButton.textContent = translations[language].start;
  startButton.classList.remove('is-running');
  startButton.setAttribute('aria-pressed', 'false');

  lapButton.disabled = true;
  resetButton.disabled = true;

  updateControlStyles();
  renderLaps();
  saveState();
}

startButton.addEventListener('click', toggleStopwatch);
lapButton.addEventListener('click', addLap);
resetButton.addEventListener('click', resetStopwatch);

restoreState();
setLanguage();
updateDisplay();

startButton.classList.toggle('is-running', intervalId !== null);
startButton.setAttribute('aria-pressed', String(intervalId !== null));

lapButton.disabled = intervalId === null;
resetButton.disabled = elapsedMs === 0 && laps.length === 0;

updateControlStyles();

if (intervalId === null) saveState();

(() => {
  const baseYear = 2026;
  const currentYear = new Date().getFullYear();
  const hostname = window.location.hostname;
  const footerElement = document.getElementById('footer-copy');
  const yearDisplay = currentYear > baseYear
    ? `${baseYear}–${currentYear}`
    : baseYear;

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
