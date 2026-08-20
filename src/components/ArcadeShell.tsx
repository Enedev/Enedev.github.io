import type { ReactNode } from 'react'

type ArcadeShellProps = {
  children: ReactNode
}

export function ArcadeShell({ children }: ArcadeShellProps) {
  return (
    <main className="arcade-stage flex min-h-svh items-center justify-center p-3 sm:p-6">
      <section className="arcade-bezel relative flex h-[min(92svh,760px)] w-full max-w-5xl flex-col overflow-hidden bg-arcade-panel">
        <header className="flex items-center justify-between gap-3 border-b-4 border-arcade-magenta bg-arcade-night px-3 py-3 sm:px-5">
          <p className="text-[8px] text-arcade-lime sm:text-[10px]">1UP 00000</p>
          <p className="arcade-glow text-[8px] text-arcade-gold sm:text-[10px]">
            HI-SCORE 00000
          </p>
          <p className="text-[8px] text-arcade-cyan sm:text-[10px]">P1</p>
        </header>

        <div className="arcade-screen relative min-h-0 flex-1">{children}</div>

        <footer className="flex items-center justify-between gap-3 border-t-4 border-arcade-cyan bg-arcade-night px-3 py-3 sm:px-5">
          <p className="text-[8px] text-arcade-muted sm:text-[10px]">
            WASD / ARROWS
          </p>
          <p className="arcade-blink text-[8px] text-arcade-gold sm:text-[10px]">
            INSERT COIN
          </p>
          <p className="text-[8px] text-arcade-magenta sm:text-[10px]">CREDIT 00</p>
        </footer>
      </section>
    </main>
  )
}
