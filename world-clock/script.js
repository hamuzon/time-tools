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
    title: '世界時計',
    yourZone: 'あなたのタイムゾーン',
    listLabel: '世界の現在時刻',
    localBadge: '現在地'
  },
  en: {
    title: 'World Clock',
    yourZone: 'Your time zone',
    listLabel: 'Current times around the world',
    localBadge: 'Local'
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
const localZone = document.getElementById('local-zone');
const localTime = document.getElementById('local-time');
const localDate = document.getElementById('local-date');
const t = (key) => translations[language][key];

let localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

const TIME_API_BASE = window.location.hostname.endsWith('hamuzon-jp.f5.si')
  ? 'https://api-time.hamuzon-jp.f5.si'
  : 'https://api-time.hamusata.f5.si';

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

async function syncCityTime(timeZone) {
  const startedAt = Date.now();

  try {
    const endpoint = `${TIME_API_BASE}/api/Time/current/zone?timeZone=${encodeURIComponent(timeZone)}`;
    const response = await fetch(endpoint, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Timezone API returned ${response.status}.`);

    const data = await response.json();
    if (data.timeZone !== timeZone) {
      throw new Error(`Timezone API returned an unexpected time zone for ${timeZone}.`);
    }

    const serverMs = getServerTimestamp(data, timeZone);

    const finishedAt = Date.now();
    clockOffset = serverMs + (finishedAt - startedAt) / 2 - finishedAt;

    update();
  } catch (error) {
    console.warn(`Could not sync time for ${timeZone}.`, error);
  }
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

function buildRows() {
  list.replaceChildren();

  CITIES.forEach((city) => {
    const row = document.createElement('li');
    row.className = city.timeZone === localTimeZone ? 'world-row is-local' : 'world-row';
    row.dataset.timeZone = city.timeZone;

    const cityBlock = document.createElement('div');
    cityBlock.className = 'world-city';

    const icon = document.createElement('span');
    icon.className = 'world-icon';

    const info = document.createElement('div');

    const nameRow = document.createElement('div');
    nameRow.className = 'world-city-name-row';

    const name = document.createElement('span');
    name.className = 'world-name';
    name.textContent = language === 'en' ? city.en : city.ja;

    const badge = document.createElement('span');
    badge.className = 'local-badge';
    badge.textContent = t('localBadge');
    badge.hidden = city.timeZone !== localTimeZone;

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
    list.append(row);
  });
}

async function syncLocalTimeZone() {
  try {
    const response = await fetch(`${TIME_API_BASE}/api/ip`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Timezone API returned ${response.status}.`);

    const data = await response.json();
    const timeZone = typeof data.timezone === 'string' ? data.timezone : '';
    if (!timeZone) throw new Error('Timezone API response did not include a timezone.');

    new Intl.DateTimeFormat(locale, { timeZone });
    if (timeZone !== localTimeZone) {
      localTimeZone = timeZone;
      buildRows();
      update();
    }

    return timeZone;
  } catch (error) {
    console.warn('Could not detect the current time zone.', error);
  }

  return localTimeZone;
}

function update() {
  const now = clockNow();

  localZone.textContent = localTimeZone.replace(/_/g, ' ');
  localTime.textContent = getFormatters(localTimeZone).time.format(now);
  localDate.textContent = getFormatters(localTimeZone).localDate.format(now);

  list.querySelectorAll('.world-row').forEach((row) => {
    const timeZone = row.dataset.timeZone;
    const formatter = getFormatters(timeZone);
    const hour = getHour(timeZone, now);
    const isDaytime = hour >= 6 && hour < 18;

    const icon = row.querySelector('.world-icon');
    icon.textContent = isDaytime ? '☀️' : '🌙';
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

buildRows();
update();
window.setInterval(update, 1000);
syncLocalTimeZone().then(syncCityTime);
