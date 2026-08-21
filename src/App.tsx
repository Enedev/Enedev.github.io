import { useEffect, useState } from 'react'
import { ArcadeShell } from './components/ArcadeShell'
import { GameCanvas } from './components/GameCanvas'
import { InfoModal } from './components/InfoModal'
import { PauseMenu } from './components/PauseMenu'
import { StartScreen } from './components/StartScreen'
import { TouchControls } from './components/TouchControls'
import { playHit, playModal, playStep, unlockAudio } from './game/audio'
import { CONTENT_CRYSTAL_IDS } from './game/crystal'
import { useLanguage } from './i18n/LanguageContext'
import type { Axis, ContentCrystalId } from './game/types'

const ZERO_AXIS: Axis = { x: 0, y: 0 }

export default function App() {
  const { t } = useLanguage()
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [worldKey, setWorldKey] = useState(0)
  const [brokenIds, setBrokenIds] = useState<ContentCrystalId[]>([])
  const [openId, setOpenId] = useState<ContentCrystalId | null>(null)
  const [touchAxis, setTouchAxis] = useState<Axis>(ZERO_AXIS)
  const [touchSprint, setTouchSprint] = useState(false)

  const startGame = () => {
    unlockAudio()
    setPaused(false)
    setStarted(true)
  }

  const resumeGame = () => {
    unlockAudio()
    setPaused(false)
    setTouchAxis(ZERO_AXIS)
    setTouchSprint(false)
  }

  const pauseGame = () => {
    setPaused(true)
    setTouchAxis(ZERO_AXIS)
    setTouchSprint(false)
  }

  const onReset = () => {
    setBrokenIds([])
    setOpenId(null)
    setTouchAxis(ZERO_AXIS)
    setTouchSprint(false)
    setPaused(false)
    setWorldKey((key) => key + 1)
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        if (openId || !started) return
        event.preventDefault()
        if (paused) resumeGame()
        else pauseGame()
        return
      }

      if (paused && (event.code === 'Space' || event.code === 'Enter')) {
        event.preventDefault()
        resumeGame()
        return
      }

      if (started || openId) return
      if (event.code !== 'Space' && event.code !== 'Enter') return
      event.preventDefault()
      startGame()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [started, openId, paused])

  const onCrystalBroken = (id: ContentCrystalId) => {
    setBrokenIds((current) => (current.includes(id) ? current : [...current, id]))
    setOpenId(id)
    setTouchAxis(ZERO_AXIS)
    setTouchSprint(false)
    playModal()
  }

  const playing = started && !paused && openId === null

  return (
    <ArcadeShell
      smashed={brokenIds.length}
      total={CONTENT_CRYSTAL_IDS.length}
      started={started}
      paused={paused}
    >
      <GameCanvas
        key={worldKey}
        paused={!playing}
        brokenIds={brokenIds}
        touchAxis={touchAxis}
        touchSprint={touchSprint}
        crystalLabels={t.crystalLabels}
        canvasLabel={t.canvasLabel}
        onCrystalBroken={onCrystalBroken}
        onReset={onReset}
        onStep={playStep}
        onHit={playHit}
      />
      <div className="arcade-vignette pointer-events-none absolute inset-0 z-10" />
      <div className="arcade-scanlines pointer-events-none absolute inset-0 z-20" />
      {playing && brokenIds.length === 0 ? (
        <p className="pointer-events-none absolute bottom-24 left-1/2 z-30 w-[90%] -translate-x-1/2 text-center text-[8px] leading-loose text-arcade-gold sm:bottom-6">
          {t.hintMove}
        </p>
      ) : null}
      {playing && brokenIds.length === CONTENT_CRYSTAL_IDS.length ? (
        <p className="pointer-events-none absolute bottom-24 left-1/2 z-30 w-[90%] -translate-x-1/2 text-center text-[8px] leading-loose text-arcade-gold sm:bottom-6">
          {t.hintRetry}
        </p>
      ) : null}
      {playing ? (
        <button
          type="button"
          className="absolute right-3 top-3 z-40 border-2 border-arcade-gold bg-arcade-night/90 px-2 py-2 text-[8px] text-arcade-gold sm:right-4 sm:top-4 sm:text-[10px]"
          onClick={pauseGame}
        >
          {t.pauseButton}
        </button>
      ) : null}
      {!started ? <StartScreen onStart={startGame} /> : null}
      {started && paused ? <PauseMenu onResume={resumeGame} onReset={onReset} /> : null}
      {playing ? (
        <TouchControls
          axis={touchAxis}
          sprinting={touchSprint}
          onAxis={setTouchAxis}
          onSprint={setTouchSprint}
        />
      ) : null}
      <InfoModal
        crystalId={openId}
        smashed={brokenIds.length}
        total={CONTENT_CRYSTAL_IDS.length}
        onClose={() => {
          setOpenId(null)
          setTouchSprint(false)
          unlockAudio()
        }}
      />
    </ArcadeShell>
  )
}
