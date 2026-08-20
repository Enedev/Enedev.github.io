import { GameCanvas } from './components/GameCanvas'

export default function App() {
  return (
    <main className="relative min-h-svh bg-zinc-950">
      <GameCanvas />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">
          Boot sequence
        </p>
        <h1 className="mt-4 text-3xl font-bold text-zinc-50 sm:text-4xl">
          Pixel Portfolio
        </h1>
        <p className="mt-3 max-w-md text-sm text-zinc-400 sm:text-base">
          Vite + React + TypeScript + Tailwind CSS is ready. Player movement
          arrives in the next gameplay step.
        </p>
      </div>
    </main>
  )
}
