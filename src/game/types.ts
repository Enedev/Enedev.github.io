export type CrystalId = 'about' | 'skills' | 'experience' | 'projects' | 'contact'

export type CrystalState = 'idle' | 'breaking' | 'broken'

export type Direction = 'up' | 'down' | 'left' | 'right'

export type Axis = {
  x: number
  y: number
}

export type WorldBounds = {
  width: number
  height: number
}

export type Player = {
  x: number
  y: number
  width: number
  height: number
  speed: number
  direction: Direction
  isMoving: boolean
}
