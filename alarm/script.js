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
    title: 'アラーム',
    timeLabel: '時刻',
    dateLabel: '日付（任意）',
    datePast: '未来の日時を指定してください。',
    nameLabel: '名前（任意）',
    namePlaceholder: '起床',
    daysLabel: '繰り返す曜日',
    sun: '日',
    mon: '月',
    tue: '火',
    wed: '水',
    thu: '木',
    fri: '金',
    sat: '土',
    everyDay: '毎日',
    weekdays: '平日',
    weekend: '週末',
    add: '追加',
    save: '保存',
    cancel: 'キャンセル',
    testSound: '音をテスト',
    testStop: 'テストを停止',
    listTitle: 'アラーム一覧',
    empty: 'アラームはまだありません。',
    hint: 'アラームはこのページを開いている間だけ鳴ります。通知を許可すると、ほかのタブを見ていても知らせが届きます。',
    ringing: 'アラーム',
    stop: '停止',
    snooze: 'スヌーズ',
    snoozed: '5分後にもう一度鳴ります。',
    added: '{time} のアラームを追加しました。',
    enabled: '{time} のアラームを有効にしました。',
    invalid: '時刻を指定してください。',
    selectDay: '曜日を1つ以上選んでください。',
    deleteAria: 'このアラームを削除',
    toggleAria: 'このアラームのオン・オフ',
    editAria: 'このアラームを編集',
    updated: '{time} のアラームを更新しました。',
    duplicate: '同じ時刻と曜日のアラームがすでにあります。',
    enableNotifications: '通知を許可',
    notifyGranted: '通知は有効です。ほかのタブを見ていても知らせが届きます。',
    notifyDenied: '通知がブロックされています。ブラウザの設定から許可してください。',
    notifyPrompt: '通知を許可すると、ほかのタブを見ていても知らせが届きます。',
    nextRing: '次',
    finished: '終了',
    today: '今日',
    tomorrow: '明日',
    quickLabel: '今から設定',
    quick10s: '10秒後',
    quick30s: '30秒後',
    quick1m: '1分後',
    quick3m: '3分後',
    quick5: '5分後',
    quick10: '10分後',
    quick15: '15分後',
    quick30: '30分後',
    quick60: '1時間後',
    setTime: '{time} に設定しました。「追加」を押してください。',
    soundLabel: '通知音',
    soundBeep: 'ビープ',
    soundChime: 'チャイム',
    soundBell: 'ベル',
    soundAlarm: 'アラーム',
    soundDigital: 'デジタル',
    soundGong: 'ゴング',
    soundChirp: 'チャープ',
    soundNone: '音なし',
    soundCustom: 'カスタム',
    soundFileLabel: '音声ファイル',
    soundUrlLabel: '音声URL',
    soundTooLarge: '音声ファイルは{limit}MB以下にしてください。',
    soundPlayFailed: '音声を再生できませんでした。ファイル形式やブラウザの対応を確認してください。',
    soundLoaded: '{name} を読み込みました。',
    soundUrlInvalid: 'http(s) のURLを入力してください。',
    soundUrlLoaded: 'URLを設定しました。',
    soundSaveFailed: '音声ファイルを保存できませんでした。',
    soundRemoveAria: '選択中のカスタム音を削除',
    soundRemoved: 'カスタム音を削除しました。',
    notifyLabel: '通知する',
    once: '1回だけ',
    addedOnce: '{time} に1回だけ鳴ります。'
  },
  en: {
    title: 'Alarm',
    timeLabel: 'Time',
    dateLabel: 'Date (optional)',
    datePast: 'Choose a future date and time.',
    nameLabel: 'Name (optional)',
    namePlaceholder: 'Wake up',
    daysLabel: 'Repeat on',
    sun: 'Sun',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    everyDay: 'Every day',
    weekdays: 'Weekdays',
    weekend: 'Weekends',
    add: 'Add',
    save: 'Save',
    cancel: 'Cancel',
    testSound: 'Test sound',
    testStop: 'Stop test',
    listTitle: 'Alarms',
    empty: 'No alarms yet.',
    hint: 'Alarms only ring while this page stays open. Allow notifications to be alerted while you are in another tab.',
    ringing: 'Alarm',
    stop: 'Stop',
    snooze: 'Snooze',
    snoozed: 'It will ring again in 5 minutes.',
    added: 'Alarm set for {time}.',
    enabled: 'Alarm at {time} is enabled.',
    invalid: 'Please choose a time.',
    selectDay: 'Select at least one day.',
    deleteAria: 'Delete this alarm',
    toggleAria: 'Turn this alarm on or off',
    editAria: 'Edit this alarm',
    updated: 'Alarm at {time} updated.',
    duplicate: 'An alarm with the same time and days already exists.',
    enableNotifications: 'Allow notifications',
    notifyGranted: 'Notifications are on. You will be alerted from other tabs too.',
    notifyDenied: 'Notifications are blocked. Allow them in your browser settings.',
    notifyPrompt: 'Allow notifications to be alerted while you are in another tab.',
    nextRing: 'Next',
    finished: 'Finished',
    today: 'Today',
    tomorrow: 'Tomorrow',
    quickLabel: 'Set from now',
    quick10s: '+10 sec',
    quick30s: '+30 sec',
    quick1m: '+1 min',
    quick3m: '+3 min',
    quick5: '+5 min',
    quick10: '+10 min',
    quick15: '+15 min',
    quick30: '+30 min',
    quick60: '+1 hour',
    setTime: 'Time set to {time}. Press Add to create the alarm.',
    soundLabel: 'Sound',
    soundBeep: 'Beep',
    soundChime: 'Chime',
    soundBell: 'Bell',
    soundAlarm: 'Alarm',
    soundDigital: 'Digital',
    soundGong: 'Gong',
    soundChirp: 'Chirp',
    soundNone: 'Silent',
    soundCustom: 'Custom',
    soundFileLabel: 'Sound file',
    soundUrlLabel: 'Sound URL',
    soundTooLarge: 'Choose an audio file no larger than {limit} MB.',
    soundPlayFailed: 'Could not play this audio. Check the file format and browser support.',
    soundLoaded: 'Loaded {name}.',
    soundUrlInvalid: 'Enter an http(s) URL.',
    soundUrlLoaded: 'Sound URL set.',
    soundSaveFailed: 'Could not save the sound file.',
    soundRemoveAria: 'Remove the selected custom sound',
    soundRemoved: 'Custom sound removed.',
    notifyLabel: 'Notify',
    once: 'Once',
    addedOnce: 'One-time alarm set for {time}.'
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

const STORAGE_KEY = 'time-tools-alarms-v1';
const CUSTOM_SOUNDS_KEY = 'time-tools-alarm-custom-sounds-v1';
const CUSTOM_SOUND_NAMES_KEY = 'time-tools-alarm-custom-sound-names-v1';
const SOUND_DB_NAME = 'time-tools-alarm-sounds-v1';
const SOUND_DB_STORE = 'files';
const MAX_SOUND_FILE_BYTES = 20 * 1024 * 1024;
const SNOOZE_MS = 5 * 60 * 1000;
const ONCE_WINDOW_MS = 90 * 1000;
const DEFAULT_FIXED_TIMES = ['06:00', '07:00', '08:00', '09:00', '12:00', '18:00', '21:00', '22:00'];
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const SOUND_KEYS = ['beep', 'chime', 'bell', 'alarm', 'digital', 'gong', 'chirp', 'none'];
const SOUND_LABEL_KEYS = {
  beep: 'soundBeep',
  chime: 'soundChime',
  bell: 'soundBell',
  alarm: 'soundAlarm',
  digital: 'soundDigital',
  gong: 'soundGong',
  chirp: 'soundChirp',
  none: 'soundNone'
};
const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];
const locale = language === 'en' ? 'en-US' : 'ja-JP';

