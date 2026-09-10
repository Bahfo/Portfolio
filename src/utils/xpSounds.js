// XP sounds via Web Audio API - no external files needed, feels like Windows XP
let ctx = null
function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq, duration, type='sine', volume=0.15, when=0) {
  const c = getCtx()
  const t = c.currentTime + when
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  gain.gain.setValueAtTime(volume, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + duration + 0.05)
}

export function playStartup() {
  // classic XP startup chord: G3 - E4 - G4 shimmer
  tone(196, 0.35, 'sine', 0.18, 0)
  tone(247, 0.35, 'sine', 0.15, 0.08)
  tone(392, 0.6, 'sine', 0.12, 0.16)
  tone(493, 0.5, 'triangle', 0.08, 0.22)
}

export function playOpen() {
  tone(800, 0.09, 'sine', 0.18, 0)
  tone(1200, 0.08, 'sine', 0.12, 0.06)
}

export function playClose() {
  tone(600, 0.08, 'sine', 0.14, 0)
  tone(350, 0.12, 'sine', 0.12, 0.07)
}

export function playClick() {
  tone(1000, 0.04, 'square', 0.04, 0)
}

export function playMinimize() {
  tone(500, 0.07, 'sine', 0.12, 0)
  tone(700, 0.07, 'sine', 0.10, 0.06)
}

export function playMaximize() {
  tone(700, 0.07, 'sine', 0.10, 0)
  tone(500, 0.07, 'sine', 0.12, 0.06)
}

export function playError() {
  tone(300, 0.25, 'square', 0.1, 0)
  tone(250, 0.25, 'square', 0.1, 0.12)
}

export function playNotify() {
  tone(880, 0.15, 'sine', 0.15, 0)
  tone(1320, 0.15, 'sine', 0.12, 0.1)
}
