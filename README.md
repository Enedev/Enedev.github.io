# Pixel Art Portfolio

Interactive 2D pixel-art portfolio built with React, Vite, TypeScript, and Tailwind CSS.

## Play

```bash
npm run dev
```

- Press **Space**, **Enter**, click, or tap **START** to begin
- Move with **WASD**, arrows, click/drag, or the on-screen pad
- Hold **Shift** (or **RUN** on touch) to sprint
- Smash a crystal by walking into it
- Each crystal opens a modal: About, Skills, Experience, Projects, or Contact
- Broken crystals stay smashed for the rest of the session

Edit copy in `src/data/portfolio.ts`.

Live site: https://enedev.github.io/

GitHub Pages needs **Settings → Pages → Source: GitHub Actions**. A workflow builds Vite and publishes `dist` on every push to `main`.

## Scripts

```bash
npm run dev      # start the local dev server
npm run build    # type-check and production build
npm run preview  # preview the production build
npm run lint     # run oxlint
```

## Credits

Player ship: [Void Main Ship](https://foozlecc.itch.io/void-main-ship) by Foozle (CC0).

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Canvas API for movement, collisions, sprites, and particles
- Web Audio API for footsteps, hits, and modal stingers