const list = document.getElementById('alarm-list');
const countBadge = document.getElementById('alarm-count');
const timeInput = document.getElementById('alarm-time');
const dateInput = document.getElementById('alarm-date');
const labelInput = document.getElementById('alarm-label');
const soundSelect = document.getElementById('alarm-sound');
const soundRemoveButton = document.getElementById('alarm-sound-remove');
const soundFileInput = document.getElementById('alarm-sound-file');
const soundUrlInput = document.getElementById('alarm-sound-url');
const notifyInput = document.getElementById('alarm-notify');
const addButton = document.getElementById('alarm-add');
const cancelButton = document.getElementById('alarm-cancel');
const testButton = document.getElementById('alarm-test');
const statusMessage = document.getElementById('alarm-status');
const notifyRow = document.getElementById('notify-row');
const notifyStatus = document.getElementById('notify-status');
const notifyButton = document.getElementById('notify-enable');
const overlay = document.getElementById('alarm-overlay');
const ringingTime = document.getElementById('alarm-ringing-time');
const ringingLabel = document.getElementById('alarm-ringing-label');
const stopButton = document.getElementById('alarm-stop');
const snoozeButton = document.getElementById('alarm-snooze');
const dayChips = Array.from(document.querySelectorAll('[data-day]'));
const fixedList = document.getElementById('quick-fixed-list');

const t = (key) => translations[language][key];

const dayFormatter = new Intl.DateTimeFormat(locale, {
  month: 'numeric',
  day: 'numeric',
  weekday: 'short'
});

let alarms = loadAlarms();
const fixedTimes = DEFAULT_FIXED_TIMES.slice();
let selectedDays = new Set(ALL_DAYS);
let editingId = null;
let ringing = false;
let ringingInfo = { time: '', label: '' };
let pendingFireAt = 0;
let snoozeUntil = 0;
let snoozeInfo = { time: '', label: '' };
let audioContext = null;
let soundTimer = null;
let customAudio = null;
let previewAudio = null;
let previewTimer = null;
let testPlaying = false;
let testTimer = null;
let testAudio = null;
let customSounds = loadCustomSounds();
let customSoundNames = loadCustomSoundNames();
let indexedDbSoundKeys = new Set();
let customSoundRestorePromise = Promise.resolve();
const firedMinutes = new Map();

