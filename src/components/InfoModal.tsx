import { useEffect } from 'react'
import { PORTFOLIO } from '../data/portfolio'
import { useLanguage } from '../i18n/LanguageContext'
import type { ContentCrystalId } from '../game/types'

type InfoModalProps = {
  crystalId: ContentCrystalId | null
  smashed: number
  total: number
  onClose: () => void
}

export function InfoModal({ crystalId, smashed, total, onClose }: InfoModalProps) {
  const { locale, t } = useLanguage()

  useEffect(() => {
    if (!crystalId) return

    const onKey = (event: KeyboardEvent) => {
      if (event.code === 'Escape' || event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [crystalId, onClose])

  if (!crystalId) return null

  const section = PORTFOLIO[locale][crystalId]

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-arcade-void/80 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      onClick={onClose}
    >
      <article
        className="arcade-bezel arcade-scroll max-h-[min(78svh,640px)] w-full max-w-2xl overflow-y-auto bg-arcade-night p-4 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-[8px] text-arcade-magenta sm:text-[10px]">{section.kicker}</p>
        <h2
          id="info-modal-title"
          className="arcade-glow mt-3 text-[14px] leading-relaxed text-arcade-gold sm:text-[18px]"
        >
          {section.title}
        </h2>
        <p className="mt-4 text-[8px] leading-loose text-arcade-muted sm:text-[10px]">
          {section.body}
        </p>

        {section.skills ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {section.skills.map((skill) => (
              <li
                key={skill}
                className="border-2 border-arcade-cyan bg-arcade-panel px-2 py-1 text-[8px] text-arcade-cyan"
              >
                {skill}
              </li>
            ))}
          </ul>
        ) : null}

        {section.roles ? (
          <ul className="mt-5 space-y-4">
            {section.roles.map((role) => (
              <li key={`${role.title}-${role.period}`} className="border-l-4 border-arcade-gold pl-3">
                <p className="text-[8px] text-arcade-gold sm:text-[10px]">{role.title}</p>
                <p className="mt-1 text-[8px] text-arcade-cyan">
                  {role.org} · {role.period}
                </p>
                <ul className="mt-2 space-y-2">
                  {role.points.map((point) => (
                    <li key={point} className="text-[8px] leading-loose text-arcade-muted">
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : null}

        {section.projects ? (
          <ul className="mt-5 space-y-3">
            {section.projects.map((project) => (
              <li key={project.name} className="border-2 border-arcade-bezel bg-arcade-panel p-3">
                {project.href ? (
                  <a
                    className="text-[8px] text-arcade-lime underline decoration-2 underline-offset-4 sm:text-[10px]"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.name}
                  </a>
                ) : (
                  <p className="text-[8px] text-arcade-lime sm:text-[10px]">{project.name}</p>
                )}
                <p className="mt-2 text-[8px] leading-loose text-arcade-muted">{project.blurb}</p>
                <p className="mt-2 text-[8px] text-arcade-cyan">{project.tags.join(' / ')}</p>
              </li>
            ))}
          </ul>
        ) : null}

        {section.links ? (
          <ul className="mt-5 space-y-2">
            {section.links.map((link) => (
              <li key={link.href}>
                <a
                  className="text-[8px] text-arcade-cyan underline decoration-2 underline-offset-4 sm:text-[10px]"
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-[8px] text-arcade-muted">
            {smashed}/{total} {t.crystals}
          </p>
          <button
            type="button"
            className="border-2 border-arcade-gold bg-arcade-panel px-3 py-2 text-[8px] text-arcade-gold sm:text-[10px]"
            onClick={onClose}
          >
            {t.close}
          </button>
        </div>
      </article>
    </div>
  )
}
