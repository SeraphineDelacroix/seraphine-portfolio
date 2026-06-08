import { createFileRoute, Link } from "@tanstack/react-router";
import { MuseumNav } from "@/components/MuseumNav";
import { MuseumFooter } from "@/components/MuseumFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entrance — Seraphine Delacroix · Gallery of Digital Artifacts" },
      {
        name: "description",
        content:
          "Step into the gallery of Seraphine Delacroix — six years sculpting map assets in Blender, finished in Substance Painter, Substance Designer and Photoshop.",
      },
      { property: "og:title", content: "Seraphine Delacroix — Entrance" },
      {
        property: "og:description",
        content: "A midnight museum of 3D map assets.",
      },
    ],
  }),
  component: Entrance,
});

const tools = [
  {
    name: "Blender",
    role: "Sculpture & Sculpting",
    note: "Where every mesh begins — modeled, sculpted, and retopologized by hand.",
  },
  {
    name: "Substance Painter",
    role: "Surface & Story",
    note: "Wear patterns, smudged fingerprints, edge highlights — the lived-in details.",
  },
  {
    name: "Substance Designer",
    role: "Materials from Nothing",
    note: "Procedural textures built node by node — stone, bronze, weathered oak.",
  },
  {
    name: "Photoshop",
    role: "The Final Polish",
    note: "Composite renders, color grade, and present the work as it deserves.",
  },
];

function Entrance() {
  return (
    <div className="min-h-screen bg-background grain">
      <MuseumNav />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0 spotlight animate-spotlight pointer-events-none" />
        <div className="absolute inset-0 vignette pointer-events-none" />

        {/* Floating dust particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute block w-1 h-1 rounded-full bg-gold/40 animate-drift"
              style={{
                left: `${(i * 83) % 100}%`,
                top: `${(i * 47) % 100}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${6 + (i % 5)}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold/80 mb-8 animate-fade-up">
            ✦ Now Exhibiting · MMXXVI ✦
          </div>
          <h1 className="font-display text-6xl sm:text-7xl md:text-9xl text-foreground leading-[0.95] animate-fade-up" style={{ animationDelay: "120ms" }}>
            Step
            <span className="italic text-gold"> Inside.</span>
          </h1>
          <p className="mt-10 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "240ms" }}>
            A private gallery of 3D artifacts — sculpted for the worlds you wander
            through in games. Six years of obsessing over the surface details
            that make a model feel less like a prop, and more like something
            someone <em className="text-gold-soft">used to hold</em>.
          </p>
          <div className="mt-12 flex items-center justify-center gap-6 animate-fade-up" style={{ animationDelay: "360ms" }}>
            <Link
              to="/museum"
              className="group inline-flex items-center gap-3 border border-gold/50 text-gold px-8 py-4 text-[11px] tracking-[0.4em] uppercase hover:bg-gold hover:text-ink transition-all duration-500"
            >
              Enter the Gallery
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">
          Scroll ↓
        </div>
      </section>

      {/* About */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-5xl grid md:grid-cols-[1fr_2fr] gap-16">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              ✦ I · About the Artist
            </div>
            <div className="h-px w-16 bg-gold/40" />
          </div>
          <div className="space-y-6 text-foreground/85 leading-relaxed">
            <p className="font-display text-3xl text-foreground leading-tight">
              I am Seraphine Delacroix.
            </p>
            <p>
              For six years I have made my living sculpting the small, stubborn things
              that fill the maps you walk through — the chest in the corner, the
              fountain at the crossroads, the lantern someone left burning. None of
              them are background.
            </p>
            <p>
              What I care about is the detail that makes a model feel{" "}
              <span className="text-gold-soft italic">alive</span> — the smudge of
              soot where a hand has rested a thousand times, the moss that crept in
              while no one was watching, the seam where two woods refuse to meet.
              The surface is the story.
            </p>
            <div className="pt-4 grid grid-cols-3 gap-6 text-center sm:text-left">
              <Stat n="6" label="Years Sculpting" />
              <Stat n="200+" label="Assets Shipped" />
              <Stat n="4" label="Tools, Mastered" />
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="relative py-32 px-6 border-t border-border/40 bg-wall/40">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              ✦ II · Tools of the Craft
            </div>
            <h2 className="font-display text-4xl sm:text-5xl">
              The instruments on the workbench
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30">
            {tools.map((t, i) => (
              <div
                key={t.name}
                className="group bg-background p-8 hover:bg-wall transition-colors duration-500 relative"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-6">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2 group-hover:text-gold transition-colors">
                  {t.name}
                </h3>
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
                  {t.role}
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {t.note}
                </p>
                <div className="absolute bottom-0 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative">
        <div className="absolute inset-0 spotlight pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <p className="font-display text-4xl sm:text-5xl text-foreground italic">
            The exhibition awaits.
          </p>
          <p className="mt-6 text-muted-foreground">
            Six pieces are currently on display. The lights are on. The hall is empty.
          </p>
          <div className="mt-10">
            <Link
              to="/museum"
              className="group inline-flex items-center gap-3 border border-gold/50 text-gold px-8 py-4 text-[11px] tracking-[0.4em] uppercase hover:bg-gold hover:text-ink transition-all duration-500"
            >
              Enter the Gallery
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <MuseumFooter />
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl text-gold">{n}</div>
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}
