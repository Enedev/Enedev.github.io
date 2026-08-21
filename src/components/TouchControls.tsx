import { useRef } from 'react'
import { unlockAudio } from '../game/audio'
import { useLanguage } from '../i18n/LanguageContext'
import type { Axis, Direction } from '../game/types'

type TouchControlsProps = {
  axis: Axis
  sprinting: boolean
  onAxis: (axis: Axis) => void
  onSprint: (pressed: boolean) => void
}

const DIRS: { dir: Direction; label: string; className: string }[] = [
  { dir: 'up', label: '▲', className: 'col-start-2 row-start-1' },
  { dir: 'left', label: '◀', className: 'col-start-1 row-start-2' },
  { dir: 'right', label: '▶', className: 'col-start-3 row-start-2' },
  { dir: 'down', label: '▼', className: 'col-start-2 row-start-3' },
]

export function TouchControls({ axis, sprinting, onAxis, onSprint }: TouchControlsProps) {
  const { t } = useLanguage()
  const heldRef = useRef(new Set<Direction>())

  const syncAxis = () => {
    const held = heldRef.current
    let x = 0
    let y = 0
    if (held.has('left')) x -= 1
    if (held.has('right')) x += 1
    if (held.has('up')) y -= 1
    if (held.has('down')) y += 1
    onAxis({ x, y })
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-end justify-between gap-3 p-3 lg:hidden">
      <div className="pointer-events-auto grid grid-cols-3 grid-rows-3 gap-1">
        {DIRS.map((item) => {
          const active =
            (item.dir === 'left' && axis.x < 0) ||
            (item.dir === 'right' && axis.x > 0) ||
            (item.dir === 'up' && axis.y < 0) ||
            (item.dir === 'down' && axis.y > 0)

          return (
            <button
              key={item.dir}
              type="button"
              aria-label={item.dir}
              className={`touch-none ${item.className} h-12 w-12 border-2 border-arcade-cyan bg-arcade-night/90 text-[12px] text-arcade-cyan sm:h-14 sm:w-14 ${active ? 'bg-arcade-cyan text-arcade-void' : ''}`}
              onPointerDown={(event) => {
                event.preventDefault()
                unlockAudio()
                event.currentTarget.setPointerCapture(event.pointerId)
                heldRef.current.add(item.dir)
                syncAxis()
              }}
              onPointerUp={() => {
                heldRef.current.delete(item.dir)
                syncAxis()
              }}
              onPointerCancel={() => {
                heldRef.current.delete(item.dir)
                syncAxis()
              }}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        aria-label={t.run}
        className={`pointer-events-auto mb-2 h-16 w-16 touch-none rounded-full border-4 text-[10px] sm:h-20 sm:w-20 ${
          sprinting
            ? 'border-arcade-gold bg-arcade-gold text-arcade-void'
            : 'border-arcade-magenta bg-arcade-night/90 text-arcade-magenta'
        }`}
        onPointerDown={(event) => {
          event.preventDefault()
          unlockAudio()
          event.currentTarget.setPointerCapture(event.pointerId)
          onSprint(true)
        }}
        onPointerUp={() => onSprint(false)}
        onPointerCancel={() => onSprint(false)}
      >
        {t.run}
      </button>
    </div>
  )
}
