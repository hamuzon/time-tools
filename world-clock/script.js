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
    title: '世界時計',
    yourZone: '端末時間',
    currentLocation: '現在地',
    ipLocation: '現在地',
    listLabel: '世界の現在時刻',
    localBadge: '端末時間',
    unknownZone: '取得できません'
  },
  en: {
    title: 'World Clock',
    yourZone: 'Device time',
    currentLocation: 'Current location',
    ipLocation: 'Current location',
    listLabel: 'Current times around the world',
    localBadge: 'Device time',
    unknownZone: 'Unavailable'
  }
};

const CITIES = [
  { timeZone: 'Asia/Tokyo', ja: '東京', en: 'Tokyo' },
  { timeZone: 'Asia/Seoul', ja: 'ソウル', en: 'Seoul' },
  { timeZone: 'Asia/Shanghai', ja: '上海', en: 'Shanghai' },
  { timeZone: 'Asia/Singapore', ja: 'シンガポール', en: 'Singapore' },
  { timeZone: 'Asia/Dubai', ja: 'ドバイ', en: 'Dubai' },
  { timeZone: 'Europe/London', ja: 'ロンドン', en: 'London' },
  { timeZone: 'Europe/Paris', ja: 'パリ', en: 'Paris' },
  { timeZone: 'America/New_York', ja: 'ニューヨーク', en: 'New York' },
  { timeZone: 'America/Los_Angeles', ja: 'ロサンゼルス', en: 'Los Angeles' },
  { timeZone: 'Pacific/Honolulu', ja: 'ホノルル', en: 'Honolulu' },
  { timeZone: 'Australia/Sydney', ja: 'シドニー', en: 'Sydney' }
];

const locale = language === 'en' ? 'en-US' : 'ja-JP';
const list = document.getElementById('world-list');
const localZoneLabel = document.getElementById('local-zone-label');
const localZone = document.getElementById('local-zone');
const localTime = document.getElementById('local-time');
const localDate = document.getElementById('local-date');
const ipClock = document.getElementById('ip-clock');
const ipZone = document.getElementById('ip-zone');
const ipTime = document.getElementById('ip-time');
const t = (key) => translations[language][key];

function detectTimeZone() {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      new Intl.DateTimeFormat('en-US', { timeZone });
      return timeZone;
    }
  } catch (error) {
    console.warn('Could not read the device time zone.', error);
  }

  return '';
}

function isValidTimeZone(timeZone) {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone });
    return true;
  } catch {
    return false;
  }
}

let localTimeZone = detectTimeZone();
let ipTimeZone = '';

const offsetFormatters = new Map();

function getOffsetMinutes(timeZone, date) {
  if (!offsetFormatters.has(timeZone)) {
    offsetFormatters.set(timeZone, new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'longOffset'
    }));
  }

  const part = offsetFormatters.get(timeZone)
    .formatToParts(date)
    .find((entry) => entry.type === 'timeZoneName');
  const match = /^GMT(?:([+-])(\d{2}):(\d{2}))?$/.exec(part ? part.value : '');
  if (!match) return null;
  if (!match[1]) return 0;

  const sign = match[1] === '-' ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3]));
}

// IPで取得したタイムゾーンと端末のタイムゾーンで同じ時刻なら true
function sameTimeAsIpZone() {
  if (!ipTimeZone || !localTimeZone) return false;
  if (ipTimeZone === localTimeZone) return true;

  try {
    const now = clockNow();
    const ipOffset = getOffsetMinutes(ipTimeZone, now);
    const localOffset = getOffsetMinutes(localTimeZone, now);
    return ipOffset !== null && ipOffset === localOffset;
  } catch {
    return false;
  }
}

function getTimeApiBases() {
  const hostname = window.location.hostname;
  const isHamuzon = hostname.includes('hamuzon-jp.f5.si');
  const primary = isHamuzon
    ? 'https://api-time.hamuzon-jp.f5.si'
    : 'https://api-time.hamusata.f5.si';
  const fallback = isHamuzon
    ? 'https://api-time.hamusata.f5.si'
    : 'https://api-time.hamuzon-jp.f5.si';
  return [primary, fallback];
}

async function fetchTimeApiJson(pathAndQuery) {
  for (const base of getTimeApiBases()) {
    try {
      const response = await fetch(`${base}${pathAndQuery}`, { cache: 'no-store' });
      if (!response.ok) {
        console.warn(`Time API at ${base} returned ${response.status}.`);
        continue;
      }
      return await response.json();
    } catch (error) {
      console.warn(`Time API request to ${base} failed.`, error);
    }
  }

  return null;
}

let clockOffset = 0;

function clockNow() {
  return new Date(Date.now() + clockOffset);
}

