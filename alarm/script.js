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
  const yearDisplay = currentYear > baseYear ? `${baseYear} ~ ${currentYear}` : baseYear;
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
    nowLabel: '現在時刻',
    timeLabel: '時刻',
    dateLabel: '日付（1回のみ）',
    datePast: '未来の日時を指定してください。',
    nameLabel: '名前（任意）',
    namePlaceholder: '起床',
    daysLabel: '繰り返す曜日',
    repeatHint: '日付を指定しない場合、選択した曜日に繰り返します。',
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
    ringing: 'アラーム',
    stop: '停止',
    snooze: 'スヌーズ',
    snoozed: '{time}分後にもう一度鳴ります。',
    snoozeInList: 'スヌーズ中・あと{time}',
    snoozeDurationLabel: 'スヌーズ時間',
    snoozeFor: 'スヌーズ（{time}分）',
    settingsLabel: '音設定',
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
    scheduleToolsLabel: '曜日・時刻設定',
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
    notifyTitle: '通知',
    notifyOn: 'ON',
    notifyOff: 'OFF',
    notifyGranted: '通知は有効です。ほかのタブを見ていても知らせが届きます。',
    notifyDenied: '通知がブロックされています。ブラウザの設定から許可してください。',
    notifyPrompt: '通知を許可すると、ほかのタブを見ていても知らせが届きます。',
    notifySettingsLabel: '通知設定',
    notifyTitleLabel: '通知タイトル',
    notifyTitlePlaceholder: 'アラーム',
    notifyBodyLabel: '通知メッセージ',
    notifyImageLabel: '通知画像URL',
    notifyImageFileLabel: '画像ファイル',
    notifyImageClear: '画像を削除',
    notifyReset: '既定に戻す',
    notifyTemplateGroupAria: '通知メッセージのテンプレート',
    notifyTemplateTime: '時刻',
    notifyTemplateName: '名前',
    notifyTemplateTimeName: '時刻＋名前',
    notifyPreviewLabel: 'プレビュー',
    notifyPreviewSampleLabel: '起床',
    notifyImageTooLarge: '画像は{limit}MB以下にしてください。',
    notifyImageInvalid: '画像のURLを確認してください。',
    notifyImageLoaded: '通知画像を設定しました。',
    notifyImageRemoved: '通知画像を削除しました。',
    notifySaveFailed: '通知設定を保存できませんでした。',
    notifyResetDone: '通知のカスタマイズを既定に戻しました。',
    notifyOffHint: '通知はオフです。スイッチをONにすると、ほかのタブを見ていても知らせが届きます。',
    notifyTurnedOn: '通知をオンにしました。',
    notifyTurnedOff: '通知をオフにしました。',
    notifyEnableAria: 'このアラームの通知をオンにする',
    notifyDisableAria: 'このアラームの通知をオフにする',
    notifyEnabledForAlarm: 'このアラームの通知をオンにしました。',
    notifyDisabledForAlarm: 'このアラームの通知をオフにしました。',
    notifyPermissionNeeded: 'このアラームの通知をオンにするには、通知の許可が必要です。',
    testNotification: 'テスト通知',
    testNotificationTitle: 'テスト通知',
    testNotificationBody: '通知は正常に届いています。',
    testNotificationSent: 'テスト通知を送信しました。',
    testNotificationFailed: 'テスト通知を送信できませんでした。通知が許可されているか確認してください。',
    notifyClose: '通知を閉じる',
    notifyClosed: '通知を閉じました。',
    nextRing: '次',
    finished: '終了',
    today: '今日',
    tomorrow: '明日',
    quickLabel: '簡単設定（一回だけ鳴らす）',
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
    notifyLabel: 'ブラウザ通知',
    soundEnabledLabel: 'アラーム音を鳴らす',
    soundEnabledForAlarm: 'このアラームの音をオンにしました。',
    soundDisabledForAlarm: 'このアラームの音をオフにしました。',
    soundEnableAria: 'このアラームの音をオンにする',
    soundDisableAria: 'このアラームの音をオフにする',
    soundShort: '音',
    once: '1回だけ',
    addedOnce: '{time} に1回だけ鳴ります。'
  },
  en: {
    title: 'Alarm',
    nowLabel: 'Current time',
    timeLabel: 'Time',
    dateLabel: 'Date (one-time)',
    datePast: 'Choose a future date and time.',
    nameLabel: 'Name (optional)',
    namePlaceholder: 'Wake up',
    daysLabel: 'Repeat on',
    repeatHint: 'With no date set, the alarm repeats on the selected days.',
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
    ringing: 'Alarm',
    stop: 'Stop',
    snooze: 'Snooze',
    snoozed: 'It will ring again in {time} minutes.',
    snoozeInList: 'Snoozed · {time} left',
    snoozeDurationLabel: 'Snooze duration',
    snoozeFor: 'Snooze ({time} min)',
    settingsLabel: 'Sound settings',
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
    scheduleToolsLabel: 'Schedule & time options',
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
    notifyTitle: 'Notifications',
    notifyOn: 'ON',
    notifyOff: 'OFF',
    notifyGranted: 'Notifications are on. You will be alerted from other tabs too.',
    notifyDenied: 'Notifications are blocked. Allow them in your browser settings.',
    notifyPrompt: 'Allow notifications to be alerted while you are in another tab.',
    notifySettingsLabel: 'Notification settings',
    notifyTitleLabel: 'Notification title',
    notifyTitlePlaceholder: 'Alarm',
    notifyBodyLabel: 'Notification message',
    notifyImageLabel: 'Notification image URL',
    notifyImageFileLabel: 'Image file',
    notifyImageClear: 'Remove image',
    notifyReset: 'Reset to defaults',
    notifyTemplateGroupAria: 'Notification message templates',
    notifyTemplateTime: 'Time',
    notifyTemplateName: 'Name',
    notifyTemplateTimeName: 'Time + name',
    notifyPreviewLabel: 'Preview',
    notifyPreviewSampleLabel: 'Wake up',
    notifyImageTooLarge: 'Choose an image no larger than {limit} MB.',
    notifyImageInvalid: 'Enter a valid image URL.',
    notifyImageLoaded: 'Notification image set.',
    notifyImageRemoved: 'Notification image removed.',
    notifySaveFailed: 'Could not save the notification settings.',
    notifyResetDone: 'Notification customization reset to defaults.',
    notifyOffHint: 'Notifications are off. Turn the switch ON to be alerted from other tabs.',
    notifyTurnedOn: 'Notifications turned on.',
    notifyTurnedOff: 'Notifications turned off.',
    notifyEnableAria: 'Turn notifications on for this alarm',
    notifyDisableAria: 'Turn notifications off for this alarm',
    notifyEnabledForAlarm: 'Notifications turned on for this alarm.',
    notifyDisabledForAlarm: 'Notifications turned off for this alarm.',
    notifyPermissionNeeded: 'Allow notifications to turn on alerts for this alarm.',
    testNotification: 'Test notification',
    testNotificationTitle: 'Test notification',
    testNotificationBody: 'Notifications are working.',
    testNotificationSent: 'Test notification sent.',
    testNotificationFailed: 'Could not send the test notification. Check that notifications are allowed.',
    notifyClose: 'Close notifications',
    notifyClosed: 'Notifications closed.',
    nextRing: 'Next',
    finished: 'Finished',
    today: 'Today',
    tomorrow: 'Tomorrow',
    quickLabel: 'Quick setup (one-time alarm)',
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
    notifyLabel: 'Browser notifications',
    soundEnabledLabel: 'Play alarm sound',
    soundEnabledForAlarm: 'Sound turned on for this alarm.',
    soundDisabledForAlarm: 'Sound turned off for this alarm.',
    soundEnableAria: 'Turn sound on for this alarm',
    soundDisableAria: 'Turn sound off for this alarm',
    soundShort: 'Sound',
    once: 'Once',
    addedOnce: 'One-time alarm set for {time}.'
  }
};

