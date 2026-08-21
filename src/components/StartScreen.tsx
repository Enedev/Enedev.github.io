import { LanguageButtons } from './LanguageButtons'
import { useLanguage } from '../i18n/LanguageContext'

type StartScreenProps = {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  const { t } = useLanguage()

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-arcade-void/70 px-4 text-center">
      <p className="text-[8px] uppercase tracking-[0.35em] text-arcade-magenta sm:text-[10px]">
        {t.boot}
      </p>
      <h1 className="arcade-glow mt-5 text-[16px] leading-relaxed text-arcade-cyan sm:text-[22px]">
        {t.title}
      </h1>
      <p className="mt-5 max-w-xl text-[8px] leading-loose text-arcade-muted sm:text-[10px]">
        {t.startBlurb}
      </p>

      <p className="mt-8 text-[8px] uppercase tracking-[0.25em] text-arcade-cyan sm:text-[10px]">
        {t.pickLanguage}
      </p>
      <div className="mt-4">
        <LanguageButtons />
      </div>

      <p className="arcade-blink mt-8 text-[10px] text-arcade-gold sm:text-[12px]">
        {t.pressStart}
      </p>
      <p className="mt-4 text-[8px] leading-loose text-arcade-muted sm:text-[10px]">
        {t.startKeys}
      </p>
      <button
        type="button"
        className="pointer-events-auto mt-6 border-4 border-arcade-gold bg-arcade-night px-6 py-3 text-[10px] text-arcade-gold sm:text-[12px]"
        onClick={onStart}
      >
        {t.start}
      </button>
    </div>
  )
}
