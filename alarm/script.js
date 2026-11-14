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
    snoozed: '{time}分後にもう一度鳴ります。',
    snoozeInList: 'スヌーズ中・あと{time}',
    snoozeDurationLabel: 'スヌーズ時間',
    snoozeFor: 'スヌーズ（{time}分）',
    settingsLabel: '設定',
    snoozeCustom: '任意',
    snoozeCustomAria: 'スヌーズ時間（1〜60分）',
    snoozeUnit: '分',
    snoozeInvalid: 'スヌーズ時間は1〜60分で入力してください。',
    snooze1: '1分',
    snooze3: '3分',
    snooze5: '5分',
    snooze10: '10分',
    snooze15: '15分',
    snooze30: '30分',
    scheduleToolsLabel: '曜日・クイック設定',
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
    volumeLabel: '音量',
    soundFileLabel: '音声ファイル',
    soundUrlLabel: '音声URL',
    soundTooLarge: '音声ファイルは{limit}MB以下にしてください。',
    soundPlayFailed: '音声を再生できませんでした。ファイル形式やブラウザの対応を確認してください。',
    soundLoaded: '{name} を読み込みました。',
    soundUrlInvalid: 'http(s) のURLを入力してください。',
    soundUrlUnsupported: '指定できないドメインやサービスです。',
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
    snoozed: 'It will ring again in {time} minutes.',
    snoozeInList: 'Snoozed · {time} left',
    snoozeDurationLabel: 'Snooze duration',
    snoozeFor: 'Snooze ({time} min)',
    settingsLabel: 'Settings',
    snoozeCustom: 'Custom',
    snoozeCustomAria: 'Snooze duration (1–60 minutes)',
    snoozeUnit: 'min',
    snoozeInvalid: 'Enter a snooze duration from 1 to 60 minutes.',
    snooze1: '1 min',
    snooze3: '3 min',
    snooze5: '5 min',
    snooze10: '10 min',
    snooze15: '15 min',
    snooze30: '30 min',
    scheduleToolsLabel: 'Repeat & quick options',
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
    volumeLabel: 'Volume',
    soundFileLabel: 'Sound file',
    soundUrlLabel: 'Sound URL',
    soundTooLarge: 'Choose an audio file no larger than {limit} MB.',
    soundPlayFailed: 'Could not play this audio. Check the file format and browser support.',
    soundLoaded: 'Loaded {name}.',
    soundUrlInvalid: 'Enter an http(s) URL.',
    soundUrlUnsupported: 'This domain or service cannot be used.',
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
const ALARM_VOLUME_KEY = 'time-tools-alarm-volume-v1';
const SNOOZE_DURATION_KEY = 'time-tools-alarm-snooze-duration-v1';
const SNOOZE_STATE_KEY = 'time-tools-alarm-snooze-state-v1';
const SOUND_DB_NAME = 'time-tools-alarm-sounds-v1';
const SOUND_DB_STORE = 'files';
const MAX_SOUND_FILE_BYTES = 50 * 1024 * 1024;
const DEFAULT_ALARM_VOLUME = 50;
const MAX_ALARM_OUTPUT_GAIN = 0.35;
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
const soundVolumeInput = document.getElementById('alarm-volume');
const soundVolumeValue = document.getElementById('alarm-volume-value');
const soundFileInput = document.getElementById('alarm-sound-file');
const soundUrlInput = document.getElementById('alarm-sound-url');
const snoozeDurationSelect = document.getElementById('alarm-snooze-duration');
const snoozeCustomMinutesInput = document.getElementById('alarm-snooze-custom-minutes');
const snoozeDurationError = document.getElementById('alarm-snooze-duration-error');
const settingsToggle = document.getElementById('alarm-settings-toggle');
const settingsPanel = document.getElementById('alarm-settings');
const scheduleToggle = document.getElementById('alarm-schedule-toggle');
const schedulePanel = document.getElementById('alarm-schedule-options');
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
const restoredSnoozeState = loadSnoozeState();
let snoozeUntil = restoredSnoozeState ? restoredSnoozeState.until : 0;
let snoozeInfo = restoredSnoozeState
  ? restoredSnoozeState.info
  : { time: '', label: '' };