const NOTIFICATION_ENABLED_KEY = 'time-tools-alarm-notify-enabled-v1';
const NOTIFICATION_SETTINGS_KEY = 'time-tools-alarm-notification-settings-v1';
const NOTIFICATION_PANEL_KEY = 'time-tools-alarm-notify-panel-open-v1';
const NOTIFICATION_MESSAGE_TYPE = 'time-tools-alarm-notification';
const MAX_NOTIFICATION_IMAGE_BYTES = 1024 * 1024;

const notifications = (() => {
  const supported = typeof window.Notification !== 'undefined';
  const serviceWorkerSupported = 'serviceWorker' in navigator;
  const pageNotifications = new Set();
  let enabled = loadEnabled();
  let registrationPromise = null;

  function loadEnabled() {
    try {
      const saved = window.localStorage.getItem(NOTIFICATION_ENABLED_KEY);
      if (saved !== null) return saved === 'true';
      return false;
    } catch (error) {
      return false;
    }
  }

  function setEnabled(value) {
    enabled = value === true;

    try {
      window.localStorage.setItem(NOTIFICATION_ENABLED_KEY, String(enabled));
    } catch (error) {
      console.warn('Could not save the notification setting.', error);
    }
  }

  function getPermission() {
    return supported ? window.Notification.permission : 'unsupported';
  }

  function isEnabled() {
    return enabled;
  }

  function isActive() {
    return enabled && getPermission() === 'granted';
  }

  function registerServiceWorker() {
    if (!serviceWorkerSupported) return Promise.resolve(null);
    if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') {
      return Promise.resolve(null);
    }

    if (!registrationPromise) {
      registrationPromise = navigator.serviceWorker
        .register('./sw.js', { scope: './', updateViaCache: 'none' })
        .then(() => navigator.serviceWorker.ready)
        .catch((error) => {
          console.warn('Could not register the notification service worker.', error);
          registrationPromise = null;
          return null;
        });
    }

    return registrationPromise;
  }

  function request() {
    if (!supported) return Promise.resolve('unsupported');

    const currentPermission = getPermission();
    if (currentPermission !== 'default') return Promise.resolve(currentPermission);

    return new Promise((resolve) => {
      let settled = false;
      const done = (perm) => {
        if (settled) return;
        settled = true;
        const finalPerm = perm || getPermission();
        if (finalPerm === 'granted') registerServiceWorker();
        resolve(finalPerm);
      };

      try {
        const result = window.Notification.requestPermission(done);
        if (result && typeof result.then === 'function') {
          result.then(done).catch(() => done(getPermission()));
        }
      } catch (error) {
        console.warn('Could not request notification permission.', error);
        done(getPermission());
      }
    });
  }

  async function show(title, options = {}) {
    if (!supported) return false;

    if (getPermission() !== 'granted') {
      const permission = await request();
      if (permission !== 'granted') return false;
    }

    if (!enabled) {
      setEnabled(true);
    }

    const iconUrl = new URL('../icon.png', window.location.href).href;
    const notificationOptions = {
      icon: iconUrl,
      badge: iconUrl,
      data: { url: window.location.href },
      ...options
    };

    let registration = null;
    if (serviceWorkerSupported && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
      try {
        registration = await Promise.race([
          registerServiceWorker(),
          new Promise((resolve) => setTimeout(() => resolve(null), 400))
        ]);
      } catch (e) {
        registration = null;
      }
    }

    if (registration) {
      try {
        await registration.showNotification(title, notificationOptions);
        return true;
      } catch (error) {
        console.warn('Could not show a service worker notification.', error);
        if (notificationOptions.image) {
          try {
            const { image, ...fallbackOptions } = notificationOptions;
            await registration.showNotification(title, fallbackOptions);
            return true;
          } catch (e2) {}
        }
      }
    }

    try {
      const pageNotification = new window.Notification(title, notificationOptions);
      pageNotifications.add(pageNotification);

      pageNotification.addEventListener('click', () => {
        window.focus();
        pageNotification.close();
      });
      pageNotification.addEventListener('close', () => {
        pageNotifications.delete(pageNotification);
      });

      return true;
    } catch (error) {
      console.warn('Could not show notification.', error);
      if (notificationOptions.image) {
        try {
          const { image, ...fallbackOptions } = notificationOptions;
          const pageNotification = new window.Notification(title, fallbackOptions);
          pageNotifications.add(pageNotification);
          pageNotification.addEventListener('click', () => {
            window.focus();
            pageNotification.close();
          });
          pageNotification.addEventListener('close', () => {
            pageNotifications.delete(pageNotification);
          });
          return true;
        } catch (e2) {}
      }
      return false;
    }
  }

  function closePageNotifications() {
    pageNotifications.forEach((notification) => {
      try {
        notification.close();
      } catch (error) {
        // The notification may already be closed.
      }
    });
    pageNotifications.clear();
  }

  async function closeAll() {
    closePageNotifications();

    if (!serviceWorkerSupported) return;

    try {
      navigator.serviceWorker.controller?.postMessage({
        type: NOTIFICATION_MESSAGE_TYPE,
        action: 'close-all'
      });
    } catch (error) {
      console.warn('Could not ask the service worker to close notifications.', error);
    }

    try {
      const registration = await registerServiceWorker();
      if (!registration || typeof registration.getNotifications !== 'function') return;

      const displayed = await registration.getNotifications();
      displayed.forEach((notification) => notification.close());
    } catch (error) {
      console.warn('Could not close notifications.', error);
    }
  }

  return {
    supported,
    getPermission,
    isEnabled,
    isActive,
    setEnabled,
    request,
    show,
    closeAll,
    registerServiceWorker
  };
})();

