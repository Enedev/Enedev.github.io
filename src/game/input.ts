import type { Axis, Direction } from './types'

const DIRECTION_BY_CODE: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyW: 'up',
  KeyA: 'left',
  KeyS: 'down',
  KeyD: 'right',
}

export function createKeyboard() {
  const held = new Set<string>()

  const onDown = (event: KeyboardEvent) => {
    if (!(event.code in DIRECTION_BY_CODE)) return
    event.preventDefault()
    held.add(event.code)
  }

  const onUp = (event: KeyboardEvent) => {
    if (!(event.code in DIRECTION_BY_CODE)) return
    event.preventDefault()
    held.delete(event.code)
  }

  const onBlur = () => {
    held.clear()
  }

  return {
    attach() {
      window.addEventListener('keydown', onDown)
      window.addEventListener('keyup', onUp)
      window.addEventListener('blur', onBlur)
    },
    detach() {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', onBlur)
      held.clear()
    },
    axis(): Axis {
      let x = 0
      let y = 0

      for (const code of held) {
        const direction = DIRECTION_BY_CODE[code]
        if (direction === 'left') x -= 1
        if (direction === 'right') x += 1
        if (direction === 'up') y -= 1
        if (direction === 'down') y += 1
      }

      return {
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      }
    },
  }
}
