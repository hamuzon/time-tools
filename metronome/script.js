const translations = {
  ja: {
    title: 'メトロノーム',
    tempo: 'テンポ',
    bpm: 'BPM',
    timeSignature: '拍子',
    custom: 'カスタム',
    customCombination: '組み合わせ',
    start: 'スタート',
    stop: 'ストップ',
    reset: 'リセット',
    audioUnsupported: 'このブラウザーでは音声を再生できません。',
    audioError: '音声を開始できませんでした。もう一度お試しください。'
  },
  en: {
    title: 'Metronome',
    tempo: 'Tempo',
    bpm: 'BPM',
    timeSignature: 'Time signature',
    custom: 'Custom',
    customCombination: 'Grouping',
    start: 'Start',
    stop: 'Stop',
    reset: 'Reset',
    audioUnsupported: 'Audio playback is not supported in this browser.',
    audioError: 'Could not start audio. Please try again.'
  }
};

const STORAGE_KEY = 'time-tools-metronome-settings-v1';
const MAX_CUSTOM_BEATS = 64;
const meters = {
  '2/4': { beats: 2, denominator: 4, accents: [0] },
  '3/4': { beats: 3, denominator: 4, accents: [0] },
  '4/4': { beats: 4, denominator: 4, accents: [0] },
  '5/4': { beats: 5, denominator: 4, accents: [0] },
  '6/4': { beats: 6, denominator: 4, accents: [0] },
  '7/4': { beats: 7, denominator: 4, accents: [0] },
  '3/8': { beats: 3, denominator: 8, accents: [0] },
  '5/8': { beats: 5, denominator: 8, accents: [0, 2] },
  '6/8': { beats: 6, denominator: 8, accents: [0, 3] },
  '7/8': { beats: 7, denominator: 8, accents: [0, 2, 4] },
  '9/8': { beats: 9, denominator: 8, accents: [0, 3, 6] },
  '12/8': { beats: 12, denominator: 8, accents: [0, 3, 6, 9] }
};
const metronomeLanguage = new URL(window.location.href).searchParams.get('lang') === 'en' ? 'en' : 'ja';
const messages = translations[metronomeLanguage];
const bpmSlider = document.getElementById('bpm-slider');
const bpmValue = document.getElementById('bpm-value');
const beatsPerBar = document.getElementById('beats-per-bar');
const customMeterField = document.getElementById('custom-meter-field');
const customMeterInput = document.getElementById('custom-meter');
const beatIndicators = document.getElementById('beat-indicators');
const beatCount = document.getElementById('beat-count');
const toggleButton = document.getElementById('metronome-toggle');
const resetButton = document.getElementById('metronome-reset');
const status = document.getElementById('metronome-status');

let audioContext = null;
let schedulerId = null;
let isRunning = false;
let isStarting = false;
let nextBeatTime = 0;
let currentBeat = 0;
let scheduleVersion = 0;
let startRequestId = 0;
const visualTimeouts = new Set();
const activeOscillators = new Set();
let customMeter = null;
let lastMeter = beatsPerBar.value;

function getMeter() {
  if (beatsPerBar.value === 'custom') return customMeter ?? meters['4/4'];
  return meters[beatsPerBar.value];
}

