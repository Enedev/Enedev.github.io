import { LanguageButtons } from './LanguageButtons'
import { useLanguage } from '../i18n/LanguageContext'

type PauseMenuProps = {
  onResume: () => void
  onReset: () => void
}

export function PauseMenu({ onResume, onReset }: PauseMenuProps) {
  const { t } = useLanguage()

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-arcade-void/80 px-4 text-center">
      <p className="arcade-blink text-[12px] text-arcade-gold sm:text-[16px]">{t.pause}</p>
      <p className="mt-4 text-[8px] text-arcade-muted sm:text-[10px]">{t.pauseHint}</p>

      <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
        <button
          type="button"
          className="border-4 border-arcade-gold bg-arcade-night px-6 py-3 text-[10px] text-arcade-gold sm:text-[12px]"
          onClick={onResume}
        >
          {t.start}
        </button>
        <button
          type="button"
          className="border-4 border-arcade-magenta bg-arcade-night px-6 py-3 text-[10px] text-arcade-magenta sm:text-[12px]"
          onClick={onReset}
        >
          {t.reset}
        </button>
      </div>

      <p className="mt-8 text-[8px] uppercase tracking-[0.25em] text-arcade-cyan sm:text-[10px]">
        {t.pickLanguage}
      </p>
      <div className="mt-4">
        <LanguageButtons />
      </div>
    </div>
  )
}