function createId() {
  return `alarm-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function normalizeTime(value) {
  const match = /^(\d{2}):(\d{2})(?::\d{2})?$/.exec(value || '');
  return match ? `${match[1]}:${match[2]}` : '';
}

function parseDateInput(dateValue, time) {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue || '');
  const timeMatch = /^(\d{2}):(\d{2})/.exec(time || '');

  if (!dateMatch || !timeMatch) return null;

  const date = new Date(
    Number(dateMatch[1]),
    Number(dateMatch[2]) - 1,
    Number(dateMatch[3]),
    Number(timeMatch[1]),
    Number(timeMatch[2]),
    0,
    0
  );

  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeDays(value) {
  if (!Array.isArray(value)) return ALL_DAYS.slice();

  const days = Array.from(new Set(
    value.filter((day) => Number.isInteger(day) && day >= 0 && day <= 6)
  )).sort((a, b) => a - b);

  return days.length > 0 ? days : ALL_DAYS.slice();
}

function loadAlarms() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && typeof item.time === 'string' && /^\d{2}:\d{2}$/.test(item.time))
      .map((item) => {
        const fireAt = Number(item.fireAt);
        const once = item.once === true && Number.isFinite(fireAt) && fireAt > 0;

        return {
          id: typeof item.id === 'string' ? item.id : createId(),
          time: item.time,
          label: typeof item.label === 'string' ? item.label.slice(0, 24) : '',
          days: normalizeDays(item.days),
          enabled: item.enabled !== false,
          once,
          fireAt: once ? fireAt : 0,
          completed: once && item.completed === true,
          sound: typeof item.sound === 'string' && item.sound ? item.sound : 'beep',
          notify: item.notify !== false
        };
      });
  } catch (error) {
    console.warn('Could not restore alarms.', error);
    return [];
  }
}

function saveAlarms() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
  } catch (error) {
    console.warn('Could not save alarms.', error);
  }
}

function loadCustomSounds() {
  try {
    const raw = window.localStorage.getItem(CUSTOM_SOUNDS_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    console.warn('Could not restore custom sounds.', error);
    return {};
  }
}

function loadCustomSoundNames() {
  try {
    const raw = window.localStorage.getItem(CUSTOM_SOUND_NAMES_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return {};
  }
}

function saveCustomSounds(sounds = customSounds, names = customSoundNames) {
  try {
    const storedSounds = Object.fromEntries(
      Object.entries(sounds).filter(([key, source]) => (
        typeof source === 'string' &&
        (!source.startsWith('data:audio/') || !indexedDbSoundKeys.has(key))
      ))
    );
    window.localStorage.setItem(CUSTOM_SOUNDS_KEY, JSON.stringify(storedSounds));
    window.localStorage.setItem(CUSTOM_SOUND_NAMES_KEY, JSON.stringify(names));
    return true;
  } catch (error) {
    console.warn('Could not save custom sounds.', error);
    return false;
  }
}

function openSoundDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not available.'));
      return;
    }

    const request = window.indexedDB.open(SOUND_DB_NAME, 1);
    request.addEventListener('upgradeneeded', () => {
      if (!request.result.objectStoreNames.contains(SOUND_DB_STORE)) {
        request.result.createObjectStore(SOUND_DB_STORE, { keyPath: 'key' });
      }
    });
    request.addEventListener('success', () => resolve(request.result), { once: true });
    request.addEventListener('error', () => {
      reject(request.error || new Error('Could not open the sound database.'));
    }, { once: true });
  });
}

async function runSoundTransaction(mode, operation) {
  const database = await openSoundDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(SOUND_DB_STORE, mode);
    const request = operation(transaction.objectStore(SOUND_DB_STORE));
    let result;

    if (request) {
      request.addEventListener('success', () => {
        result = request.result;
      }, { once: true });
    }

    transaction.addEventListener('complete', () => {
      database.close();
      resolve(result);
    }, { once: true });
    transaction.addEventListener('abort', () => {
      database.close();
      reject(transaction.error || new Error('Sound database transaction was aborted.'));
    }, { once: true });
    transaction.addEventListener('error', () => {
      database.close();
      reject(transaction.error || new Error('Sound database transaction failed.'));
    }, { once: true });
  });
}

function getStoredSoundFiles() {
  return runSoundTransaction('readonly', (store) => store.getAll());
}

function storeSoundFile(key, source) {
  return runSoundTransaction('readwrite', (store) => store.put({ key, source }));
}

function deleteStoredSoundFile(key) {
  return runSoundTransaction('readwrite', (store) => store.delete(key));
}

async function restoreCustomFileSounds() {
  try {
    const files = await getStoredSoundFiles();
    const storedSources = new Map();

    files.forEach((file) => {
      if (
        file &&
        typeof file.key === 'string' &&
        typeof file.source === 'string' &&
        file.source.startsWith('data:audio/')
      ) {
        storedSources.set(file.key, file.source);
      }
    });

    indexedDbSoundKeys = new Set(storedSources.keys());

    const legacyFiles = Object.entries(customSounds).filter(
      ([, source]) => typeof source === 'string' && source.startsWith('data:audio/')
    );

    for (const [key, source] of legacyFiles) {
      if (!storedSources.has(key)) {
        await storeSoundFile(key, source);
        indexedDbSoundKeys.add(key);
        storedSources.set(key, source);
      }
    }

    customSounds = { ...customSounds, ...Object.fromEntries(storedSources) };

    if (legacyFiles.length > 0 && !saveCustomSounds()) {
      throw new Error('Could not migrate legacy custom sounds from localStorage.');
    }

    refreshCustomSoundOption();
    return true;
  } catch (error) {
    console.warn('Could not restore custom sound files.', error);
    return false;
  }
}

function readSoundFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('The selected sound file could not be read.'));
      }
    }, { once: true });
    reader.addEventListener('error', () => {
      reject(reader.error || new Error('The selected sound file could not be read.'));
    }, { once: true });
    reader.readAsDataURL(file);
  });
}

function customSoundSource(sound) {
  if (typeof sound !== 'string') return '';

  if (sound.startsWith('custom:')) {
    const key = sound.slice(7);
    return typeof customSounds[key] === 'string' ? customSounds[key] : '';
  }

  if (/^(https?:|data:audio\/|blob:)/.test(sound)) return sound;

  return '';
}

function refreshCustomSoundOption() {
  if (!soundSelect) return;

  soundSelect.querySelectorAll('option[data-custom]').forEach((option) => option.remove());

  const keys = Object.keys(customSounds).filter(
    (key) => typeof customSounds[key] === 'string' && customSounds[key] !== ''
  );

  keys.forEach((key) => {
    const option = document.createElement('option');
    option.value = `custom:${key}`;
    option.dataset.custom = 'true';

    const name = customSoundNames[key] || key;
    option.textContent = `${t('soundCustom')}: ${name}`;
    soundSelect.append(option);
  });

  if (soundSelect.value.startsWith('custom:')) {
    const exists = keys.some((key) => `custom:${key}` === soundSelect.value);
    if (!exists) soundSelect.value = 'beep';
  }

  updateSoundRemoveButton();
}

function scheduleText(alarm) {
  if (alarm.once) {
    if (alarm.fireAt) return `${t('once')} · ${dayFormatter.format(new Date(alarm.fireAt))}`;
    return t('once');
  }

  const days = alarm.days;

  if (days.length === 7) return t('everyDay');
  if (days.length === 5 && days.every((day) => day >= 1 && day <= 5)) return t('weekdays');
  if (days.length === 2 && days.includes(0) && days.includes(6)) return t('weekend');

  return days.map((day) => t(DAY_KEYS[day])).join('・');
}

function nextRingDate(alarm) {
  const now = new Date();
  const [hours, minutes] = alarm.time.split(':').map(Number);

  for (let offset = 0; offset <= 8; offset += 1) {
    const candidate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + offset,
      hours,
      minutes,
      0,
      0
    );

    if (candidate.getTime() <= now.getTime()) continue;
    if (!alarm.days.includes(candidate.getDay())) continue;

    return candidate;
  }

  return null;
}

function relativeDay(date) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const difference = Math.round((targetStart.getTime() - todayStart.getTime()) / 86400000);

  if (difference === 0) return t('today');
  if (difference === 1) return t('tomorrow');

  return dayFormatter.format(date);
}

function nextRingText(alarm) {
  if (alarm.once) {
    if (alarm.completed) return t('finished');
    if (!alarm.fireAt || alarm.fireAt <= Date.now()) return '';

    const next = new Date(alarm.fireAt);
    return `${t('nextRing')} ${relativeDay(next)} ${pad(next.getHours())}:${pad(next.getMinutes())}:${pad(next.getSeconds())}`;
  }

  const next = nextRingDate(alarm);
  if (!next) return '';

  return `${t('nextRing')} ${relativeDay(next)} ${pad(next.getHours())}:${pad(next.getMinutes())}`;
}

function syncDayChips() {
  dayChips.forEach((chip) => {
    const isActive = selectedDays.has(Number(chip.dataset.day));
    chip.classList.toggle('is-active', isActive);
    chip.setAttribute('aria-pressed', String(isActive));
  });
}

function renderAlarms() {
  list.replaceChildren();
  countBadge.textContent = String(alarms.length);

  if (alarms.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'alarm-empty';
    empty.textContent = t('empty');
    list.append(empty);
    return;
  }

  alarms
    .slice()
    .sort((a, b) => {
      if (a.once && b.once) return a.fireAt - b.fireAt;
      if (a.once !== b.once) return a.once ? -1 : 1;
      return a.time.localeCompare(b.time);
    })
    .forEach((alarm) => {
      const item = document.createElement('li');
      item.className = 'alarm-item';

      if (!alarm.enabled) item.classList.add('is-off');
      if (alarm.id === editingId) item.classList.add('is-editing');

      const main = document.createElement('div');
      main.className = 'alarm-main';

      const line = document.createElement('div');
      line.className = 'alarm-time-line';

      const time = document.createElement('span');
      time.className = 'alarm-time';
      time.textContent = displayTime(alarm);

      line.append(time);

      if (alarm.label) {
        const label = document.createElement('span');
        label.className = 'alarm-label';
        label.textContent = alarm.label;
        line.append(label);
      }

      const schedule = document.createElement('span');
      schedule.className = 'alarm-every';
      schedule.textContent = `${scheduleText(alarm)} · ${nextRingText(alarm)}`;

      const meta = document.createElement('span');
      meta.className = 'alarm-meta';

      const soundLabel = SOUND_LABEL_KEYS[alarm.sound]
        ? t(SOUND_LABEL_KEYS[alarm.sound])
        : typeof alarm.sound === 'string' && alarm.sound.startsWith('custom:')
          ? t('soundCustom')
          : t('soundBeep');

      meta.textContent = `${alarm.notify ? '🔔' : '🔕'} ${soundLabel}`;

      main.append(line, schedule, meta);

      const actions = document.createElement('div');
      actions.className = 'alarm-actions';

      const toggle = document.createElement('label');
      toggle.className = 'switch';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = alarm.enabled;
      checkbox.disabled = alarm.once && alarm.completed;
      checkbox.setAttribute('aria-label', t('toggleAria'));
      checkbox.addEventListener('change', () => {
        alarm.enabled = checkbox.checked;
        saveAlarms();
        renderAlarms();
      });

      const track = document.createElement('span');
      track.className = 'switch-track';

      toggle.append(checkbox, track);

      const edit = document.createElement('button');
      edit.type = 'button';
      edit.className = 'icon-button is-edit';
      edit.textContent = '✎';
      edit.setAttribute('aria-label', t('editAria'));
      edit.addEventListener('click', () => startEdit(alarm));

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'icon-button';
      remove.textContent = '×';
      remove.setAttribute('aria-label', t('deleteAria'));
      remove.addEventListener('click', () => {
        alarms = alarms.filter((entry) => entry.id !== alarm.id);
        statusMessage.textContent = '';
        saveAlarms();
        renderAlarms();
      });

      actions.append(toggle, edit, remove);
      item.append(main, actions);
      list.append(item);
    });
}

function updateNotifyRow() {
  if (!notifications.supported) {
    notifyRow.hidden = true;
    return;
  }

  const permission = notifications.getPermission();
  notifyRow.hidden = false;

  if (permission === 'granted') {
    notifyStatus.textContent = t('notifyGranted');
    notifyButton.hidden = true;
  } else if (permission === 'denied') {
    notifyStatus.textContent = t('notifyDenied');
    notifyButton.hidden = true;
  } else {
    notifyStatus.textContent = t('notifyPrompt');
    notifyButton.hidden = false;
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

function playTone(frequency, offset, duration, volume, type = 'sine') {
  if (!audioContext) return;

  const start = audioContext.currentTime + offset;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function playSound(sound) {
  if (!audioContext || sound === 'none') return;

  if (sound === 'chime') {
    playTone(660, 0, 0.3, 0.18);
    playTone(880, 0.18, 0.3, 0.18);
    playTone(1046, 0.36, 0.45, 0.2);
  } else if (sound === 'bell') {
    playTone(523, 0, 0.5, 0.2);
    playTone(1046, 0.02, 0.5, 0.1);
  } else if (sound === 'alarm') {
    playTone(660, 0, 0.2, 0.2);
    playTone(880, 0.22, 0.2, 0.2);
    playTone(1100, 0.44, 0.2, 0.2);
    playTone(880, 0.66, 0.2, 0.2);
  } else if (sound === 'digital') {
    playTone(1500, 0, 0.07, 0.16, 'square');
    playTone(1500, 0.12, 0.07, 0.16, 'square');
    playTone(1500, 0.24, 0.07, 0.16, 'square');
    playTone(1900, 0.38, 0.1, 0.16, 'square');
  } else if (sound === 'gong') {
    playTone(196, 0, 1.3, 0.22);
    playTone(294, 0.02, 1.1, 0.12);
    playTone(392, 0.04, 0.85, 0.08);
  } else if (sound === 'chirp') {
    playTone(1200, 0, 0.08, 0.16);
    playTone(1600, 0.1, 0.08, 0.16);
    playTone(1200, 0.2, 0.08, 0.16);
    playTone(1600, 0.3, 0.1, 0.16);
  } else {
    playTone(880, 0, 0.18, 0.22);
    playTone(880, 0.22, 0.18, 0.22);
  }
}

function soundInterval(sound) {
  if (sound === 'bell') return 1400;
  if (sound === 'chime') return 1200;
  if (sound === 'alarm') return 1500;
  if (sound === 'digital') return 800;
  if (sound === 'gong') return 2600;
  if (sound === 'chirp') return 900;
  return 1000;
}

function startSound(sound) {
  stopSound();

  if (sound === 'none') return;

  const source = customSoundSource(sound);

  if (source) {
    try {
      customAudio = new Audio(source);
      customAudio.loop = true;
      customAudio.play().catch((error) => {
        console.warn('Could not play custom alarm sound.', error);
        statusMessage.textContent = t('soundPlayFailed');
        stopSound();
      });
    } catch (error) {
      console.warn('Could not play custom sound.', error);
    }
    return;
  }

  ensureAudio();
  playSound(sound);

  soundTimer = window.setInterval(() => playSound(sound), soundInterval(sound));
}

function stopSound() {
  if (soundTimer !== null) {
    window.clearInterval(soundTimer);
    soundTimer = null;
  }

  if (customAudio) {
    customAudio.pause();
    customAudio.currentTime = 0;
    customAudio = null;
  }
}

function stopPreview() {
  if (previewTimer !== null) {
    window.clearTimeout(previewTimer);
    previewTimer = null;
  }

  if (previewAudio) {
    previewAudio.pause();
    previewAudio.currentTime = 0;
    previewAudio = null;
  }
}

function updateTestButton() {
  if (!testButton) return;

  testButton.textContent = t(testPlaying ? 'testStop' : 'testSound');
  testButton.classList.toggle('is-playing', testPlaying);
}

function stopTest() {
  if (testTimer !== null) {
    window.clearInterval(testTimer);
    testTimer = null;
  }

  if (testAudio) {
    testAudio.pause();
    testAudio.currentTime = 0;
    testAudio = null;
  }

  testPlaying = false;
  updateTestButton();
}

function previewSound(sound) {
  stopPreview();
  stopTest();

  if (!sound || sound === 'none') return;

  ensureAudio();

  const source = customSoundSource(sound);

  if (source) {
    try {
      previewAudio = new Audio(source);
      previewAudio.addEventListener('ended', stopPreview);
      previewAudio.play().catch((error) => {
        console.warn('Could not preview custom sound.', error);
        statusMessage.textContent = t('soundPlayFailed');
        stopPreview();
      });
      previewTimer = window.setTimeout(stopPreview, 5000);
    } catch (error) {
      console.warn('Could not preview custom sound.', error);
    }
    return;
  }

  playSound(sound);
}

function toggleTest() {
  if (testPlaying) {
    stopTest();
    return;
  }

  stopPreview();

  const sound = soundSelect ? soundSelect.value : 'beep';
  if (!sound || sound === 'none') return;

  ensureAudio();

  const source = customSoundSource(sound);

  testPlaying = true;
  updateTestButton();

  if (source) {
    try {
      testAudio = new Audio(source);
      testAudio.loop = true;
      testAudio.play().catch((error) => {
        console.warn('Could not test custom sound.', error);
        statusMessage.textContent = t('soundPlayFailed');
        stopTest();
      });
    } catch (error) {
      console.warn('Could not test custom sound.', error);
    }
    return;
  }

  playSound(sound);
  testTimer = window.setInterval(() => playSound(sound), soundInterval(sound));
}

function updateSoundRemoveButton() {
  if (!soundRemoveButton) return;
  const value = soundSelect ? soundSelect.value : '';
  const key = value.startsWith('custom:') ? value.slice(7) : '';
  soundRemoveButton.disabled = !key
    || !Object.prototype.hasOwnProperty.call(customSounds, key)
    || typeof customSounds[key] !== 'string';
}

async function removeSelectedCustomSound() {
  const value = soundSelect ? soundSelect.value : '';

  if (!value.startsWith('custom:')) return;

  const key = value.slice(7);
  if (!Object.prototype.hasOwnProperty.call(customSounds, key)) return;

  const nextSounds = { ...customSounds };
  const nextNames = { ...customSoundNames };
  delete nextSounds[key];
  delete nextNames[key];

  if (!saveCustomSounds(nextSounds, nextNames)) {
    statusMessage.textContent = t('soundSaveFailed');
    return;
  }

  if (indexedDbSoundKeys.has(key)) {
    try {
      await deleteStoredSoundFile(key);
      indexedDbSoundKeys.delete(key);
    } catch (error) {
      saveCustomSounds(customSounds, customSoundNames);
      console.warn('Could not remove custom sound file.', error);
      statusMessage.textContent = t('soundSaveFailed');
      return;
    }
  }

  customSounds = nextSounds;
  customSoundNames = nextNames;
  stopPreview();
  stopTest();
  refreshCustomSoundOption();
  soundSelect.value = 'beep';
  updateSoundRemoveButton();
  statusMessage.textContent = t('soundRemoved');
}

function triggerRing(time, label, alarm = null, info = null) {
  if (ringing) return;

  const sound = info && typeof info.sound === 'string'
    ? info.sound
    : alarm && typeof alarm.sound === 'string'
      ? alarm.sound
      : 'beep';
  const notify = info && typeof info.notify === 'boolean'
    ? info.notify
    : alarm
      ? alarm.notify !== false
      : true;

  ringing = true;
  ringingInfo = { time, label: label || '', sound, notify };
  ringingTime.textContent = time;

  if (label) {
    ringingLabel.textContent = label;
    ringingLabel.hidden = false;
  } else {
    ringingLabel.textContent = '';
    ringingLabel.hidden = true;
  }

  overlay.hidden = false;
  document.title = `🔔 ${time} | Time Tools`;
  stopPreview();
  stopTest();
  startSound(sound);

  if (notify) {
    notifications.show(t('ringing'), {
      body: label ? `${time} · ${label}` : time,
      tag: 'time-tools-alarm',
      requireInteraction: true
    });
  }

  if (alarm && alarm.once) {
    alarm.enabled = false;
    alarm.completed = true;
    saveAlarms();
    renderAlarms();
  }

  window.setTimeout(() => stopButton.focus(), 0);
}

function stopRinging() {
  stopSound();
  overlay.hidden = true;
  ringing = false;
  document.title = `${t('title')} | Time Tools`;
}

function snoozeRinging() {
  stopSound();
  overlay.hidden = true;
  ringing = false;
  snoozeUntil = Date.now() + SNOOZE_MS;
  snoozeInfo = { ...ringingInfo };
  statusMessage.textContent = t('snoozed');
  document.title = `${t('title')} | Time Tools`;
}

function commitOnceAlarm(fireDate, label) {
  const data = {
    time: currentTime(fireDate),
    label,
    days: [fireDate.getDay()],
    enabled: true,
    once: true,
    fireAt: fireDate.getTime(),
    completed: false,
    sound: soundSelect ? soundSelect.value : 'beep',
    notify: notifyInput ? notifyInput.checked : true
  };

  let message = '';

  if (editingId !== null) {
    const target = alarms.find((alarm) => alarm.id === editingId);

    if (target) {
      Object.assign(target, data);
      message = t('updated').replace('{time}', displayTime(target));
    }
  } else {
    const alarm = { id: createId(), ...data };
    alarms.push(alarm);
    message = t('addedOnce').replace('{time}', displayTime(alarm));
  }

  labelInput.value = '';
  pendingFireAt = 0;
  saveAlarms();
  resetForm();
  statusMessage.textContent = message;
}

function addAlarm() {
  const time = normalizeTime(timeInput.value);

  if (!time) {
    statusMessage.textContent = t('invalid');
    return;
  }

  ensureAudio();

  const label = labelInput.value.trim().slice(0, 24);

  if (pendingFireAt > 0) {
    if (pendingFireAt <= Date.now()) {
      pendingFireAt = 0;
      statusMessage.textContent = t('invalid');
      return;
    }

    commitOnceAlarm(new Date(pendingFireAt), label);
    return;
  }

  if (dateInput && dateInput.value) {
    const fireDate = parseDateInput(dateInput.value, time);

    if (!fireDate || fireDate.getTime() <= Date.now()) {
      statusMessage.textContent = t('datePast');
      return;
    }

    commitOnceAlarm(fireDate, label);
    return;
  }

  const days = Array.from(selectedDays).sort((a, b) => a - b);

  if (days.length === 0) {
    statusMessage.textContent = t('selectDay');
    return;
  }

  const duplicate = alarms.find(
    (alarm) =>
      !alarm.once &&
      alarm.id !== editingId &&
      alarm.time === time &&
      alarm.days.join(',') === days.join(',')
  );

  if (duplicate && editingId === null) {
    duplicate.enabled = true;
    if (label) duplicate.label = label;
    duplicate.sound = soundSelect.value;
    duplicate.notify = notifyInput.checked;
    labelInput.value = '';
    statusMessage.textContent = t('enabled').replace('{time}', time);
    saveAlarms();
    renderAlarms();
    return;
  }

  if (duplicate) {
    statusMessage.textContent = t('duplicate');
    return;
  }

  if (editingId !== null) {
    const target = alarms.find((alarm) => alarm.id === editingId);

    if (target) {
      target.time = time;
      target.label = label;
      target.days = days;
      target.once = false;
      target.fireAt = 0;
      target.completed = false;
      target.sound = soundSelect.value;
      target.notify = notifyInput.checked;
      statusMessage.textContent = t('updated').replace('{time}', time);
    }
  } else {
    alarms.push({
      id: createId(),
      time,
      days,
      label,
      enabled: true,
      once: false,
      fireAt: 0,
      completed: false,
      sound: soundSelect.value,
      notify: notifyInput.checked
    });
    statusMessage.textContent = t('added').replace('{time}', time);
  }

  saveAlarms();
  resetForm();
}

function displayTime(alarm) {
  if (alarm.once && alarm.fireAt) {
    const date = new Date(alarm.fireAt);
    return `${currentTime(date)}:${pad(date.getSeconds())}`;
  }

  return alarm.time;
}

function setQuickTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return;

  ensureAudio();

  const fireAt = Date.now() + seconds * 1000;
  const fireDate = new Date(fireAt);

  pendingFireAt = fireAt;
  timeInput.value = `${currentTime(fireDate)}:${pad(fireDate.getSeconds())}`;
  statusMessage.textContent = t('setTime').replace('{time}', timeInput.value);
}

function setFixedTime(time) {
  if (!/^\d{2}:\d{2}$/.test(time)) return;

  ensureAudio();

  pendingFireAt = 0;
  timeInput.value = `${time}:00`;
  statusMessage.textContent = t('setTime').replace('{time}', time);
}

function renderFixedTimes() {
  if (!fixedList) return;

  fixedList.replaceChildren();

  fixedTimes.forEach((time) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quick-fixed-chip';
    button.dataset.fixed = time;
    button.textContent = time;
    button.addEventListener('click', () => setFixedTime(time));
    fixedList.append(button);
  });
}

function startEdit(alarm) {
  editingId = alarm.id;
  pendingFireAt = 0;

  if (alarm.once && alarm.fireAt) {
    const fire = new Date(alarm.fireAt);
    dateInput.value = `${fire.getFullYear()}-${pad(fire.getMonth() + 1)}-${pad(fire.getDate())}`;
    timeInput.value = `${pad(fire.getHours())}:${pad(fire.getMinutes())}:${pad(fire.getSeconds())}`;
  } else {
    dateInput.value = '';
    timeInput.value = `${alarm.time}:00`;
  }

  labelInput.value = alarm.label || '';
  const desiredSound = SOUND_KEYS.includes(alarm.sound) || (typeof alarm.sound === 'string' && alarm.sound.startsWith('custom:'))
    ? alarm.sound
    : 'beep';

  soundSelect.value = desiredSound;
  if (soundSelect.value !== desiredSound) soundSelect.value = 'beep';
  notifyInput.checked = alarm.notify !== false;
  selectedDays = new Set(alarm.days);

  syncDayChips();
  addButton.textContent = t('save');
  cancelButton.hidden = false;
  statusMessage.textContent = '';

  renderAlarms();
  timeInput.focus({ preventScroll: true });

  const fields = document.querySelector('.alarm-fields');
  if (fields && typeof fields.scrollIntoView === 'function') {
    fields.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function resetForm() {
  editingId = null;
  pendingFireAt = 0;
  labelInput.value = '';
  dateInput.value = '';
  selectedDays = new Set(ALL_DAYS);

  syncDayChips();
  addButton.textContent = t('add');
  cancelButton.hidden = true;
  renderAlarms();
}

function currentTime(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function currentDayKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function checkAlarms() {
  if (ringing) return;

  const now = new Date();

  if (snoozeUntil > 0 && Date.now() >= snoozeUntil) {
    snoozeUntil = 0;
    statusMessage.textContent = '';
    triggerRing(snoozeInfo.time || currentTime(now), snoozeInfo.label, null, snoozeInfo);
    return;
  }

  const time = currentTime(now);
  const dayKey = currentDayKey(now);
  const weekday = now.getDay();
  const nowMs = Date.now();

  const dueOnce = alarms.find(
    (alarm) => alarm.enabled &&
      alarm.once &&
      alarm.fireAt > 0 &&
      nowMs >= alarm.fireAt &&
      nowMs - alarm.fireAt < ONCE_WINDOW_MS
  );

  if (dueOnce) {
    triggerRing(displayTime(dueOnce), dueOnce.label, dueOnce);
    return;
  }

  const due = alarms.filter(
    (alarm) => alarm.enabled &&
      !alarm.once &&
      alarm.time === time &&
      alarm.days.includes(weekday) &&
      firedMinutes.get(alarm.id) !== dayKey
  );

  if (due.length === 0) return;

  due.forEach((alarm) => firedMinutes.set(alarm.id, dayKey));
  triggerRing(displayTime(due[0]), due[0].label, due[0]);
}

dayChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const day = Number(chip.dataset.day);

    if (selectedDays.has(day)) selectedDays.delete(day);
    else selectedDays.add(day);

    syncDayChips();
  });
});

document.querySelectorAll('[data-days]').forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.dataset.days;

    if (mode === 'weekdays') selectedDays = new Set([1, 2, 3, 4, 5]);
    else if (mode === 'weekend') selectedDays = new Set([0, 6]);
    else selectedDays = new Set(ALL_DAYS);

    syncDayChips();
  });
});

document.querySelectorAll('[data-seconds]').forEach((button) => {
  button.addEventListener('click', () => setQuickTime(Number(button.dataset.seconds)));
});

addButton.addEventListener('click', addAlarm);

cancelButton.addEventListener('click', () => {
  statusMessage.textContent = '';
  resetForm();
});

timeInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addAlarm();
});

labelInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addAlarm();
});

timeInput.addEventListener('input', () => {
  pendingFireAt = 0;
});

dateInput.addEventListener('input', () => {
  pendingFireAt = 0;
});

testButton.addEventListener('click', toggleTest);

soundSelect.addEventListener('change', () => {
  updateSoundRemoveButton();
  previewSound(soundSelect.value);
});

if (soundRemoveButton) {
  soundRemoveButton.addEventListener('click', removeSelectedCustomSound);
}

soundFileInput.addEventListener('change', async () => {
  const file = soundFileInput.files && soundFileInput.files[0];
  if (!file) return;

  if (file.size > MAX_SOUND_FILE_BYTES) {
    statusMessage.textContent = t('soundTooLarge').replace(
      '{limit}',
      String(MAX_SOUND_FILE_BYTES / (1024 * 1024))
    );
    soundFileInput.value = '';
    return;
  }

  try {
    await customSoundRestorePromise;
    const source = await readSoundFile(file);
    const key = `file-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    await storeSoundFile(key, source);
    indexedDbSoundKeys.add(key);

    const nextSounds = { ...customSounds, [key]: source };
    const nextNames = { ...customSoundNames, [key]: file.name };

    if (!saveCustomSounds(nextSounds, nextNames)) {
      await deleteStoredSoundFile(key);
      indexedDbSoundKeys.delete(key);
      statusMessage.textContent = t('soundSaveFailed');
      return;
    }

    customSounds = nextSounds;
    customSoundNames = nextNames;
    refreshCustomSoundOption();
    soundSelect.value = `custom:${key}`;
    updateSoundRemoveButton();
    statusMessage.textContent = t('soundLoaded').replace('{name}', file.name);
  } catch (error) {
    console.warn('Could not save custom sound file.', error);
    statusMessage.textContent = t('soundSaveFailed');
  } finally {
    soundFileInput.value = '';
  }
});