function updateSettingsParameters() {
  const url = new URL(window.location.href);

  ['bpm', 'meter', 'custom'].forEach((key) => url.searchParams.delete(key));

  const bpm = Number(bpmSlider.value);
  if (bpm !== 120) {
    url.searchParams.set('bpm', String(bpm));
  }

  if (beatsPerBar.value !== '4/4') {
    url.searchParams.set('meter', beatsPerBar.value);
  }

  if (beatsPerBar.value === 'custom' && customMeter) {
    url.searchParams.set('custom', groupingFromMeter(customMeter));
  }

  const lang = url.searchParams.get('lang');
  url.searchParams.delete('lang');
  if (lang === 'en') {
    url.searchParams.append('lang', 'en');
  }

  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

function applySettingsParameters() {
  const url = new URL(window.location.href);
  const bpmEntries = [...url.searchParams].filter(([key]) => key.toLowerCase() === 'bpm');
  bpmEntries.forEach(([key]) => url.searchParams.delete(key));

  if (bpmEntries.length > 0) {
    const bpm = Number(bpmEntries[0][1]);
    if (Number.isInteger(bpm) && bpm >= 30 && bpm <= 240 && bpm !== 120) {
      bpmSlider.value = String(bpm);
    } else {
      bpmSlider.value = '120';
    }
  }

  const meterEntries = [...url.searchParams].filter(([key]) => key.toLowerCase() === 'meter');
  meterEntries.forEach(([key]) => url.searchParams.delete(key));
  const meterValue = meterEntries.length > 0 ? meterEntries[0][1] : null;

  if (meterValue === 'custom') {
    const customEntries = [...url.searchParams].filter(([key]) => key.toLowerCase() === 'custom');
    customEntries.forEach(([key]) => url.searchParams.delete(key));
    const customValue = customEntries.length > 0 ? customEntries[0][1] : null;
    const parsed = parseCustomMeter(customValue);

    if (parsed) {
      beatsPerBar.value = 'custom';
      customMeterInput.value = customValue.trim();
      customMeter = parsed;
      customMeterField.hidden = false;
    } else {
      beatsPerBar.value = '4/4';
      customMeterField.hidden = true;
    }
  } else if (meterValue && Object.hasOwn(meters, meterValue)) {
    beatsPerBar.value = meterValue;
  } else {
    beatsPerBar.value = '4/4';
  }

  const lang = url.searchParams.get('lang');
  url.searchParams.delete('lang');
  if (lang === 'en') {
    url.searchParams.append('lang', 'en');
  }

  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  updateSettingsParameters();
}

function parseCustomMeter(value) {
  if (typeof value !== 'string') return null;

  const parts = value
    .trim()
    .split(/[+,\s]+/)
    .filter(Boolean)
    .map((part) => Number(part));

  if (parts.length === 0 ||
      parts.some((part) => !Number.isInteger(part) || part < 1) ||
      parts.reduce((total, part) => total + part, 0) > MAX_CUSTOM_BEATS) {
    return null;
  }

  const accents = [];
  let beat = 0;

  parts.forEach((part) => {
    accents.push(beat);
    beat += part;
  });

  return { beats: beat, denominator: 4, accents };
}

function groupingFromMeter(meter) {
  const parts = [];
  let start = 0;

  meter.accents.slice(1).forEach((accent) => {
    parts.push(accent - start);
    start = accent;
  });

  parts.push(meter.beats - start);
  return parts.join('+');
}

document.documentElement.lang = metronomeLanguage;

document.querySelectorAll('[data-i18n]').forEach((element) => {
  const translation = messages[element.dataset.i18n];
  if (translation) element.textContent = translation;
});

document.title = `${messages.title} | Time Tools`;

function renderBeatIndicators() {
  const meter = getMeter();
  beatIndicators.replaceChildren();

  for (let index = 0; index < meter.beats; index += 1) {
    const indicator = document.createElement('span');
    indicator.className = 'beat-indicator';
    if (meter.accents.includes(index)) {
      indicator.classList.add(index === 0 ? 'is-downbeat' : 'is-accent');
    }
    beatIndicators.append(indicator);
  }

  beatCount.textContent = `1 / ${meter.beats}`;
}

function saveSettings() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      bpm: Number(bpmSlider.value),
      meter: beatsPerBar.value,
      customMeter: customMeterInput.value
    }));
  } catch (error) {
    console.warn('Could not save metronome settings.', error);
  }
}

function restoreSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const settings = JSON.parse(saved);
    const isCustomMeter = settings.meter === 'custom';

    if (!Number.isInteger(settings.bpm) || settings.bpm < 30 || settings.bpm > 240 ||
        (!isCustomMeter && !Object.hasOwn(meters, settings.meter))) {
      throw new Error('Saved metronome settings are invalid.');
    }

    bpmSlider.value = String(settings.bpm);

    if (typeof settings.customMeter === 'string') {
      customMeterInput.value = settings.customMeter;
      customMeter = parseCustomMeter(settings.customMeter);
    }

    if (isCustomMeter && customMeter) {
      beatsPerBar.value = 'custom';
      customMeterField.hidden = false;
    } else {
      beatsPerBar.value = isCustomMeter ? '4/4' : settings.meter;
      customMeterField.hidden = true;
    }
  } catch (error) {
    console.warn('Could not restore metronome settings.', error);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (removeError) {
      console.warn('Could not clear invalid metronome settings.', removeError);
    }
  }
}

function clearVisualTimeouts() {
  visualTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
  visualTimeouts.clear();
}

function showBeat(beat, version) {
  if (!isRunning || version !== scheduleVersion) return;

  [...beatIndicators.children].forEach((indicator, index) => {
    indicator.classList.toggle('is-active', index === beat);
  });
  beatCount.textContent = `${beat + 1} / ${getMeter().beats}`;
}

function playClick(time, isDownbeat, isAccent) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const volume = isDownbeat ? 0.8 : isAccent ? 0.68 : 0.55;

  oscillator.frequency.value = isDownbeat ? 1320 : isAccent ? 1100 : 880;
  gain.gain.setValueAtTime(volume, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  activeOscillators.add(oscillator);
  oscillator.addEventListener('ended', () => activeOscillators.delete(oscillator), { once: true });
  oscillator.start(time);
  oscillator.stop(time + 0.04);
}

function scheduleBeat(time, beat, version) {
  const isDownbeat = beat === 0;
  playClick(time, isDownbeat, getMeter().accents.includes(beat));

  const delay = Math.max(0, (time - audioContext.currentTime) * 1000);
  const timeoutId = window.setTimeout(() => {
    visualTimeouts.delete(timeoutId);
    showBeat(beat, version);
  }, delay);
  visualTimeouts.add(timeoutId);
}

