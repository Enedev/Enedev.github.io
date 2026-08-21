import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { COPY, type UiCopy } from './copy'
import { detectLocale, writeLocale, type Locale } from './locale'

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: UiCopy
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  useEffect(() => {
    writeLocale(locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: COPY[locale],
    }),
    [locale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
