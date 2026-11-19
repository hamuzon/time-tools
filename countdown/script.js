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
    title: 'カウントダウン',
    targetLabel: '目標日時',
    targetInputLabel: '目標日時を設定',
    targetDateLabel: '日付',
    targetTimeLabel: '時刻',
    days: '日',
    hours: '時間',
    minutes: '分',
    seconds: '秒',
    reached: '設定した日時になりました。',
    presetEndOfDay: '今日の終わり',
    presetEndOfMonth: '今月の終わり',
    presetNewYear: '元旦'
  },
  en: {
    title: 'Countdown',
    targetLabel: 'Target',
    targetInputLabel: 'Set the target date and time',
    targetDateLabel: 'Date',
    targetTimeLabel: 'Time',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    reached: 'The target date and time has arrived.',
    presetEndOfDay: 'End of today',
    presetEndOfMonth: 'End of this month',
    presetNewYear: 'New Year'
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

const STORAGE_KEY = 'time-tools-countdown-target-v1';
const locale = language === 'en' ? 'en-US' : 'ja-JP';
const t = (key) => translations[language][key];

const dateInput = document.getElementById('countdown-date');
const timeInput = document.getElementById('countdown-time');
const targetLabel = document.getElementById('countdown-target-label');
const daysDisplay = document.getElementById('countdown-days');
const hoursDisplay = document.getElementById('countdown-hours');
const minutesDisplay = document.getElementById('countdown-minutes');
const secondsDisplay = document.getElementById('countdown-seconds');
const statusMessage = document.getElementById('countdown-status');

const targetFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

let target = loadTarget();
let audioContext = null;
let reachedNotified = false;

function pad(value) {
  return String(value).padStart(2, '0');
}

const supportsTimeSeconds = (() => {
  const probe = document.createElement('input');
  probe.type = 'time';
  probe.value = '00:00:00';
  return probe.value === '00:00:00';
})();

function toDateValue(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function toTimeValue(date) {
  const base = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return supportsTimeSeconds ? `${base}:${pad(date.getSeconds())}` : base;
}

function syncInputs(date) {
  dateInput.value = toDateValue(date);
  timeInput.value = toTimeValue(date);
}

function readInputs() {
  if (!dateInput.value || !timeInput.value) return null;

  const [year, month, day] = dateInput.value.split('-').map(Number);
  const [hours, minutes, seconds = 0] = timeInput.value.split(':').map(Number);

  if ([year, month, day, hours, minutes, seconds].some((value) => !Number.isFinite(value))) {
    return null;
  }

  const next = new Date(year, month - 1, day, hours, minutes, seconds, 0);

  if (
    next.getFullYear() !== year ||
    next.getMonth() !== month - 1 ||
    next.getDate() !== day ||
    next.getHours() !== hours ||
    next.getMinutes() !== minutes
  ) {
    return null;
  }

  return next;
}

function nextNewYear() {
  const now = new Date();
  return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
}

function loadTarget() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = new Date(raw);
      if (!Number.isNaN(saved.getTime())) return saved;
    }
  } catch (error) {
    console.warn('Could not restore countdown target.', error);
  }

  return nextNewYear();
}

function saveTarget() {
  try {
    window.localStorage.setItem(STORAGE_KEY, target.toISOString());
  } catch (error) {
    console.warn('Could not save countdown target.', error);
  }
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

function playChime() {
  if (!audioContext) return;

  const start = audioContext.currentTime;

  [660, 880, 990].forEach((frequency, index) => {
    const offset = index * 0.28;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, start + offset);
    gain.gain.exponentialRampToValueAtTime(0.16, start + offset + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + offset + 0.26);

    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(start + offset);
    oscillator.stop(start + offset + 0.3);
  });
}

function notifyReached() {
  notifications.show(t('title'), {
    body: targetFormatter.format(target),
    tag: 'time-tools-countdown',
    requireInteraction: true
  });
}

function updateDisplay() {
  const difference = target.getTime() - Date.now();

  targetLabel.textContent = targetFormatter.format(target);

  if (difference <= 0) {
    daysDisplay.textContent = '0';
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    statusMessage.textContent = t('reached');

    if (!reachedNotified) {
      reachedNotified = true;
      playChime();
      notifyReached();
    }

    return;
  }

  reachedNotified = false;

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysDisplay.textContent = String(days);
  hoursDisplay.textContent = pad(hours);
  minutesDisplay.textContent = pad(minutes);
  secondsDisplay.textContent = pad(seconds);
  statusMessage.textContent = '';
}

function setTarget(date) {
  target = date;
  reachedNotified = false;
  syncInputs(target);
  saveTarget();
  ensureAudio();

  if (notifications.getPermission() === 'default') {
    notifications.request();
  }

  updateDisplay();
}

[dateInput, timeInput].forEach((input) => {
  input.addEventListener('change', () => {
    const next = readInputs();
    if (!next) {
      syncInputs(target);
      return;
    }
    setTarget(next);
  });
});

document.querySelectorAll('[data-preset]').forEach((button) => {
  button.addEventListener('click', () => {
    const preset = button.dataset.preset;

    if (preset === 'endOfDay') {
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 0);
      setTarget(endOfDay);
    } else if (preset === 'endOfMonth') {
      const endOfMonth = new Date();
      endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 0);
      setTarget(endOfMonth);
    } else if (preset === 'newYear') {
      setTarget(nextNewYear());
    }
  });
});

document.querySelectorAll('[data-i18n]').forEach((element) => {
  const value = t(element.dataset.i18n);
  if (value !== undefined) element.textContent = value;
});

document.title = `${t('title')} | Time Tools`;

syncInputs(target);
updateDisplay();
window.setInterval(updateDisplay, 250);
