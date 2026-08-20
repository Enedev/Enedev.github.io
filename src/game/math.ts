export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function aabb(a: {
  x: number
  y: number
  width: number
  height: number
}, b: {
  x: number
  y: number
  width: number
  height: number
}) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  )
}

export function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}