function getServerTimestamp(data, timeZone) {
  const values = [
    Number(data.year),
    Number(data.month),
    Number(data.day),
    Number(data.hour),
    Number(data.minute),
    Number(data.seconds),
    Number(data.milliSeconds)
  ];
  const [year, month, day, hour, minute, second, millisecond] = values;

  if (!values.every(Number.isInteger) ||
      month < 1 || month > 12 ||
      day < 1 || day > 31 ||
      hour < 0 || hour > 23 ||
      minute < 0 || minute > 59 ||
      second < 0 || second > 59 ||
      millisecond < 0 || millisecond > 999) {
    throw new Error('Timezone API returned an invalid date or time.');
  }

  const localTimeAsUtc = Date.UTC(year, month - 1, day, hour, minute, second, millisecond);
  const normalizedDate = new Date(localTimeAsUtc);
  if (
    normalizedDate.getUTCFullYear() !== year ||
    normalizedDate.getUTCMonth() !== month - 1 ||
    normalizedDate.getUTCDate() !== day
  ) {
    throw new Error('Timezone API returned an invalid calendar date.');
  }

  const partsFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  });
  let timestamp = localTimeAsUtc;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const parts = Object.fromEntries(
      partsFormatter.formatToParts(new Date(timestamp))
        .map((part) => [part.type, part.value])
    );
    const representedAsUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second)
    );
    const offset = representedAsUtc - Math.floor(timestamp / 1000) * 1000;
    const adjustedTimestamp = localTimeAsUtc - offset;

    if (adjustedTimestamp === timestamp) return timestamp;
    timestamp = adjustedTimestamp;
  }

  return timestamp;
}

// /api/Time/current/zone?timeZone=... でタイムゾーンごとの時刻を取得して補正する
async function syncZoneTime(timeZone) {
  if (!timeZone) return false;

  const startedAt = Date.now();
  const data = await fetchTimeApiJson(
    `/api/Time/current/zone?timeZone=${encodeURIComponent(timeZone)}`
  );
  if (!data) return false;

  if (data.timeZone !== timeZone) {
    console.warn(`Timezone API returned an unexpected time zone for ${timeZone}.`);
    return false;
  }

  try {
    const serverMs = getServerTimestamp(data, timeZone);
    const finishedAt = Date.now();
    clockOffset = serverMs + (finishedAt - startedAt) / 2 - finishedAt;
    update();
    return true;
  } catch (error) {
    console.warn(`Could not sync time for ${timeZone}.`, error);
    return false;
  }
}

// /now でエポックミリ秒を取得して補正する
async function syncNow() {
  for (const base of getTimeApiBases()) {
    try {
      const startedAt = Date.now();
      const response = await fetch(`${base}/now`, { cache: 'no-store' });
      if (!response.ok) {
        console.warn(`Time API at ${base} returned ${response.status}.`);
        continue;
      }

      const serverMs = Number((await response.text()).trim());
      if (!Number.isFinite(serverMs)) {
        console.warn(`Time API at ${base} returned an invalid timestamp.`);
        continue;
      }

      const finishedAt = Date.now();
      clockOffset = serverMs + (finishedAt - startedAt) / 2 - finishedAt;
      update();
      return true;
    } catch (error) {
      console.warn(`Time sync from ${base} failed.`, error);
    }
  }

  return false;
}

// /api/ip で現在地のタイムゾーンを取得する（unixtime は予備の時刻）
async function syncIpInfo() {
  const startedAt = Date.now();
  const data = await fetchTimeApiJson('/api/ip');
  const finishedAt = Date.now();
  if (!data) return false;

  const timeZone = typeof data.timezone === 'string' ? data.timezone : '';
  if (timeZone && isValidTimeZone(timeZone) && timeZone !== ipTimeZone) {
    ipTimeZone = timeZone;
    buildRows();
    update();
  }

  const unixtime = Number(data.unixtime);
  if (Number.isFinite(unixtime)) {
    clockOffset = unixtime * 1000 + 500 + (finishedAt - startedAt) / 2 - finishedAt;
    return true;
  }

  return false;
}

async function syncTime() {
  await syncIpInfo();
  update();

  await syncZoneTime(localTimeZone || ipTimeZone);
  await syncNow();
  update();
}

function createFormatters(timeZone) {
  return {
    time: new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    }),
    date: new Intl.DateTimeFormat(locale, {
      timeZone,
      month: 'numeric',
      day: 'numeric',
      weekday: 'short'
    }),
    localDate: new Intl.DateTimeFormat(locale, {
      timeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    }),
    hour: new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      hourCycle: 'h23'
    })
  };
}

const formatters = new Map();

function getFormatters(timeZone) {
  if (!formatters.has(timeZone)) formatters.set(timeZone, createFormatters(timeZone));
  return formatters.get(timeZone);
}

function getHour(timeZone, now) {
  const hour = Number(getFormatters(timeZone).hour.format(now));
  return Number.isFinite(hour) ? hour % 24 : 12;
}

