export const PIXEL = 4

type DrawSpriteOptions = {
  flipX?: boolean
  scale?: number
  skipChance?: number
}

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  rows: readonly string[],
  originX: number,
  originY: number,
  palette: Record<string, string>,
  options: DrawSpriteOptions = {},
) {
  const scale = options.scale ?? PIXEL
  const flipX = options.flipX ?? false
  const skipChance = options.skipChance ?? 0
  const x = Math.round(originX)
  const y = Math.round(originY)

  for (let row = 0; row < rows.length; row += 1) {
    const line = rows[row]
    if (!line) continue

    for (let col = 0; col < line.length; col += 1) {
      if (skipChance > 0 && Math.random() < skipChance) continue
      const color = palette[line[col] ?? '']
      if (!color) continue
      const drawCol = flipX ? line.length - 1 - col : col
      ctx.fillStyle = color
      ctx.fillRect(x + drawCol * scale, y + row * scale, scale, scale)
    }
  }
}
