import type { ReactNode } from 'react'
import { unlockAudio } from '../game/audio'

type ArcadeShellProps = {
  children: ReactNode
  smashed: number
  total: number
}

function padScore(value: number) {
  return String(value).padStart(5, '0')
}

export function ArcadeShell({ children, smashed, total }: ArcadeShellProps) {
  const score = smashed * 1000
  const hiScore = total * 1000

  return (
    <main
      className="arcade-stage flex min-h-svh items-center justify-center p-2 sm:p-6"
      onPointerDown={() => unlockAudio()}
    >
      <section className="arcade-bezel relative flex h-[min(96svh,760px)] w-full max-w-5xl flex-col overflow-hidden bg-arcade-panel">
        <header className="flex items-center justify-between gap-3 border-b-4 border-arcade-magenta bg-arcade-night px-3 py-3 sm:px-5">
          <p className="text-[8px] text-arcade-lime sm:text-[10px]">1UP {padScore(score)}</p>
          <p className="arcade-glow text-[8px] text-arcade-gold sm:text-[10px]">
            HI-SCORE {padScore(hiScore)}
          </p>
          <p className="text-[8px] text-arcade-cyan sm:text-[10px]">
            {smashed}/{total}
          </p>
        </header>

        <div className="arcade-screen relative min-h-0 flex-1">{children}</div>

        <footer className="flex items-center justify-between gap-3 border-t-4 border-arcade-cyan bg-arcade-night px-3 py-3 sm:px-5">
          <p className="text-[8px] text-arcade-muted sm:text-[10px]">WASD / ARROWS</p>
          <p className="arcade-blink text-[8px] text-arcade-gold sm:text-[10px]">
            SPACE / J / A
          </p>
          <p className="text-[8px] text-arcade-magenta sm:text-[10px]">
            CREDIT {String(smashed).padStart(2, '0')}
          </p>
        </footer>
      </section>
    </main>
  )
}
