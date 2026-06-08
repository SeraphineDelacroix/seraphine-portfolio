
# Seraphine — Museum Portfolio

A three-route portfolio styled like a dark, cinematic museum (Dark Atelier vibe: charcoal walls, warm gold spotlights, hushed serif typography). Designed to feel like the Louvre after hours, with your 3D assets framed as paintings.

## Structure

```
/             Entrance     — intro, craft statement, software toolkit
/museum       Gallery hall — framed artworks with cascade hover
/museum/$slug Artwork room — 3D viewer + hidden process page
/contact      Contact wing — social/contact links
```

A persistent thin top bar reads "SERAPHINE DELACROIX — GALLERY OF DIGITAL ARTIFACTS" with minimal nav (Entrance · Gallery · Contact).

## Page 1 — Entrance (`/`)

- Hero: large serif title "Step Inside.", subtitle about lively, detail-driven 3D map assets, soft gold spotlight on a dark wall texture, subtle dust/particle motion.
- "About the Artist" block: 6 years experience, focus on map/environment assets, obsession with surface detail that makes models feel lively.
- "Tools of the Craft" — 4 cards (Blender, Substance Painter, Substance Designer, Photoshop), each with icon, short purpose line, hover lift with gold underline.
- CTA: "Enter the Gallery →" pulls user to `/museum`.

## Page 2 — Museum (`/museum`)

- Long hall layout: artworks displayed as framed paintings on a dark wall, gold nameplate beneath each (title + medium).
- **Cascade hover effect**: on hover over a frame, 3 smaller framed previews fan out diagonally (staggered offset + rotation + fade-in), giving a glimpse of alternate angles/details.
- Click the main frame → navigates to the hidden artwork room.
- 6–8 placeholder artworks generated as sample 3D renders.

## Page 3 — Artwork Room (`/museum/$slug`)

Hidden route, only reachable by clicking a frame.

- **Top: Live 3D Viewer** — interactive turntable on a dark plinth with a warm gold spotlight. Orbit / zoom / pan controls, soft auto-rotate until the user interacts. A small caption hints "drag to rotate · scroll to zoom". Built with React Three Fiber + drei's `OrbitControls` and `useGLTF`. Each artwork's data entry points to a `.glb` file in `src/assets/models/` (placeholder primitives — e.g. a sculpted bust or prop — until you drop in real exports). Graceful fallback to the final render image if WebGL is unavailable.
- **Below: Sequential process reveal** — scroll-driven story:
  1. **Wireframe** — "The Skeleton"
  2. **Texture Map** — "The Skin"
  3. **Render** — "The Light"
  4. **Final** — "The Soul"
  Each step is a viewport-height section with a thin gold divider and soft fade-in.
- Footer: "← Return to the Gallery".

## Page 4 — Contact (`/contact`)

Quiet, centered layout — "The Curator's Desk".

- Email: Seraphinedelacroix3d@gmail.com (mailto)
- Discord: seraphineartist (copy-to-clipboard)
- Twitter/X: @SeraphineDela
- Fiverr: fiverr.com/sellers/seraphine3d
- Instagram: (placeholder — "coming soon")
- YouTube: (placeholder — "coming soon")

## Visual Direction

- Palette: `#0d0d0d` background, `#1a1a1a` panels, `#c9a84c` gold accent, `#e8c07a` warm highlight, off-white text.
- Typography: serif display (Cormorant / Playfair) for headings; Inter for body and captions.
- Frames: subtle inset gold border, soft drop shadow, faint vignette around each artwork to mimic spotlight.
- Motion: restrained — fade-ins on scroll, gentle hover lift; the cascade hover and the 3D viewer are the expressive moments.

I'll generate three rendered design directions (all locked to this Dark Atelier palette) so you can pick the exact composition before I build.

## Technical notes

- TanStack Start routes: `index.tsx`, `museum.tsx` (layout w/ Outlet) + `museum.index.tsx`, `museum.$slug.tsx`, `contact.tsx`. Per-route `head()` meta.
- Artwork data in `src/data/artworks.ts`: `{ id, slug, title, medium, modelUrl, frames: { wireframe, texture, render, final } }`.
- 3D viewer: `@react-three/fiber` + `@react-three/drei` (OrbitControls, Stage, Environment, useGLTF). Lazy-loaded so the rest of the site stays light. WebGL-unsupported fallback shows the final render.
- Placeholder GLB models + imagery generated and stored in `src/assets/`. Swap files in place when your real exports are ready.
- No backend needed for this scope.
- Animations via Tailwind keyframes + Motion for React for cascade hover and scroll reveals.

## Out of scope (ask if you want them)

- Contact form (would need Lovable Cloud + email integration)
- CMS / admin to manage artworks
- Light mode
- AR / model download buttons on the artwork room
