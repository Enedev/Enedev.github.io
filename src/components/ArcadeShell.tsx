import type { ReactNode } from 'react'
import { unlockAudio } from '../game/audio'
import { useLanguage } from '../i18n/LanguageContext'

type ArcadeShellProps = {
  children: ReactNode
  smashed: number
  total: number
  started: boolean
  paused?: boolean
}

function padScore(value: number) {
  return String(value).padStart(5, '0')
}

export function ArcadeShell({
  children,
  smashed,
  total,
  started,
  paused = false,
}: ArcadeShellProps) {
  const { t } = useLanguage()
  const score = smashed * 1000
  const hiScore = total * 1000

  const footerLeft = !started ? t.ready : paused ? t.pausedHint : t.moveHint
  const footerMid = !started ? t.pressStart : paused ? t.start : t.sprintHint

  return (
    <main
      className="arcade-stage flex min-h-svh items-stretch justify-center p-0 sm:items-center sm:p-4 lg:p-6"
      onPointerDown={() => unlockAudio()}
    >
      <section className="arcade-bezel relative flex h-svh w-full max-w-5xl flex-col overflow-hidden bg-arcade-panel sm:h-[min(96svh,760px)]">
        <header className="flex items-center justify-between gap-2 border-b-4 border-arcade-magenta bg-arcade-night px-2 py-2 sm:gap-3 sm:px-5 sm:py-3">
          <p className="text-[7px] text-arcade-lime sm:text-[10px]">1UP {padScore(score)}</p>
          <p className="arcade-glow text-[7px] text-arcade-gold sm:text-[10px]">
            HI-SCORE {padScore(hiScore)}
          </p>
          <p className="text-[7px] text-arcade-cyan sm:text-[10px]">
            {smashed}/{total}
          </p>
        </header>

        <div className="arcade-screen relative min-h-0 flex-1">{children}</div>

        <footer className="flex items-center justify-between gap-2 border-t-4 border-arcade-cyan bg-arcade-night px-2 py-2 sm:gap-3 sm:px-5 sm:py-3">
          <p className="text-[7px] text-arcade-muted sm:text-[10px]">{footerLeft}</p>
          <p className="arcade-blink text-[7px] text-arcade-gold sm:text-[10px]">{footerMid}</p>
          <p className="text-[7px] text-arcade-magenta sm:text-[10px]">
            {t.credit} {String(smashed).padStart(2, '0')}
          </p>
        </footer>
      </section>
    </main>
  )
}
