export type Locale = 'es' | 'en'

const STORAGE_KEY = 'pixel-portfolio-locale'

export function isLocale(value: string | null): value is Locale {
  return value === 'es' || value === 'en'
}

export function readLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isLocale(stored) ? stored : null
  } catch {
    return null
  }
}

export function writeLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // ignore quota / private mode
  }
}

export function detectLocale(): Locale {
  const stored = readLocale()
  if (stored) return stored
  if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('es')) {
    return 'es'
  }
  return 'en'
}