function scheduler() {
  const now = audioContext.currentTime;
  if (nextBeatTime < now - 0.1) {
    nextBeatTime = now + 0.05;
    currentBeat = 0;
  }

  while (nextBeatTime < now + 0.1) {
    scheduleBeat(nextBeatTime, currentBeat, scheduleVersion);
    nextBeatTime += (60 / Number(bpmSlider.value)) * (4 / getMeter().denominator);
    currentBeat = (currentBeat + 1) % getMeter().beats;
  }
}

function startScheduler() {
  window.clearInterval(schedulerId);
  schedulerId = null;
  scheduleVersion += 1;
  clearVisualTimeouts();
  nextBeatTime = audioContext.currentTime + 0.05;
  currentBeat = 0;
  scheduler();
  schedulerId = window.setInterval(scheduler, 25);
}

function stopMetronome() {
  isStarting = false;
  startRequestId += 1;
  isRunning = false;
  scheduleVersion += 1;
  window.clearInterval(schedulerId);
  schedulerId = null;
  clearVisualTimeouts();
  activeOscillators.forEach((oscillator) => oscillator.stop());
  activeOscillators.clear();
  toggleButton.textContent = messages.start;
  toggleButton.classList.remove('is-running');
  toggleButton.setAttribute('aria-pressed', 'false');
  beatIndicators.querySelectorAll('.is-active').forEach((indicator) => {
    indicator.classList.remove('is-active');
  });
  beatCount.textContent = `1 / ${getMeter().beats}`;
}

async function startMetronome() {
  if (isRunning || isStarting) return;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    status.textContent = messages.audioUnsupported;
    return;
  }

  isStarting = true;
  const requestId = ++startRequestId;

  try {
    audioContext ??= new AudioContext();
    await audioContext.resume();
    if (requestId !== startRequestId) return;

    isStarting = false;
    status.textContent = '';
    isRunning = true;
    toggleButton.textContent = messages.stop;
    toggleButton.classList.add('is-running');
    toggleButton.setAttribute('aria-pressed', 'true');
    startScheduler();
  } catch (error) {
    if (requestId !== startRequestId) return;

    isStarting = false;
    console.error('Could not start metronome audio.', error);
    status.textContent = messages.audioError;
  }
}

function toggleMetronome() {
  if (isRunning || isStarting) stopMetronome();
  else startMetronome();
}

function updateSettings() {
  bpmValue.value = bpmSlider.value;
  bpmValue.textContent = bpmSlider.value;
  renderBeatIndicators();
  saveSettings();
  updateSettingsParameters();
  if (isRunning) startScheduler();
}

function updateCustomMeterValidity(isValid) {
  customMeterInput.classList.toggle('is-invalid', !isValid);

  if (isValid) customMeterInput.removeAttribute('aria-invalid');
  else customMeterInput.setAttribute('aria-invalid', 'true');
}

function updateCustomMeter() {
  const parsed = parseCustomMeter(customMeterInput.value);

  if (!parsed) {
    updateCustomMeterValidity(false);
    return;
  }

  updateCustomMeterValidity(true);
  customMeter = parsed;
  updateSettings();
}

function handleMeterChange() {
  const isCustom = beatsPerBar.value === 'custom';

  customMeterField.hidden = !isCustom;

  if (isCustom) {
    const parsed = parseCustomMeter(customMeterInput.value);

    if (parsed) {
      customMeter = parsed;
    } else {
      const sourceMeter = meters[lastMeter] ?? meters['4/4'];
      customMeterInput.value = groupingFromMeter(sourceMeter);
      customMeter = parseCustomMeter(customMeterInput.value);
    }

    updateCustomMeterValidity(true);
    customMeterInput.focus({ preventScroll: true });
    customMeterInput.select();
  }

  lastMeter = beatsPerBar.value;
  updateSettings();
}

function resetSettings() {
  if (isRunning || isStarting) stopMetronome();
  bpmSlider.value = '120';
  beatsPerBar.value = '4/4';
  customMeter = null;
  customMeterInput.value = '';
  updateCustomMeterValidity(true);
  customMeterField.hidden = true;
  lastMeter = '4/4';
  updateSettings();
}

restoreSettings();
lastMeter = beatsPerBar.value;
applySettingsParameters();
bpmValue.value = bpmSlider.value;
bpmValue.textContent = bpmSlider.value;
bpmSlider.addEventListener('input', updateSettings);
beatsPerBar.addEventListener('change', handleMeterChange);
customMeterInput.addEventListener('input', updateCustomMeter);
toggleButton.addEventListener('click', toggleMetronome);
resetButton.addEventListener('click', resetSettings);
window.addEventListener('pagehide', () => {
  if (isRunning) stopMetronome();
  if (audioContext && audioContext.state !== 'closed') audioContext.close();
});

renderBeatIndicators();
