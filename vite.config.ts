// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Inside the Lovable sandbox we keep the default Cloudflare nitro target so the
// preview keeps working. For external builds (GitHub Actions / `npm run build`)
// we switch to nitro's `static` preset and prerender every route so the output
// can be served from GitHub Pages.
const isLovableSandbox = !!process.env.LOVABLE_SANDBOX || !!process.env.DEV_SERVER__PROJECT_PATH;

const artworkSlugs = [
  "the-keeper",
  "the-weeping-stone",
  "the-vigil",
  "the-watcher",
  "the-oath",
  "the-grimoire",
];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: isLovableSandbox
    ? undefined
    : {
        preset: "static",
      },
  // Vite-specific options such as `base` should go under the `vite` key
  vite: {
    base: "/seraphine-portfolio/",
  },
});

// Surface prerender hints to nitro via env so the static preset crawls every route.
if (!isLovableSandbox) {
  process.env.NITRO_PRERENDER_ROUTES = [
    "/",
    "/museum",
    "/contact",
    ...artworkSlugs.map((s) => `/museum/${s}`),
  ].join(",");
}