function getZoneLabel(timeZone) {
  const segment = timeZone.split('/').filter(Boolean).pop() || timeZone;
  return segment.replace(/_/g, ' ');
}

function getRowBadges(timeZone) {
  const badges = [];

  if (ipTimeZone && timeZone === ipTimeZone) {
    badges.push(t('currentLocation'));
  }
  if (localTimeZone && timeZone === localTimeZone && timeZone !== ipTimeZone) {
    badges.push(t('localBadge'));
  }

  return badges;
}

function createRow(timeZone, label) {
  const badges = getRowBadges(timeZone);
  const row = document.createElement('li');
  row.className = badges.length ? 'world-row is-local' : 'world-row';
  row.dataset.timeZone = timeZone;

  const cityBlock = document.createElement('div');
  cityBlock.className = 'world-city';

  const icon = document.createElement('span');
  icon.className = 'world-icon material-symbols-outlined';

  const info = document.createElement('div');

  const nameRow = document.createElement('div');
  nameRow.className = 'world-city-name-row';

  const name = document.createElement('span');
  name.className = 'world-name';
  name.textContent = label;

  const badge = document.createElement('span');
  badge.className = 'local-badge';
  badge.textContent = badges.join(' / ');
  badge.hidden = badges.length === 0;

  nameRow.append(name, badge);

  const date = document.createElement('span');
  date.className = 'world-date';

  info.append(nameRow, date);

  cityBlock.append(icon, info);

  const timeBlock = document.createElement('div');
  timeBlock.className = 'world-time-block';

  const time = document.createElement('span');
  time.className = 'world-time';
  time.textContent = '--:--:--';

  timeBlock.append(time);

  row.append(cityBlock, timeBlock);

  return row;
}

function buildRows() {
  list.replaceChildren();

  const isListed = (timeZone) => CITIES.some((city) => city.timeZone === timeZone);

  // 一覧にないタイムゾーンだけ、そのときだけ先頭に追加する
  if (ipTimeZone && !isListed(ipTimeZone)) {
    list.append(createRow(ipTimeZone, getZoneLabel(ipTimeZone)));
  }
  if (localTimeZone && localTimeZone !== ipTimeZone && !isListed(localTimeZone)) {
    list.append(createRow(localTimeZone, getZoneLabel(localTimeZone)));
  }

  CITIES.forEach((city) => {
    list.append(createRow(
      city.timeZone,
      language === 'en' ? city.en : city.ja
    ));
  });
}

function update() {
  const now = clockNow();
  const sameTime = sameTimeAsIpZone();
  const showingIp = sameTime && Boolean(ipTimeZone);
  const displayZone = showingIp ? ipTimeZone : localTimeZone;

  localZoneLabel.textContent = showingIp ? t('currentLocation') : t('yourZone');

  if (displayZone) {
    localZone.textContent = displayZone.replace(/_/g, ' ');
    localTime.textContent = getFormatters(displayZone).time.format(now);
    localDate.textContent = getFormatters(displayZone).localDate.format(now);
  } else {
    localZone.textContent = t('unknownZone');
    localTime.textContent = '--:--:--';
    localDate.textContent = '';
  }

  ipClock.hidden = !ipTimeZone || sameTime;
  if (ipTimeZone && !sameTime) {
    const ipFormatter = getFormatters(ipTimeZone);
    ipZone.textContent = ipTimeZone.replace(/_/g, ' ');
    ipTime.textContent = `${ipFormatter.date.format(now)} ${ipFormatter.time.format(now)}`;
  }

  list.querySelectorAll('.world-row').forEach((row) => {
    const timeZone = row.dataset.timeZone;
    const formatter = getFormatters(timeZone);
    const hour = getHour(timeZone, now);
    const isDaytime = hour >= 6 && hour < 18;

    const icon = row.querySelector('.world-icon');
    icon.textContent = isDaytime ? 'light_mode' : 'dark_mode';
    icon.setAttribute('role', 'img');
    icon.setAttribute('aria-label', isDaytime ? 'Day' : 'Night');

    row.querySelector('.world-date').textContent = formatter.date.format(now);
    row.querySelector('.world-time').textContent = formatter.time.format(now);
  });
}

document.querySelectorAll('[data-i18n]').forEach((element) => {
  const value = t(element.dataset.i18n);
  if (value !== undefined) element.textContent = value;
});

document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
  const value = t(element.dataset.i18nAria);
  if (value !== undefined) element.setAttribute('aria-label', value);
});

document.title = `${t('title')} | Time Tools`;

function refreshLocalTimeZone() {
  if (document.visibilityState !== 'visible') return;

  const nextTimeZone = detectTimeZone();
  if (!nextTimeZone || nextTimeZone === localTimeZone) return;

  localTimeZone = nextTimeZone;
  buildRows();
  update();
}

document.addEventListener('visibilitychange', refreshLocalTimeZone);

buildRows();
update();
window.setInterval(update, 1000);
syncTime();
