import { ArcadeShell } from './components/ArcadeShell'
import { GameCanvas } from './components/GameCanvas'

export default function App() {
  return (
    <ArcadeShell>
      <GameCanvas />
      <div className="arcade-vignette absolute inset-0 z-10" />
      <div className="arcade-scanlines absolute inset-0 z-20" />
    </ArcadeShell>
  )
}