let snoozeDurationMinutes = loadSnoozeDuration();
let audioContext = null;
let audioOutputGain = null;
let alarmVolume = loadAlarmVolume();
let soundTimer = null;
let customAudio = null;
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

function loadAlarmVolume() {
  try {
    const saved = window.localStorage.getItem(ALARM_VOLUME_KEY);
    if (saved === null) return DEFAULT_ALARM_VOLUME;

    const volume = Number(saved);
    return Number.isFinite(volume)
      ? Math.round(Math.max(0, Math.min(100, volume)) * 10) / 10
      : DEFAULT_ALARM_VOLUME;
  } catch (error) {
    console.warn('Could not restore alarm volume.', error);
    return DEFAULT_ALARM_VOLUME;
  }
}

function loadSnoozeDuration() {
  try {
    const saved = Number(window.localStorage.getItem(SNOOZE_DURATION_KEY));
    return Number.isInteger(saved) && saved >= 1 && saved <= 60 ? saved : 5;
  } catch (error) {
    console.warn('Could not restore snooze duration.', error);
    return 5;
  }
}

function loadSnoozeState() {
  try {
    const raw = window.localStorage.getItem(SNOOZE_STATE_KEY);
    if (!raw) return null;

    const state = JSON.parse(raw);
    const alarmExists = alarms.some((alarm) => alarm.id === state.info?.alarmId);
    if (!Number.isFinite(state.until) || state.until <= 0 || !alarmExists) {
      console.warn('Stored snooze state is invalid or its alarm no longer exists.');
      clearSnoozeState();
      return null;
    }

    return state;
  } catch (error) {
    console.warn('Could not restore snooze state.', error);
    clearSnoozeState();
    return null;
  }
}

function saveSnoozeState() {
  try {
    window.localStorage.setItem(
      SNOOZE_STATE_KEY,
      JSON.stringify({ until: snoozeUntil, info: snoozeInfo })
    );
  } catch (error) {
    console.warn('Could not save snooze state.', error);
  }
}

function clearSnoozeState() {
  try {
    window.localStorage.removeItem(SNOOZE_STATE_KEY);
  } catch (error) {
    console.warn('Could not clear snooze state.', error);
  }
}

function saveSnoozeDuration(minutes) {
  snoozeDurationMinutes = minutes;
  try {
    window.localStorage.setItem(SNOOZE_DURATION_KEY, String(minutes));
  } catch (error) {
    console.warn('Could not save snooze duration.', error);
  }
  updateSnoozeDurationControls();
}

function updateSnoozeDurationControls() {
  if (!snoozeDurationSelect || !snoozeCustomMinutesInput) return;

  const preset = Array.from(snoozeDurationSelect.options)
    .some((option) => option.value === String(snoozeDurationMinutes));
  snoozeDurationSelect.value = preset ? String(snoozeDurationMinutes) : 'custom';
  snoozeCustomMinutesInput.value = String(snoozeDurationMinutes);
  snoozeCustomMinutesInput.hidden = preset;
  snoozeDurationError.hidden = true;
  snoozeButton.textContent = t('snoozeFor').replace(
    '{time}',
    String(snoozeDurationMinutes)
  );
}

function updateAlarmVolume(value, persist = true) {
  const parsedVolume = Number(value);
  if (!Number.isFinite(parsedVolume)) return;

  alarmVolume = Math.round(Math.max(0, Math.min(100, parsedVolume)) * 10) / 10;

  if (soundVolumeInput) soundVolumeInput.value = String(alarmVolume);
  if (soundVolumeValue) soundVolumeValue.textContent = `${alarmVolume}%`;

  if (audioOutputGain && audioContext) {
    audioOutputGain.gain.setTargetAtTime(
      getAlarmOutputVolume(),
      audioContext.currentTime,
      0.02
    );
  }

  [customAudio, testAudio].forEach((audio) => {
    if (audio) audio.volume = getAlarmOutputVolume();
  });

  if (persist) {
    try {
      window.localStorage.setItem(ALARM_VOLUME_KEY, String(alarmVolume));
    } catch (error) {
      console.warn('Could not save alarm volume.', error);
    }
  }
}

