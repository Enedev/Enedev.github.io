# Pixel Art Portfolio

Interactive 2D pixel-art portfolio built with React, Vite, TypeScript, and Tailwind CSS.

## Play

```bash
npm run dev
```

- Move with **WASD** or **arrow keys**
- Smash a crystal by walking into it, pressing **Space / J / Enter**, or tapping **A** on mobile
- Each crystal opens a modal: About, Skills, Experience, Projects, or Contact
- Broken crystals stay smashed for the rest of the session

Edit copy in `src/data/portfolio.ts`.

## Scripts

```bash
npm run dev      # start the local dev server
npm run build    # type-check and production build
npm run preview  # preview the production build
npm run lint     # run oxlint
```

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Canvas API for movement, collisions, sprites, and particles
- Web Audio API for footsteps, hits, and modal stingers
