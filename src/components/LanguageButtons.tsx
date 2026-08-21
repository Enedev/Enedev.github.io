import { useLanguage } from '../i18n/LanguageContext'
import type { Locale } from '../i18n/locale'

const OPTIONS: { id: Locale; labelKey: 'spanish' | 'english' }[] = [
  { id: 'es', labelKey: 'spanish' },
  { id: 'en', labelKey: 'english' },
]

export function LanguageButtons() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {OPTIONS.map((option) => {
        const selected = locale === option.id
        return (
          <button
            key={option.id}
            type="button"
            className={`border-4 px-4 py-3 text-[8px] sm:text-[10px] ${
              selected
                ? 'border-arcade-gold bg-arcade-gold text-arcade-void'
                : 'border-arcade-cyan bg-arcade-night text-arcade-cyan'
            }`}
            onClick={(event) => {
              event.stopPropagation()
              setLocale(option.id)
            }}
          >
            {t[option.labelKey]}
          </button>
        )
      })}
    </div>
  )
}
