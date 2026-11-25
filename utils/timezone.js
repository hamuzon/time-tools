/*
 * Shared timezone helper for the Time tools progress pages.
 *
 * Requires utils/timezone-ja.js (CITY_JA) to be loaded first.
 * Exposes window.TimeZoneTools.
 */
(function (global) {
  'use strict';

  // `timezone-ja.js` declares CITY_JA with `const`, which is not exposed on
  // `window`; resolve the global lexical binding directly when available.
  const cityJa = (typeof CITY_JA !== 'undefined' && CITY_JA) || global.CITY_JA || {};

  const zoneFormatterCache = new Map();
  const offsetFormatterCache = new Map();

  function isSupportedTimeZone(timeZone) {
    if (!timeZone) return false;

    try {
      new Intl.DateTimeFormat('en-US', { timeZone });
      return true;
    } catch (e) {
      return false;
    }
  }

  function getBrowserTimeZone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Tokyo';
    } catch (e) {
      return 'Asia/Tokyo';
    }
  }

  function watchBrowserTimeZone(callback) {
    let lastTimeZone = getBrowserTimeZone();

    function check() {
      const timeZone = getBrowserTimeZone();
      if (!timeZone || timeZone === lastTimeZone) return false;

      lastTimeZone = timeZone;
      if (typeof callback === 'function') callback(timeZone);
      return true;
    }

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) check();
    });
    global.addEventListener('focus', check);
    global.addEventListener('pageshow', check);

    return check;
  }

  function getCityDisplayName(timeZone, isJa) {
    if (isJa && cityJa[timeZone]) return cityJa[timeZone];

    const parts = timeZone.split('/');
    return parts[parts.length - 1].replace(/_/g, ' ');
  }

  function getZoneFormatter(timeZone) {
    let formatter = zoneFormatterCache.get(timeZone);

    if (!formatter) {
      formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
      });

      zoneFormatterCache.set(timeZone, formatter);
    }

    return formatter;
  }

  function getOffsetFormatter(timeZone) {
    let formatter = offsetFormatterCache.get(timeZone);

    if (!formatter) {
      formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        timeZoneName: 'longOffset'
      });

      offsetFormatterCache.set(timeZone, formatter);
    }

    return formatter;
  }

  function getPartsInZone(date, timeZone) {
    let parts;

    try {
      parts = getZoneFormatter(timeZone).formatToParts(date);
    } catch (e) {
      if (timeZone === 'UTC') throw e;
      return getPartsInZone(date, 'UTC');
    }

    const value = (type) => {
      const item = parts.find((part) => part.type === type);
      return parseInt(item ? item.value : '0', 10);
    };

    return {
      year: value('year'),
      month: value('month'),
      day: value('day'),
      hour: value('hour'),
      minute: value('minute'),
      second: value('second')
    };
  }

  // Offset (ms) of `timeZone` at the given UTC timestamp.
  function getOffsetMsAt(utcMs, timeZone) {
    const wholeSeconds = Math.floor(utcMs / 1000) * 1000;
    const parts = getPartsInZone(new Date(wholeSeconds), timeZone);

    return Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second
    ) - wholeSeconds;
  }

  // UTC timestamp of a wall clock time in `timeZone`. The offset is looked up
  // twice so that DST boundaries are handled correctly.
  function wallClockToUtcMs(parts, timeZone) {
    const guess = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour || 0,
      parts.minute || 0,
      parts.second || 0,
      parts.millisecond || 0
    );

    const offset = getOffsetMsAt(guess, timeZone);
    let result = guess - offset;

    const resultOffset = getOffsetMsAt(result, timeZone);

    if (resultOffset !== offset) {
      result = guess - resultOffset;
    }

    return result;
  }

  function getTimeZoneInfo(timeZone, date, isJa) {
    const target = date || new Date();

    try {
      const parts = new Intl.DateTimeFormat(isJa ? 'ja-JP' : 'en-US', {
        timeZone,
        timeZoneName: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
      }).formatToParts(target);

      const name = (parts.find((part) => part.type === 'timeZoneName') || {}).value || '';

      const hour = (parts.find((part) => part.type === 'hour') || {}).value || '00';
      const minute = (parts.find((part) => part.type === 'minute') || {}).value || '00';
      const second = (parts.find((part) => part.type === 'second') || {}).value || '00';

      const offsetPart = getOffsetFormatter(timeZone)
        .formatToParts(target)
        .find((part) => part.type === 'timeZoneName');

      const gmt = (offsetPart || {}).value || 'GMT+00:00';

      let offsetMinutes = 0;
      const match = gmt.match(/(?:GMT|UTC)([+-])(\d{1,2})(?::(\d{2}))?/);

      if (match) {
        const sign = match[1] === '-' ? -1 : 1;
        offsetMinutes = sign * (
          parseInt(match[2], 10) * 60 +
          parseInt(match[3] || '0', 10)
        );
      }

      return {
        timeZone,
        city: getCityDisplayName(timeZone, isJa),
        name,
        utcOffset: gmt.replace('GMT', 'UTC'),
        offsetMinutes,
        time: hour + ':' + minute + ':' + second
      };
    } catch (e) {
      return {
        timeZone,
        city: timeZone,
        name: timeZone,
        utcOffset: 'UTC',
        offsetMinutes: 0,
        time: '--:--:--'
      };
    }
  }

  function listTimeZones() {
    let zones = [];

    try {
      if (typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function') {
        zones = Intl.supportedValuesOf('timeZone');
      }
    } catch (e) {}

    if (zones.length === 0) {
      zones = [
        'UTC',
        'Asia/Tokyo',
        'America/New_York',
        'Europe/London',
        'Europe/Paris',
        'Asia/Singapore',
        'Australia/Sydney'
      ];
    }

    return zones;
  }

  function populateSelect(select, currentTimeZone, isJa, now) {
    select.replaceChildren();

    const utcGroup = document.createElement('optgroup');
    utcGroup.label = 'UTC';

    const utcOption = document.createElement('option');
    utcOption.value = 'UTC';
    utcOption.textContent = getCityDisplayName('UTC', isJa) + ' - ' + getTimeZoneInfo('UTC', now, isJa).utcOffset;
    utcOption.selected = currentTimeZone === 'UTC';
    utcGroup.appendChild(utcOption);

    const jstOption = document.createElement('option');
    jstOption.value = 'Asia/Tokyo';
    jstOption.textContent = isJa ? 'JST（日本時間）' : 'JST (Japan Standard Time)';
    jstOption.selected = currentTimeZone === 'Asia/Tokyo';
    utcGroup.appendChild(jstOption);

    select.appendChild(utcGroup);

    const zones = listTimeZones();
    const entries = zones
      .filter((zone) => zone !== 'UTC')
      .map((zone) => getTimeZoneInfo(zone, now, isJa));

    entries.sort((a, b) => {
      if (a.offsetMinutes !== b.offsetMinutes) return a.offsetMinutes - b.offsetMinutes;
      return a.city.localeCompare(b.city);
    });

    entries.forEach((info) => {
      const option = document.createElement('option');
      option.value = info.timeZone;
      option.textContent = info.city + ' - ' + info.utcOffset;
      if (info.timeZone === currentTimeZone) option.selected = true;
      select.appendChild(option);
    });

    if (currentTimeZone !== 'UTC' && currentTimeZone !== 'Asia/Tokyo' && !zones.includes(currentTimeZone)) {
      const option = document.createElement('option');
      option.value = currentTimeZone;
      option.textContent = currentTimeZone;
      option.selected = true;
      select.insertBefore(option, select.firstChild);
    }
  }

  function init(options) {
    const config = options || {};
    const isJa = config.language !== 'en';
    const locale = isJa ? 'ja-JP' : 'en-US';
    const labels = config.labels || {};
    const labelsText = {
      timeZone: labels.timeZone || (isJa ? 'タイムゾーンを選択' : 'Select Timezone'),
      language: labels.language || (isJa ? '言語を選択' : 'Select Language'),
      settings: labels.settings || (isJa ? '設定' : 'Settings'),
      selected: labels.selected || (isJa ? '選択中: ' : 'Selected: '),
      localTime: labels.localTime || (isJa ? '現地時間: ' : 'Local time: ')
    };

    const params = new URLSearchParams(global.location.search);
    const browserTimeZone = getBrowserTimeZone();
    const requested = params.get('tz');
    const timeZone = isSupportedTimeZone(requested) ? requested : browserTimeZone;
    const languageValue = isJa ? 'ja' : 'en';

    function reorderParams(url) {
      const tzValue = url.searchParams.get('tz');
      const langValue = url.searchParams.get('lang');
      const rest = [];

      url.searchParams.forEach((value, key) => {
        if (key !== 'tz' && key !== 'lang') rest.push([key, value]);
      });

      const ordered = new URLSearchParams();

      if (tzValue !== null) ordered.set('tz', tzValue);
      if (langValue !== null) ordered.set('lang', langValue);
      rest.forEach(([key, value]) => ordered.append(key, value));

      url.search = ordered.toString();
      return url;
    }

    // Drop defaults (`lang=ja`, browser timezone) and keep `tz` before `lang`.
    const pageUrl = new URL(global.location.href);
    const originalSearch = pageUrl.search;

    if (isJa) pageUrl.searchParams.delete('lang');
    if (timeZone === browserTimeZone) pageUrl.searchParams.delete('tz');

    reorderParams(pageUrl);

    if (pageUrl.search !== originalSearch) {
      global.history.replaceState(null, '', pageUrl.toString());
    }

    const select = document.getElementById('tzSelect');
    const headerButton = document.getElementById('tzHeaderBtn');
    const headerName = document.getElementById('tzHeaderName');
    const settingsButton = document.getElementById('tzSettingsBtn');
    const panel = document.getElementById('tzPanel');
    const detail = document.getElementById('tzCurrentDetail');
    const languageSelect = document.getElementById('langSelect');

    if (select) populateSelect(select, timeZone, isJa, new Date());

    const labelTimeZone = document.querySelector('[data-tz-label="timeZone"]');
    const labelLanguage = document.querySelector('[data-tz-label="language"]');
    if (labelTimeZone) labelTimeZone.textContent = labelsText.timeZone;
    if (labelLanguage) labelLanguage.textContent = labelsText.language;

    if (settingsButton) {
      settingsButton.title = labelsText.settings;
      settingsButton.setAttribute('aria-label', labelsText.settings);
    }

    if (panel) panel.setAttribute('aria-label', labelsText.settings);

    if (languageSelect) {
      languageSelect.value = languageValue;
      languageSelect.addEventListener('change', function () {
        const url = new URL(global.location.href);

        if (this.value === 'ja') {
          url.searchParams.delete('lang');
        } else {
          url.searchParams.set('lang', this.value);
        }

        reorderParams(url);
        global.location.href = url.toString();
      });
    }

    if (select) {
      select.addEventListener('change', function () {
        const url = new URL(global.location.href);

        if (this.value === browserTimeZone) {
          url.searchParams.delete('tz');
        } else {
          url.searchParams.set('tz', this.value);
        }

        reorderParams(url);
        global.location.href = url.toString();
      });
    }

    function setPanelOpen(open) {
      if (!panel) return;
      panel.hidden = !open;
      if (settingsButton) settingsButton.setAttribute('aria-expanded', String(open));
    }

    function togglePanel() {
      if (!panel) return;
      setPanelOpen(panel.hidden);
    }

    if (settingsButton) settingsButton.addEventListener('click', togglePanel);

    document.addEventListener('click', function (event) {
      if (!panel || panel.hidden) return;

      const target = event.target;

      if (
        !panel.contains(target) &&
        !(settingsButton && settingsButton.contains(target))
      ) {
        setPanelOpen(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && panel && !panel.hidden) {
        setPanelOpen(false);
        if (settingsButton) settingsButton.focus();
      }
    });

    function createFormatter(formatterOptions) {
      return new Intl.DateTimeFormat(locale, Object.assign({ timeZone }, formatterOptions));
    }

    function updateDisplay(date) {
      const target = date || new Date();
      const info = getTimeZoneInfo(timeZone, target, isJa);

      if (headerName) headerName.textContent = info.city + ' [' + info.utcOffset + ']';
      if (headerButton) headerButton.setAttribute('aria-label', info.city + ' ' + info.utcOffset);

      if (!detail) return;

      detail.replaceChildren();

      const title = document.createElement('b');
      title.textContent = labelsText.selected;

      const city = document.createElement('span');
      city.textContent = info.city;

      const name = document.createElement('div');
      name.textContent = info.name + ' (' + info.utcOffset + ')';

      const zone = document.createElement('div');
      zone.className = 'panel-zone-id';
      zone.textContent = timeZone;

      const time = document.createElement('div');
      time.textContent = labelsText.localTime + info.time;

      detail.append(title, city, name, zone, time);
    }

    return {
      timeZone,
      browserTimeZone,
      isSupportedTimeZone,
      createFormatter,
      getParts: (date) => getPartsInZone(date, timeZone),
      getOffsetMsAt: (utcMs) => getOffsetMsAt(utcMs, timeZone),
      wallClockToUtcMs: (parts) => wallClockToUtcMs(parts, timeZone),
      updateDisplay,
      getCityName: () => getCityDisplayName(timeZone, isJa)
    };
  }

  global.TimeZoneTools = {
    init,
    isSupportedTimeZone,
    getBrowserTimeZone,
    watchBrowserTimeZone,
    getCityDisplayName,
    getPartsInZone,
    getOffsetMsAt,
    wallClockToUtcMs,
    getTimeZoneInfo
  };
})(window);
