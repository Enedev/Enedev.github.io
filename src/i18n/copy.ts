import type { CrystalId } from '../game/types'
import type { Locale } from './locale'

export type UiCopy = {
  boot: string
  title: string
  startBlurb: string
  pressStart: string
  startKeys: string
  start: string
  pickLanguage: string
  spanish: string
  english: string
  pause: string
  pauseHint: string
  reset: string
  hintMove: string
  hintMoveTouch: string
  hintRetry: string
  crystals: string
  close: string
  ready: string
  moveHint: string
  sprintHint: string
  pausedHint: string
  credit: string
  pauseButton: string
  canvasLabel: string
  crystalLabels: Record<CrystalId, string>
}

export const COPY: Record<Locale, UiCopy> = {
  en: {
    boot: 'Boot sequence',
    title: 'Pixel Portfolio',
    startBlurb: 'Smash crystals. Unlock about, skills, and projects.',
    pressStart: 'PRESS START',
    startKeys: 'SPACE, ENTER, CLICK START',
    start: 'START',
    pickLanguage: 'SELECT LANGUAGE',
    spanish: 'ESPAÑOL',
    english: 'ENGLISH',
    pause: 'PAUSED',
    pauseHint: 'ESC TO RESUME',
    reset: 'RESET',
    hintMove: 'TOUCH A CRYSTAL. CLICK OR DRAG TO MOVE. SHIFT RUNS.',
    hintMoveTouch: 'DRAG WITH YOUR FINGER TO MOVE.',
    hintRetry: 'TOUCH RETRY TO RESET',
    crystals: 'CRYSTALS',
    close: 'CLOSE',
    ready: 'READY',
    moveHint: 'WASD / CLICK',
    sprintHint: 'SHIFT RUN',
    pausedHint: 'PAUSED',
    credit: 'CREDIT',
    pauseButton: 'PAUSE',
    canvasLabel: 'Pixel portfolio. Drag or click to move. Touch a crystal to open it. Hold Shift to run.',
    crystalLabels: {
      about: 'ABOUT',
      skills: 'SKILLS',
      experience: 'XP',
      projects: 'PROJECTS',
      contact: 'CONTACT',
      restart: 'RETRY',
    },
  },
  es: {
    boot: 'Secuencia de arranque',
    title: 'Pixel Portfolio',
    startBlurb: 'Rompe cristales. Desbloquea sobre mí, habilidades y proyectos.',
    pressStart: 'PRESIONA START',
    startKeys: 'ESPACIO, ENTER, CLIC EN START',
    start: 'START',
    pickLanguage: 'SELECCIONA IDIOMA',
    spanish: 'ESPAÑOL',
    english: 'ENGLISH',
    pause: 'PAUSA',
    pauseHint: 'ESC PARA CONTINUAR',
    reset: 'REINICIAR',
    hintMove: 'TOCA UN CRISTAL. CLIC O ARRASTRA PARA MOVERTE. SHIFT PARA CORRER.',
    hintMoveTouch: 'ARRASTRA CON EL DEDO PARA MOVERTE.',
    hintRetry: 'TOCA RETRY PARA REINICIAR',
    crystals: 'CRISTALES',
    close: 'CERRAR',
    ready: 'LISTO',
    moveHint: 'WASD / CLIC',
    sprintHint: 'SHIFT CORRE',
    pausedHint: 'PAUSA',
    credit: 'CREDIT',
    pauseButton: 'PAUSA',
    canvasLabel:
      'Portafolio en pixel art. Arrastra con el dedo para moverte. Toca un cristal para abrirlo.',
    crystalLabels: {
      about: 'SOBRE',
      skills: 'SKILLS',
      experience: 'XP',
      projects: 'PROYECTOS',
      contact: 'CONTACTO',
      restart: 'RETRY',
    },
  },
}
