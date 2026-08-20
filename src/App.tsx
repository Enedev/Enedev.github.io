import { ArcadeShell } from './components/ArcadeShell'
import { GameCanvas } from './components/GameCanvas'

export default function App() {
  return (
    <ArcadeShell>
      <GameCanvas />
      <div className="arcade-vignette absolute inset-0 z-10" />
      <div className="arcade-scanlines absolute inset-0 z-20" />
      <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[8px] uppercase tracking-[0.35em] text-arcade-magenta sm:text-[10px]">
          Boot sequence
        </p>
        <h1 className="arcade-glow mt-5 text-[16px] leading-relaxed text-arcade-cyan sm:text-[22px]">
          Pixel Portfolio
        </h1>
        <p className="mt-5 max-w-xl text-[8px] leading-loose text-arcade-muted sm:text-[10px]">
          Smash crystals. Unlock about, skills, and projects.
        </p>
        <p className="arcade-blink mt-8 text-[10px] text-arcade-gold sm:text-[12px]">
          PRESS START
        </p>
      </div>
    </ArcadeShell>
  )
}
