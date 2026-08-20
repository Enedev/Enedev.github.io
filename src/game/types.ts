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
  animTime: number
  frame: number
  attackTime: number
}

export type Crystal = {
  id: CrystalId
  nx: number
  ny: number
  x: number
  y: number
  width: number
  height: number
  state: CrystalState
  breakTime: number
  label: string
  color: string
  highlight: string
  shadow: string
}

export type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

export type Rect = {
  x: number
  y: number
  width: number
  height: number
}
