import { useState } from 'react'
import { ArcadeShell } from './components/ArcadeShell'
import { GameCanvas } from './components/GameCanvas'
import { InfoModal } from './components/InfoModal'
import { TouchControls } from './components/TouchControls'
import { playHit, playModal, playStep, unlockAudio } from './game/audio'
import { ALL_CRYSTAL_IDS } from './game/crystal'
import type { Axis, CrystalId } from './game/types'

const ZERO_AXIS: Axis = { x: 0, y: 0 }

export default function App() {
  const [brokenIds, setBrokenIds] = useState<CrystalId[]>([])
  const [openId, setOpenId] = useState<CrystalId | null>(null)
  const [touchAxis, setTouchAxis] = useState<Axis>(ZERO_AXIS)
  const [touchAttack, setTouchAttack] = useState(false)

  const onCrystalBroken = (id: CrystalId) => {
    setBrokenIds((current) => (current.includes(id) ? current : [...current, id]))
    setOpenId(id)
    setTouchAxis(ZERO_AXIS)
    setTouchAttack(false)
    playModal()
  }

  return (
    <ArcadeShell smashed={brokenIds.length} total={ALL_CRYSTAL_IDS.length}>
      <GameCanvas
        paused={openId !== null}
        brokenIds={brokenIds}
        touchAxis={touchAxis}
        touchAttack={touchAttack}
        onCrystalBroken={onCrystalBroken}
        onStep={playStep}
        onHit={playHit}
      />
      <div className="arcade-vignette absolute inset-0 z-10" />
      <div className="arcade-scanlines absolute inset-0 z-20" />
      {brokenIds.length === 0 && openId === null ? (
        <p className="pointer-events-none absolute bottom-20 left-1/2 z-30 w-[90%] -translate-x-1/2 text-center text-[8px] leading-loose text-arcade-gold sm:bottom-6">
          WALK INTO A CRYSTAL OR PRESS SPACE
        </p>
      ) : null}
      <TouchControls
        axis={touchAxis}
        attacking={touchAttack}
        onAxis={setTouchAxis}
        onAttack={setTouchAttack}
      />
      <InfoModal
        crystalId={openId}
        smashed={brokenIds.length}
        total={ALL_CRYSTAL_IDS.length}
        onClose={() => {
          setOpenId(null)
          setTouchAttack(false)
          unlockAudio()
        }}
      />
    </ArcadeShell>
  )
}