function getAlarmOutputVolume() {
  return alarmVolume / 100 * MAX_ALARM_OUTPUT_GAIN;
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

function alarmSortTime(alarm, now) {
  if (snoozeUntil > now && snoozeInfo.alarmId === alarm.id) return snoozeUntil;
  if (!alarm.enabled || (alarm.once && alarm.completed)) return Number.POSITIVE_INFINITY;
  if (alarm.once) return alarm.fireAt > now ? alarm.fireAt : Number.POSITIVE_INFINITY;

  const next = nextRingDate(alarm);
  return next ? next.getTime() : Number.POSITIVE_INFINITY;
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

  const now = Date.now();
  alarms
    .slice()
    .sort((a, b) => {
      const timeDifference = alarmSortTime(a, now) - alarmSortTime(b, now);
      return timeDifference || a.time.localeCompare(b.time);
    })
    .forEach((alarm) => {
      const item = document.createElement('li');
      item.className = 'alarm-item';
      const isSnoozed = snoozeUntil > Date.now() && snoozeInfo.alarmId === alarm.id;

      if (!alarm.enabled && !isSnoozed) item.classList.add('is-off');
      if (alarm.once && alarm.completed && !isSnoozed) item.classList.add('is-finished');
      if (isSnoozed) item.classList.add('is-snoozed');
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
      schedule.textContent = isSnoozed
        ? t('snoozeInList').replace(
          '{time}',
          formatSnoozeRemaining(snoozeUntil - Date.now())
        )
        : `${scheduleText(alarm)} · ${nextRingText(alarm)}`;
      if (isSnoozed) schedule.classList.add('is-snoozed');

      const meta = document.createElement('span');
      meta.className = 'alarm-meta';

      const soundLabel = SOUND_LABEL_KEYS[alarm.sound]
        ? t(SOUND_LABEL_KEYS[alarm.sound])
        : typeof alarm.sound === 'string' && alarm.sound.startsWith('custom:')
          ? t('soundCustom')
          : t('soundBeep');

      const notificationIcon = document.createElement('span');
      notificationIcon.className = 'material-symbols-outlined alarm-notification-icon';
      notificationIcon.textContent = alarm.notify ? 'notifications' : 'notifications_off';
      notificationIcon.setAttribute('aria-hidden', 'true');
      meta.append(notificationIcon, document.createTextNode(` ${soundLabel}`));

      main.append(line, schedule);
      if (!isSnoozed) main.append(meta);

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
      const editIcon = document.createElement('span');
      editIcon.className = 'material-symbols-outlined';
      editIcon.textContent = 'edit';
      editIcon.setAttribute('aria-hidden', 'true');
      edit.append(editIcon);
      edit.setAttribute('aria-label', t('editAria'));
      edit.addEventListener('click', () => startEdit(alarm));

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'icon-button is-delete';
      const removeIcon = document.createElement('span');
      removeIcon.className = 'material-symbols-outlined';
      removeIcon.textContent = 'delete';
      removeIcon.setAttribute('aria-hidden', 'true');
      remove.append(removeIcon);
      remove.setAttribute('aria-label', t('deleteAria'));
      remove.addEventListener('click', () => {
        if (snoozeInfo.alarmId === alarm.id) {
          snoozeUntil = 0;
          clearSnoozeState();
        }
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
    if (!audioOutputGain) {
      audioOutputGain = audioContext.createGain();
      audioOutputGain.gain.value = getAlarmOutputVolume();
      audioOutputGain.connect(audioContext.destination);
    }
    if (audioContext.state === 'suspended') audioContext.resume();
  } catch (error) {
    console.warn('Could not start audio.', error);
  }
}

function playTone(frequency, offset, duration, volume, type = 'sine') {
  if (!audioContext || alarmVolume === 0) return;

  const start = audioContext.currentTime + offset;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain).connect(audioOutputGain || audioContext.destination);
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
    let audio;
    const fallbackToDefault = (error) => {
      if (audio && customAudio !== audio) return;
      console.warn('Could not play custom alarm sound; using the default sound.', error);
      statusMessage.textContent = t('soundPlayFailed');
      stopSound();
      startSound('beep');
    };

    try {
      audio = new Audio(source);
      customAudio = audio;
      audio.loop = true;
      audio.volume = getAlarmOutputVolume();
      audio.addEventListener('error', fallbackToDefault, { once: true });
      audio.play().catch(fallbackToDefault);
    } catch (error) {
      fallbackToDefault(error);
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

function toggleTest() {
  if (testPlaying) {
    stopTest();
    return;
  }

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
      testAudio.volume = getAlarmOutputVolume();
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
  ringingInfo = {
    time,
    label: label || '',
    sound,
    notify,
    alarmId: alarm ? alarm.id : info && info.alarmId ? info.alarmId : null
  };
  ringingTime.textContent = time;

  if (label) {
    ringingLabel.textContent = label;
    ringingLabel.hidden = false;
  } else {
    ringingLabel.textContent = '';
    ringingLabel.hidden = true;
  }

  overlay.hidden = false;
  document.title = `${time} | Time Tools`;
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
  const selectedDuration = snoozeDurationMinutes;
  stopSound();
  overlay.hidden = true;
  ringing = false;
  snoozeUntil = Date.now() + selectedDuration * 60 * 1000;
  snoozeInfo = { ...ringingInfo };
  saveSnoozeState();
  statusMessage.textContent = t('snoozed').replace(
    '{time}',
    String(selectedDuration)
  );
  renderAlarms();
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
  settingsToggle.setAttribute('aria-expanded', 'true');
  settingsPanel.hidden = false;
  scheduleToggle.setAttribute('aria-expanded', 'true');
  schedulePanel.hidden = false;

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

function formatSnoozeRemaining(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return language === 'en'
    ? `${minutes}:${pad(seconds)}`
    : `${minutes}分${seconds}秒`;
}

function currentDayKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function checkAlarms() {
  if (ringing) return;

  const now = new Date();

  if (snoozeUntil > 0 && Date.now() >= snoozeUntil) {
    snoozeUntil = 0;
    clearSnoozeState();
    statusMessage.textContent = '';
    renderAlarms();
    triggerRing(snoozeInfo.time || currentTime(now), snoozeInfo.label, null, snoozeInfo);
    return;
  }

  if (snoozeUntil > 0) renderAlarms();

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
  stopTest();
  updateSoundRemoveButton();
});

settingsToggle.addEventListener('click', () => {
  const isExpanded = settingsToggle.getAttribute('aria-expanded') === 'true';
  settingsToggle.setAttribute('aria-expanded', String(!isExpanded));
  settingsPanel.hidden = isExpanded;

  if (isExpanded) {
    stopTest();
  }
});

scheduleToggle.addEventListener('click', () => {
  const isExpanded = scheduleToggle.getAttribute('aria-expanded') === 'true';
  scheduleToggle.setAttribute('aria-expanded', String(!isExpanded));
  schedulePanel.hidden = isExpanded;
});

snoozeDurationSelect.addEventListener('change', () => {
  snoozeDurationError.hidden = true;
  if (snoozeDurationSelect.value === 'custom') {
    snoozeCustomMinutesInput.hidden = false;
    snoozeCustomMinutesInput.value = String(snoozeDurationMinutes);
    snoozeCustomMinutesInput.focus();
    return;
  }

  saveSnoozeDuration(Number(snoozeDurationSelect.value));
});

snoozeCustomMinutesInput.addEventListener('change', () => {
  const minutes = Number(snoozeCustomMinutesInput.value);
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 60) {
    snoozeCustomMinutesInput.value = String(snoozeDurationMinutes);
    snoozeDurationSelect.value = 'custom';
    snoozeCustomMinutesInput.hidden = false;
    snoozeDurationError.textContent = t('snoozeInvalid');
    snoozeDurationError.hidden = false;
    return;
  }

  saveSnoozeDuration(minutes);
});

soundVolumeInput.addEventListener('input', () => {
  updateAlarmVolume(soundVolumeInput.value);
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

  let url;
  try {
    url = new URL(value);
  } catch {
    statusMessage.textContent = t('soundUrlInvalid');
    return;
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    statusMessage.textContent = t('soundUrlInvalid');
    return;
  }

  const hostname = url.hostname.toLowerCase();
  if (
    hostname === 'youtu.be'
    || hostname === 'youtube.com'
    || hostname.endsWith('.youtube.com')
    || hostname === 'spotify.com'
    || hostname.endsWith('.spotify.com')
    || hostname === 'spotify.link'
  ) {
    statusMessage.textContent = t('soundUrlUnsupported');
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
updateSnoozeDurationControls();
updateAlarmVolume(alarmVolume, false);

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
