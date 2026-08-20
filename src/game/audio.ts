let context: AudioContext | null = null
let stepCooldown = 0

function audio() {
  context ??= new AudioContext()
  return context
}

export function unlockAudio() {
  const ctx = audio()
  if (ctx.state === 'suspended') void ctx.resume()
}

function tone(
  frequency: number,
  duration: number,
  type: OscillatorType,
  gainValue: number,
  slideTo?: number,
) {
  const ctx = audio()
  const now = ctx.currentTime
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, now)
  if (slideTo !== undefined) {
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(slideTo, 1), now + duration)
  }
  gain.gain.setValueAtTime(gainValue, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration)
  oscillator.connect(gain)
  gain.connect(ctx.destination)
  oscillator.start(now)
  oscillator.stop(now + duration)
}

function noise(duration: number, gainValue: number) {
  const ctx = audio()
  const now = ctx.currentTime
  const length = Math.floor(ctx.sampleRate * duration)
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1
  const source = ctx.createBufferSource()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1800
  source.buffer = buffer
  gain.gain.setValueAtTime(gainValue, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration)
  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start(now)
}

export function playStep() {
  const now = performance.now()
  if (now - stepCooldown < 140) return
  stepCooldown = now
  tone(180, 0.045, 'square', 0.028)
}

export function playHit() {
  noise(0.12, 0.08)
  tone(520, 0.16, 'square', 0.06, 140)
}

export function playModal() {
  tone(523.25, 0.09, 'square', 0.05)
  window.setTimeout(() => tone(659.25, 0.09, 'square', 0.045), 70)
  window.setTimeout(() => tone(783.99, 0.14, 'square', 0.04), 140)
}