const STORAGE_KEY = 'time-tools-alarms-v1';
const CUSTOM_SOUNDS_KEY = 'time-tools-alarm-custom-sounds-v1';
const CUSTOM_SOUND_NAMES_KEY = 'time-tools-alarm-custom-sound-names-v1';
const ALARM_VOLUME_KEY = 'time-tools-alarm-volume-v1';
const SNOOZE_DURATION_KEY = 'time-tools-alarm-snooze-duration-v1';
const SNOOZE_STATE_KEY = 'time-tools-alarm-snooze-state-v1';
const FIRED_ALARMS_KEY = 'time-tools-alarm-fired-v1';
const SOUND_DB_NAME = 'time-tools-alarm-sounds-v1';
const SOUND_DB_STORE = 'files';
const MAX_SOUND_FILE_BYTES = 50 * 1024 * 1024;
const DEFAULT_ALARM_VOLUME = 50;
const MAX_ALARM_OUTPUT_GAIN = 0.35;
const ONCE_WINDOW_MS = 5 * 60 * 1000;
const DEFAULT_FIXED_TIMES = ['06:00', '07:00', '08:00', '09:00', '12:00', '18:00', '21:00', '22:00'];
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const SOUND_KEYS = ['beep', 'chime', 'bell', 'alarm', 'digital', 'gong', 'chirp'];
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
const alarmNotifyState = document.getElementById('alarm-notify-state');
const soundEnabledInput = document.getElementById('alarm-sound-enabled');
const alarmSoundEnabledState = document.getElementById('alarm-sound-enabled-state');
const addButton = document.getElementById('alarm-add');
const cancelButton = document.getElementById('alarm-cancel');
const testButton = document.getElementById('alarm-test');
const statusMessage = document.getElementById('alarm-status');
const notifyRow = document.getElementById('notify-row');
const notifyStatus = document.getElementById('notify-status');
const notifyButton = document.getElementById('notify-enable');
const notifyToggle = document.getElementById('notify-toggle');
const notifyTestButton = document.getElementById('notify-test');
const notifyCloseButton = document.getElementById('notify-close');
const notifySettingsToggle = document.getElementById('notify-settings-toggle');
const notifyTitleInput = document.getElementById('notify-title-input');
const notifyBodyInput = document.getElementById('notify-body-input');
const notifyPreviewIcon = document.getElementById('notify-preview-icon');
const notifyPreviewTitle = document.getElementById('notify-preview-title');
const notifyPreviewBody = document.getElementById('notify-preview-body');
const notifyImageUrlInput = document.getElementById('notify-image-url');
const notifyImageFileInput = document.getElementById('notify-image-file');
const notifyImagePreview = document.getElementById('notify-image-preview');
const notifyImageClearButton = document.getElementById('notify-image-clear');
const notifyResetButton = document.getElementById('notify-reset');
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

const clockDateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'short'
});

const clockTimeDisplay = document.getElementById('alarm-clock-time');
const clockDateDisplay = document.getElementById('alarm-clock-date');

function updateClock() {
  const now = new Date();

  if (clockTimeDisplay) {
    clockTimeDisplay.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  if (clockDateDisplay) {
    clockDateDisplay.textContent = clockDateFormatter.format(now);
  }
}

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
let notifyRequesting = false;
let notificationSettings = loadNotificationSettings();
let testPlaying = false;
let testTimer = null;
let testAudio = null;
let customSounds = loadCustomSounds();
let customSoundNames = loadCustomSoundNames();
let indexedDbSoundKeys = new Set();
let customSoundRestorePromise = Promise.resolve();
const firedMinutes = loadFiredOccurrences();

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
        const savedSound = typeof item.sound === 'string' && item.sound ? item.sound : 'beep';

        return {
          id: typeof item.id === 'string' ? item.id : createId(),
          time: item.time,
          label: typeof item.label === 'string' ? item.label.slice(0, 24) : '',
          days: normalizeDays(item.days),
          enabled: item.enabled !== false,
          once,
          fireAt: once ? fireAt : 0,
          completed: once && item.completed === true,
          sound: savedSound === 'none' ? 'beep' : savedSound,
          soundEnabled: item.soundEnabled !== false && savedSound !== 'none',
          notify: item.notify === true
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

function loadNotificationSettings() {
  const empty = { title: '', body: '', image: '' };

  try {
    const raw = window.localStorage.getItem(NOTIFICATION_SETTINGS_KEY);
    if (!raw) return empty;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return empty;

    return {
      title: typeof parsed.title === 'string' ? parsed.title.slice(0, 60) : '',
      body: typeof parsed.body === 'string' ? parsed.body.slice(0, 160) : '',
      image: typeof parsed.image === 'string' ? parsed.image : ''
    };
  } catch (error) {
    console.warn('Could not restore notification settings.', error);
    return empty;
  }
}

function saveNotificationSettings() {
  try {
    window.localStorage.setItem(
      NOTIFICATION_SETTINGS_KEY,
      JSON.stringify(notificationSettings)
    );
    return true;
  } catch (error) {
    console.warn('Could not save notification settings.', error);
    return false;
  }
}

function loadNotifyPanelOpen() {
  try {
    return window.localStorage.getItem(NOTIFICATION_PANEL_KEY) === 'true';
  } catch (error) {
    return false;
  }
}

function setNotifyPanelOpen(open, persist = true) {
  if (!notifySettingsToggle || !notifyRow) return;

  notifySettingsToggle.setAttribute('aria-expanded', String(open));
  notifyRow.hidden = !open;

  if (persist) {
    try {
      window.localStorage.setItem(NOTIFICATION_PANEL_KEY, String(open));
    } catch (error) {
      console.warn('Could not save the notification panel state.', error);
    }
  }
}

function fillNotificationTemplate(template, time, label) {
  return template
    .replace(/\{time\}/g, time)
    .replace(/\{label\}/g, label || '')
    .replace(/\{name\}/g, label || '');
}

function buildNotificationContent(time, label, fallbackTitle, fallbackBody) {
  const titleTemplate = (notificationSettings.title || '').trim() || fallbackTitle;
  const bodyTemplate = (notificationSettings.body || '').trim() || fallbackBody;
  const title = fillNotificationTemplate(titleTemplate, time, label).trim() || fallbackTitle;
  const body = fillNotificationTemplate(bodyTemplate, time, label).trim() || fallbackBody;
  const customImage = (notificationSettings.image || '').trim();

  return {
    title,
    body,
    icon: customImage || new URL('../icon.png', window.location.href).href,
    image: customImage
  };
}

function updateNotificationPreview() {
  if (!notifyPreviewTitle || !notifyPreviewBody) return;

  const now = new Date();
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const typedLabel = labelInput ? labelInput.value.trim().slice(0, 24) : '';
  const sampleLabel = typedLabel || t('notifyPreviewSampleLabel');
  const content = buildNotificationContent(
    time,
    sampleLabel,
    t('ringing'),
    `${time} · ${sampleLabel}`
  );

  notifyPreviewTitle.textContent = content.title;
  notifyPreviewBody.textContent = content.body;

  if (notifyPreviewIcon && content.icon) notifyPreviewIcon.src = content.icon;
}

function renderNotificationImage() {
  if (!notifyImagePreview) return;

  const image = notificationSettings.image;

  if (!image) {
    notifyImagePreview.hidden = true;
    notifyImagePreview.removeAttribute('src');
    if (notifyImageUrlInput) notifyImageUrlInput.value = '';
    if (notifyImageClearButton) notifyImageClearButton.disabled = true;
    return;
  }

  notifyImagePreview.src = image;
  notifyImagePreview.hidden = false;
  if (notifyImageClearButton) notifyImageClearButton.disabled = false;
  if (notifyImageUrlInput && /^https?:/i.test(image)) notifyImageUrlInput.value = image;
}

function applyNotificationSettingsToForm() {
  if (notifyTitleInput) notifyTitleInput.value = notificationSettings.title;
  if (notifyBodyInput) notifyBodyInput.value = notificationSettings.body;
  renderNotificationImage();
  updateNotificationPreview();
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

function loadFiredOccurrences() {
  const occurrences = new Map();

  try {
    const raw = window.localStorage.getItem(FIRED_ALARMS_KEY);
    if (!raw) return occurrences;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return occurrences;

    Object.entries(parsed).forEach(([id, dateKey]) => {
      if (typeof dateKey === 'string' && /^\d{4}-\d{1,2}-\d{1,2}$/.test(dateKey)) {
        occurrences.set(id, dateKey);
      }
    });
  } catch (error) {
    console.warn('Could not restore fired alarms.', error);
  }

  return occurrences;
}

function saveFiredOccurrences() {
  try {
    window.localStorage.setItem(
      FIRED_ALARMS_KEY,
      JSON.stringify(Object.fromEntries(firedMinutes))
    );
  } catch (error) {
    console.warn('Could not save fired alarms.', error);
  }
}

function clearFiredOccurrence(id) {
  if (!firedMinutes.has(id)) return;
  firedMinutes.delete(id);
  saveFiredOccurrences();
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

      meta.textContent = soundLabel;

      const toggles = document.createElement('div');
      toggles.className = 'alarm-toggles';

      const notifyChip = document.createElement('button');
      notifyChip.type = 'button';
      notifyChip.className = `alarm-toggle${alarm.notify ? ' is-on' : ''}`;
      notifyChip.setAttribute('aria-pressed', String(alarm.notify));
      notifyChip.setAttribute('aria-label', t(alarm.notify ? 'notifyDisableAria' : 'notifyEnableAria'));
      const notifyChipIcon = document.createElement('span');
      notifyChipIcon.className = 'material-symbols-outlined';
      notifyChipIcon.textContent = alarm.notify ? 'notifications_active' : 'notifications_off';
      notifyChipIcon.setAttribute('aria-hidden', 'true');
      const notifyChipText = document.createElement('span');
      notifyChipText.textContent = `${t('notifyTitle')} ${t(alarm.notify ? 'notifyOn' : 'notifyOff')}`;
      notifyChip.append(notifyChipIcon, notifyChipText);
      notifyChip.addEventListener('click', () => toggleAlarmNotify(alarm));

      const soundOn = alarm.soundEnabled !== false;
      const soundChip = document.createElement('button');
      soundChip.type = 'button';
      soundChip.className = `alarm-toggle${soundOn ? ' is-on' : ''}`;
      soundChip.setAttribute('aria-pressed', String(soundOn));
      soundChip.setAttribute('aria-label', t(soundOn ? 'soundDisableAria' : 'soundEnableAria'));
      const soundChipIcon = document.createElement('span');
      soundChipIcon.className = 'material-symbols-outlined';
      soundChipIcon.textContent = soundOn ? 'volume_up' : 'volume_off';
      soundChipIcon.setAttribute('aria-hidden', 'true');
      const soundChipText = document.createElement('span');
      soundChipText.textContent = `${t('soundShort')} ${t(soundOn ? 'notifyOn' : 'notifyOff')}`;
      soundChip.append(soundChipIcon, soundChipText);
      soundChip.addEventListener('click', () => toggleAlarmSound(alarm));

      toggles.append(notifyChip, soundChip);

      main.append(line, schedule, meta, toggles);

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
        clearFiredOccurrence(alarm.id);
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

function updateAlarmNotifyState() {
  if (!notifyInput || !alarmNotifyState) return;

  const isOn = notifyInput.checked;
  alarmNotifyState.textContent = t(isOn ? 'notifyOn' : 'notifyOff');
  alarmNotifyState.classList.toggle('is-on', isOn);
}

function updateSoundEnabledState() {
  if (!soundEnabledInput || !alarmSoundEnabledState) return;

  const isOn = soundEnabledInput.checked;
  alarmSoundEnabledState.textContent = t(isOn ? 'notifyOn' : 'notifyOff');
  alarmSoundEnabledState.classList.toggle('is-on', isOn);
}

function updateNotifyRow() {
  if (!notifyRow) return;

  if (!notifications.supported) {
    if (notifySettingsToggle) notifySettingsToggle.hidden = true;
    notifyRow.hidden = true;
    return;
  }

  if (notifySettingsToggle) notifySettingsToggle.hidden = false;

  const permission = notifications.getPermission();
  const isActive = notifications.isActive();

  if (notifyToggle) {
    notifyToggle.checked = isActive;
    notifyToggle.disabled = notifyRequesting || permission === 'denied';
  }



  if (notifyButton) {
    notifyButton.hidden = permission !== 'default' || notifyRequesting;
    notifyButton.disabled = notifyRequesting;
  }

  if (notifyTestButton) {
    notifyTestButton.hidden = false;
    notifyTestButton.disabled = permission === 'denied';
  }
  if (notifyCloseButton) notifyCloseButton.hidden = false;

  const notifyBadge = document.getElementById('notify-badge');
  if (notifyBadge) {
    if (permission === 'denied') {
      notifyBadge.textContent = 'ブロック中';
      notifyBadge.className = 'alarm-settings-badge is-danger';
    } else if (permission === 'default') {
      notifyBadge.textContent = '未許可';
      notifyBadge.className = 'alarm-settings-badge is-warn';
    } else if (!isActive) {
      notifyBadge.textContent = 'OFF';
      notifyBadge.className = 'alarm-settings-badge';
    } else {
      notifyBadge.textContent = 'ON';
      notifyBadge.className = 'alarm-settings-badge is-on';
    }
  }

  if (permission === 'denied') {
    notifyStatus.textContent = t('notifyDenied');
  } else if (permission === 'default') {
    notifyStatus.textContent = t('notifyPrompt');
  } else if (!isActive) {
    notifyStatus.textContent = t('notifyOffHint');
  } else {
    notifyStatus.textContent = t('notifyGranted');
  }
}

async function enableNotifications() {
  if (!notifications.supported || notifyRequesting) return;

  notifyRequesting = true;
  updateNotifyRow();

  try {
    const permission = await notifications.request();

    if (permission === 'granted') {
      notifications.setEnabled(true);
      await notifications.registerServiceWorker();
      statusMessage.textContent = t('notifyTurnedOn');
    } else {
      notifications.setEnabled(false);
      notifications.closeAll();
      statusMessage.textContent = permission === 'denied'
        ? t('notifyDenied')
        : t('notifyPermissionNeeded');
    }
  } finally {
    notifyRequesting = false;
    updateNotifyRow();
  }
}

function disableNotifications() {
  notifications.setEnabled(false);
  notifications.closeAll();
  statusMessage.textContent = t('notifyTurnedOff');
  updateNotifyRow();
}

async function toggleAlarmNotify(alarm) {
  alarm.notify = !alarm.notify;
  saveAlarms();

  if (alarm.notify) {
    const permission = notifications.getPermission();

    if (permission === 'granted') {
      notifications.setEnabled(true);
      await notifications.registerServiceWorker();
      statusMessage.textContent = t('notifyEnabledForAlarm');
    } else if (permission === 'default') {
      await enableNotifications();
    } else {
      statusMessage.textContent = t(
        permission === 'unsupported' ? 'notifyDenied' : 'notifyPermissionNeeded'
      );
    }
  } else {
    statusMessage.textContent = t('notifyDisabledForAlarm');
  }

  renderAlarms();
  updateNotifyRow();
}

function toggleAlarmSound(alarm) {
  alarm.soundEnabled = alarm.soundEnabled === false;
  saveAlarms();
  statusMessage.textContent = t(
    alarm.soundEnabled ? 'soundEnabledForAlarm' : 'soundDisabledForAlarm'
  );
  renderAlarms();
}

function maybeEnableNotificationsForAlarm() {
  if (!notifyInput || !notifyInput.checked) return;

  const permission = notifications.getPermission();

  if (permission === 'granted') {
    if (!notifications.isEnabled()) notifications.setEnabled(true);
    notifications.registerServiceWorker();
    updateNotifyRow();
  } else if (permission === 'default') {
    enableNotifications();
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
  const soundEnabled = info && typeof info.soundEnabled === 'boolean'
    ? info.soundEnabled
    : alarm
      ? alarm.soundEnabled !== false
      : true;

  ringing = true;
  ringingInfo = {
    time,
    label: label || '',
    sound: soundEnabled ? sound : 'none',
    soundEnabled,
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
  startSound(ringingInfo.sound);

  if (notify) {
    const content = buildNotificationContent(
      time,
      label || '',
      t('ringing'),
      label ? `${time} · ${label}` : time
    );

    notifications.show(content.title, {
      body: content.body,
      icon: content.icon,
      ...(content.image ? { image: content.image } : {}),
      tag: 'time-tools-alarm',
      actions: [
        { action: 'stop', title: t('stop') },
        { action: 'snooze', title: t('snooze') }
      ]
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
  notifications.closeAll();
  overlay.hidden = true;
  ringing = false;
  document.title = `${t('title')} | Time Tools`;
}

function snoozeRinging() {
  const selectedDuration = snoozeDurationMinutes;
  stopSound();
  notifications.closeAll();
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
    soundEnabled: soundEnabledInput ? soundEnabledInput.checked : true,
    notify: notifyInput ? notifyInput.checked : false
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
  maybeEnableNotificationsForAlarm();
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
    duplicate.soundEnabled = soundEnabledInput.checked;
    duplicate.notify = notifyInput.checked;
    labelInput.value = '';
    statusMessage.textContent = t('enabled').replace('{time}', time);
    saveAlarms();
    renderAlarms();
    maybeEnableNotificationsForAlarm();
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
      target.soundEnabled = soundEnabledInput.checked;
      target.notify = notifyInput.checked;
      clearFiredOccurrence(target.id);
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
      soundEnabled: soundEnabledInput.checked,
      notify: notifyInput.checked
    });
    statusMessage.textContent = t('added').replace('{time}', time);
  }

  saveAlarms();
  resetForm();
  maybeEnableNotificationsForAlarm();
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
  notifyInput.checked = alarm.notify === true;
  soundEnabledInput.checked = alarm.soundEnabled !== false;
  selectedDays = new Set(alarm.days);

  updateAlarmNotifyState();
  updateSoundEnabledState();
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
  if (notifyInput) notifyInput.checked = false;
  updateAlarmNotifyState();

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

function getDueRecurringOccurrence(alarm, now) {
  const [hours, minutes] = alarm.time.split(':').map(Number);
  const nowMs = now.getTime();

  for (let offset = 0; offset <= 1; offset += 1) {
    const occurrence = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - offset,
      hours,
      minutes,
      0,
      0
    );

    if (!alarm.days.includes(occurrence.getDay())) continue;

    const fireAt = occurrence.getTime();
    if (fireAt <= nowMs && nowMs - fireAt < ONCE_WINDOW_MS) {
      return currentDayKey(occurrence);
    }
  }

  return null;
}

function checkAlarms() {
  if (ringing) return;

  const now = new Date();

  if (snoozeUntil > 0 && Date.now() >= snoozeUntil) {
    const snoozedAlarm = alarms.find((alarm) => alarm.id === snoozeInfo.alarmId) || null;
    snoozeUntil = 0;
    clearSnoozeState();
    statusMessage.textContent = '';
    renderAlarms();
    triggerRing(
      snoozeInfo.time || currentTime(now),
      snoozeInfo.label,
      snoozedAlarm,
      snoozedAlarm ? null : snoozeInfo
    );
    return;
  }

  if (snoozeUntil > 0) renderAlarms();

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

  const due = alarms
    .filter((alarm) => alarm.enabled && !alarm.once)
    .map((alarm) => ({
      alarm,
      dateKey: getDueRecurringOccurrence(alarm, now)
    }))
    .filter(({ alarm, dateKey }) =>
      dateKey && firedMinutes.get(alarm.id) !== dateKey
    );

  if (due.length === 0) return;

  due.forEach(({ alarm, dateKey }) => {
    firedMinutes.set(alarm.id, dateKey);
  });
  saveFiredOccurrences();
  triggerRing(displayTime(due[0].alarm), due[0].alarm.label, due[0].alarm);
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

notifyInput.addEventListener('change', updateAlarmNotifyState);
soundEnabledInput.addEventListener('change', updateSoundEnabledState);

if (notifyButton) {
  notifyButton.addEventListener('click', () => {
    enableNotifications();
  });
}

if (notifySettingsToggle) {
  notifySettingsToggle.addEventListener('click', () => {
    const isOpen = notifySettingsToggle.getAttribute('aria-expanded') === 'true';
    setNotifyPanelOpen(!isOpen);
  });
}

if (notifyToggle) {
  notifyToggle.addEventListener('change', () => {
    if (notifyToggle.checked) enableNotifications();
    else disableNotifications();
  });
}

if (notifyTitleInput) {
  notifyTitleInput.addEventListener('input', () => {
    notificationSettings.title = notifyTitleInput.value.slice(0, 60);
    saveNotificationSettings();
    updateNotificationPreview();
  });
}

if (notifyBodyInput) {
  notifyBodyInput.addEventListener('input', () => {
    notificationSettings.body = notifyBodyInput.value.slice(0, 160);
    saveNotificationSettings();
    updateNotificationPreview();
  });
}

document.querySelectorAll('[data-template]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!notifyBodyInput) return;

    const template = button.dataset.template || '';
    const isFocused = document.activeElement === notifyBodyInput;

    if (isFocused) {
      const start = notifyBodyInput.selectionStart ?? notifyBodyInput.value.length;
      const end = notifyBodyInput.selectionEnd ?? start;
      notifyBodyInput.setRangeText(template, start, end, 'end');
    } else {
      notifyBodyInput.value = template;
    }

    notifyBodyInput.dispatchEvent(new Event('input', { bubbles: true }));
    notifyBodyInput.focus();
  });
});

if (notifyImageUrlInput) {
  notifyImageUrlInput.addEventListener('change', () => {
    const value = notifyImageUrlInput.value.trim();

    if (!value) {
      if (notificationSettings.image && /^https?:/i.test(notificationSettings.image)) {
        notificationSettings.image = '';
        saveNotificationSettings();
        renderNotificationImage();
        statusMessage.textContent = t('notifyImageRemoved');
      }
      return;
    }

    let url;
    try {
      url = new URL(value);
    } catch (error) {
      statusMessage.textContent = t('notifyImageInvalid');
      return;
    }

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      statusMessage.textContent = t('notifyImageInvalid');
      return;
    }

    notificationSettings.image = value;
    saveNotificationSettings();
    renderNotificationImage();
    statusMessage.textContent = t('notifyImageLoaded');
  });
}

if (notifyImageFileInput) {
  notifyImageFileInput.addEventListener('change', async () => {
    const file = notifyImageFileInput.files && notifyImageFileInput.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      statusMessage.textContent = t('notifyImageInvalid');
      notifyImageFileInput.value = '';
      return;
    }

    if (file.size > MAX_NOTIFICATION_IMAGE_BYTES) {
      statusMessage.textContent = t('notifyImageTooLarge').replace(
        '{limit}',
        String(MAX_NOTIFICATION_IMAGE_BYTES / (1024 * 1024))
      );
      notifyImageFileInput.value = '';
      return;
    }

    try {
      const source = await readSoundFile(file);
      const previousImage = notificationSettings.image;

      notificationSettings.image = source;

      if (!saveNotificationSettings()) {
        notificationSettings.image = previousImage;
        statusMessage.textContent = t('notifySaveFailed');
        return;
      }

      if (notifyImageUrlInput) notifyImageUrlInput.value = '';
      renderNotificationImage();
      statusMessage.textContent = t('notifyImageLoaded');
    } catch (error) {
      console.warn('Could not load the notification image.', error);
      statusMessage.textContent = t('notifyImageInvalid');
    } finally {
      notifyImageFileInput.value = '';
    }
  });
}

if (notifyImageClearButton) {
  notifyImageClearButton.addEventListener('click', () => {
    notificationSettings.image = '';
    saveNotificationSettings();
    renderNotificationImage();
    statusMessage.textContent = t('notifyImageRemoved');
  });
}

if (notifyResetButton) {
  notifyResetButton.addEventListener('click', () => {
    notificationSettings = { title: '', body: '', image: '' };

    if (!saveNotificationSettings()) {
      statusMessage.textContent = t('notifySaveFailed');
      return;
    }

    applyNotificationSettingsToForm();
    statusMessage.textContent = t('notifyResetDone');
  });
}

if (notifyCloseButton) {
  notifyCloseButton.addEventListener('click', () => {
    if (ringing) {
      stopRinging();
    } else {
      notifications.closeAll();
    }
    statusMessage.textContent = t('notifyClosed');
  });
}

if (notifyTestButton) {
  notifyTestButton.addEventListener('click', async () => {
    try {
      if (notifications.getPermission() !== 'granted') {
        const permission = await notifications.request();
        if (permission === 'granted') {
          notifications.setEnabled(true);
          updateNotifyRow();
        } else {
          statusMessage.textContent = permission === 'denied'
            ? t('notifyDenied')
            : t('notifyPermissionNeeded');
          updateNotifyRow();
          return;
        }
      }

      const now = new Date();
      const content = buildNotificationContent(
        `${pad(now.getHours())}:${pad(now.getMinutes())}`,
        '',
        t('testNotificationTitle'),
        t('testNotificationBody')
      );

      const shown = await notifications.show(content.title, {
        body: content.body,
        icon: content.icon,
        ...(content.image ? { image: content.image } : {}),
        tag: 'time-tools-alarm-test'
      });
      statusMessage.textContent = shown
        ? t('testNotificationSent')
        : t('testNotificationFailed');
      updateNotifyRow();
    } catch (err) {
      console.warn('Test notification execution failed:', err);
      statusMessage.textContent = t('testNotificationFailed');
      updateNotifyRow();
    }
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    const data = event.data;
    if (!data || data.type !== NOTIFICATION_MESSAGE_TYPE) return;

    if (data.action === 'stop' && ringing) stopRinging();
    else if (data.action === 'snooze' && ringing) snoozeRinging();
  });
}

stopButton.addEventListener('click', stopRinging);
snoozeButton.addEventListener('click', snoozeRinging);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && ringing) stopRinging();
});

document.addEventListener('pointerdown', ensureAudio, { once: true });

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) checkAlarms();
});

window.addEventListener('focus', checkAlarms);
window.addEventListener('pageshow', checkAlarms);

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
updateClock();
window.setInterval(updateClock, 1000);
updateSnoozeDurationControls();
updateAlarmVolume(alarmVolume, false);
updateAlarmNotifyState();
updateSoundEnabledState();

(() => {
  const nextHour = new Date(Date.now() + 60 * 60 * 1000);
  timeInput.value = `${pad(nextHour.getHours())}:00:00`;
})();

syncDayChips();
renderFixedTimes();
refreshCustomSoundOption();
customSoundRestorePromise = restoreCustomFileSounds();
applyNotificationSettingsToForm();
setNotifyPanelOpen(loadNotifyPanelOpen(), false);
renderAlarms();
updateNotifyRow();

if (notifications.isActive()) notifications.registerServiceWorker();

window.setInterval(checkAlarms, 1000);
window.setInterval(renderAlarms, 60000);