soundUrlInput.addEventListener('change', async () => {
  const value = soundUrlInput.value.trim();

  if (!value) return;

  if (!/^https?:\/\//i.test(value)) {
    statusMessage.textContent = t('soundUrlInvalid');
    return;
  }

  await customSoundRestorePromise;
  const key = `url-${Date.now()}`;
  const nextSounds = { ...customSounds, [key]: value };
  const nextNames = {
    ...customSoundNames,
    [key]: value.length > 48 ? `${value.slice(0, 45)}…` : value
  };

  if (!saveCustomSounds(nextSounds, nextNames)) {
    statusMessage.textContent = t('soundSaveFailed');
    return;
  }

  customSounds = nextSounds;
  customSoundNames = nextNames;
  refreshCustomSoundOption();
  soundSelect.value = `custom:${key}`;
  updateSoundRemoveButton();
  statusMessage.textContent = t('soundUrlLoaded');
});

notifyButton.addEventListener('click', async () => {
  await notifications.request();
  updateNotifyRow();
});

stopButton.addEventListener('click', stopRinging);
snoozeButton.addEventListener('click', snoozeRinging);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && ringing) stopRinging();
});

document.addEventListener('pointerdown', ensureAudio, { once: true });

document.querySelectorAll('[data-i18n]').forEach((element) => {
  const value = t(element.dataset.i18n);
  if (value !== undefined) element.textContent = value;
});

document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
  const value = t(element.dataset.i18nAria);
  if (value !== undefined) element.setAttribute('aria-label', value);
});

document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
  const value = t(element.dataset.i18nPlaceholder);
  if (value !== undefined) element.placeholder = value;
});

document.title = `${t('title')} | Time Tools`;

(() => {
  const nextHour = new Date(Date.now() + 60 * 60 * 1000);
  timeInput.value = `${pad(nextHour.getHours())}:00:00`;
})();

syncDayChips();
renderFixedTimes();
refreshCustomSoundOption();
customSoundRestorePromise = restoreCustomFileSounds();
renderAlarms();
updateNotifyRow();
window.setInterval(checkAlarms, 1000);
window.setInterval(renderAlarms, 60000);
