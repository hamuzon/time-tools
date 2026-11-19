const languageUrl = new URL(window.location.href);
const languageParameter = languageUrl.searchParams.get('lang');
const language = languageParameter === 'en' ? 'en' : 'ja';

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

const goParameter = languageUrl.searchParams.get('go');
const goNumber = goParameter !== null && goParameter.trim() !== '' ? Number(goParameter) : NaN;
const goPercent = Number.isFinite(goNumber) ? Math.min(100, Math.max(0, goNumber)) : null;

if (language !== 'en' && languageUrl.search) {
  window.history.replaceState(null, '', `${languageUrl.pathname}${languageUrl.hash}`);
}

const translations = {
  ja: {
    eyebrow: '今年の進捗 / Year Progress',
    title: '今年の進捗',
    elapsedLabel: '経過',
    untilEnd: '終了まで',
    dayUnit: '日',
    complete: '今年が終了しました。'
  },
  en: {
    eyebrow: 'Year Progress',
    title: 'Year Progress',
    elapsedLabel: 'Elapsed',
    untilEnd: 'Ends in',
    dayUnit: 'd',
    complete: 'This year is over.'
  }
};

const locale = language === 'en' ? 'en-US' : 'ja-JP';
const t = (key) => translations[language][key];

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

let clockOffset = 0;

function clockNow() {
  return new Date(Date.now() + clockOffset);
}

async function syncTime() {
  const bases = getTimeApiBases();
  for (const base of bases) {
    try {
      const startedAt = Date.now();
      const response = await fetch(`${base}/now`, { cache: 'no-store' });
      if (!response.ok) continue;
      const text = (await response.text()).trim();
      const serverMs = Number(text);
      if (!Number.isFinite(serverMs)) continue;
      const finishedAt = Date.now();
      clockOffset = serverMs + (finishedAt - startedAt) / 2 - finishedAt;
      update();
      return;
    } catch (e) {
      console.warn(`Time sync from ${base} failed:`, e);
    }
  }
}

const pageTitle = document.getElementById('page-title');
const percentDisplay = document.getElementById('percent-value');
const countdownDisplay = document.getElementById('countdown-value');
const completionMessage = document.getElementById('completion-message');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const periodNote = document.getElementById('period-note');

const longDateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const timeFormatter = new Intl.DateTimeFormat(locale, {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23'
});

function formatDateTime(date) {
  return `${longDateFormatter.format(date)} ${timeFormatter.format(date)}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function splitDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}

function formatCountdown(milliseconds) {
  const { days, hours, minutes, seconds } = splitDuration(milliseconds);
  return `${days}${t('dayUnit')} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

let lastYearKey = '';

function renderTitle(year) {
  const yearKey = String(year);
  if (yearKey === lastYearKey) return;
  lastYearKey = yearKey;

  pageTitle.textContent = language === 'ja'
    ? `今年(${year}年) は残り 何% ?`
    : `How much of ${year} is left?`;

  document.title = language === 'ja'
    ? `今年(${year}年) は残り 何% ? | Time tools`
    : `This Year (${year}) - How much is left? | Time Tools`;
}

function update() {
  const now = clockNow();
  const year = now.getFullYear();
  renderTitle(year);

  const start = new Date(year, 0, 1, 0, 0, 0, 0);
  const end = new Date(year + 1, 0, 1, 0, 0, 0, 0);
  const endOfYear = new Date(year, 11, 31, 23, 59, 59, 0);
  const total = end.getTime() - start.getTime();

  let remainingMs;
  let elapsedPercent;

  if (goPercent !== null) {
    elapsedPercent = goPercent;
    remainingMs = ((100 - goPercent) / 100) * total;
  } else {
    const elapsedMs = Math.min(total, Math.max(0, now.getTime() - start.getTime()));
    remainingMs = Math.max(end.getTime() - now.getTime(), 0);
    elapsedPercent = total > 0 ? (elapsedMs / total) * 100 : 0;
  }

  percentDisplay.textContent = elapsedPercent.toFixed(6);

  progressFill.style.width = `${elapsedPercent}%`;
  progressBar.setAttribute('aria-valuenow', elapsedPercent.toFixed(2));
  progressBar.setAttribute('aria-valuetext', `${elapsedPercent.toFixed(6)}%`);

  countdownDisplay.textContent = formatCountdown(remainingMs);

  const isComplete = remainingMs <= 0;
  completionMessage.hidden = !isComplete;
  completionMessage.textContent = isComplete ? t('complete') : '';

  periodNote.textContent = language === 'ja'
    ? `${formatDateTime(start)} 〜 ${formatDateTime(endOfYear)}`
    : `${formatDateTime(start)} – ${formatDateTime(endOfYear)}`;
}

document.querySelectorAll('[data-i18n]').forEach((element) => {
  const value = t(element.dataset.i18n);
  if (value !== undefined) element.textContent = value;
});

update();
window.setInterval(update, 1000);

syncTime();
window.setInterval(syncTime, 10 * 60 * 1000);
