import { useRef } from 'react'
import { unlockAudio } from '../game/audio'
import type { Axis, Direction } from '../game/types'

type TouchControlsProps = {
  axis: Axis
  attacking: boolean
  onAxis: (axis: Axis) => void
  onAttack: (pressed: boolean) => void
}

const DIRS: { dir: Direction; label: string; className: string }[] = [
  { dir: 'up', label: '▲', className: 'col-start-2 row-start-1' },
  { dir: 'left', label: '◀', className: 'col-start-1 row-start-2' },
  { dir: 'right', label: '▶', className: 'col-start-3 row-start-2' },
  { dir: 'down', label: '▼', className: 'col-start-2 row-start-3' },
]

export function TouchControls({ axis, attacking, onAxis, onAttack }: TouchControlsProps) {
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
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-end justify-between p-3 md:hidden">
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
              aria-label={`Move ${item.dir}`}
              className={`touch-none ${item.className} h-12 w-12 border-2 border-arcade-cyan bg-arcade-night/90 text-[12px] text-arcade-cyan ${active ? 'bg-arcade-cyan text-arcade-void' : ''}`}
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
        aria-label="Smash crystal"
        className={`pointer-events-auto mb-2 h-16 w-16 touch-none rounded-full border-4 text-[12px] ${
          attacking
            ? 'border-arcade-gold bg-arcade-gold text-arcade-void'
            : 'border-arcade-magenta bg-arcade-night/90 text-arcade-magenta'
        }`}
        onPointerDown={(event) => {
          event.preventDefault()
          unlockAudio()
          event.currentTarget.setPointerCapture(event.pointerId)
          onAttack(true)
        }}
        onPointerUp={() => onAttack(false)}
        onPointerCancel={() => onAttack(false)}
      >
        A
      </button>
    </div>
  )
}
