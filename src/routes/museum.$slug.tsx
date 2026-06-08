import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { MuseumNav } from "@/components/MuseumNav";
import { MuseumFooter } from "@/components/MuseumFooter";
import { getArtwork, artworks } from "@/data/artworks";

const ModelViewer = lazy(() =>
  import("@/components/ModelViewer").then((m) => ({ default: m.ModelViewer })),
);

export const Route = createFileRoute("/museum/$slug")({
  loader: ({ params }) => {
    const art = getArtwork(params.slug);
    if (!art) throw notFound();
    return { art };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.art.title} — Seraphine Delacroix` },
          { name: "description", content: loaderData.art.description },
          { property: "og:title", content: `${loaderData.art.title} — Seraphine Delacroix` },
          { property: "og:description", content: loaderData.art.description },
          { property: "og:image", content: loaderData.art.hero },
          { name: "twitter:image", content: loaderData.art.hero },
        ]
      : [],
  }),
  component: ArtworkRoom,
});

function ArtworkRoom() {
  const { art } = Route.useLoaderData();

  const steps = [
    {
      label: "I · The Skeleton",
      title: "Wireframe",
      caption: "Every form begins as geometry. Bone before flesh.",
      img: art.process.wireframe,
    },
    {
      label: "II · The Skin",
      title: "Texture Map",
      caption: "UVs unwrapped, surfaces painted — the lived-in details that lie flat until called.",
      img: art.process.texture,
    },
    {
      label: "III · The Light",
      title: "Render",
      caption: "Clay light. The form revealed without the disguise of color.",
      img: art.process.render,
    },
    {
      label: "IV · The Soul",
      title: "Final",
      caption: "The piece, complete. Lit as it deserves to be lit.",
      img: art.process.final,
    },
  ];

  // index for prev/next navigation
  const i = artworks.findIndex((a) => a.slug === art.slug);
  const prev = artworks[(i - 1 + artworks.length) % artworks.length];
  const next = artworks[(i + 1) % artworks.length];

  return (
    <div className="min-h-screen bg-background grain">
      <MuseumNav />

      {/* Crumbs */}
      <div className="pt-28 px-6">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/museum"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-gold transition-colors"
          >
            ← Return to the Gallery
          </Link>
        </div>
      </div>

      {/* Title plate */}
      <section className="px-6 pt-12 pb-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
            ✦ Private Chamber · {art.year} ✦
          </div>
          <h1 className="font-display text-5xl sm:text-7xl">
            <span className="italic">{art.title}</span>
          </h1>
          <p className="mt-4 text-xs tracking-[0.3em] uppercase text-muted-foreground">
            {art.medium}
          </p>
        </div>
      </section>

      {/* 3D Viewer */}
      <section className="px-6">
        <div className="mx-auto max-w-7xl">
          <div className="relative gold-frame overflow-hidden">
            <Suspense
              fallback={
                <div className="h-[60vh] min-h-[420px] w-full bg-ink flex items-center justify-center">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground animate-pulse">
                    ✦ Preparing exhibit ✦
                  </div>
                </div>
              }
            >
              <ModelViewer shape={art.shape} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl sm:text-3xl text-foreground leading-relaxed italic">
            "{art.description}"
          </p>
          <div className="mt-8 mx-auto w-12 h-px bg-gold/50" />
          <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            — Plaque, beneath the work
          </p>
        </div>
      </section>

      {/* Process — sequential reveal */}
      <section className="border-t border-border/40">
        <div className="text-center py-20 px-6 bg-wall/30">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
            ✦ The Process ✦
          </div>
          <h2 className="font-display text-4xl sm:text-5xl">
            From skeleton to soul
          </h2>
        </div>

        {steps.map((step, idx) => (
          <article
            key={step.title}
            className="min-h-[80vh] flex items-center px-6 py-20 border-t border-border/40 relative"
          >
            <div className="absolute inset-0 spotlight opacity-50 pointer-events-none" />
            <div className="relative mx-auto max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
              <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                <div className="gold-frame bg-ink overflow-hidden">
                  <img
                    src={step.img}
                    alt={`${art.title} — ${step.title}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    width={1024}
                    height={1024}
                  />
                </div>
              </div>
              <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">
                  {step.label}
                </div>
                <h3 className="font-display text-5xl sm:text-6xl mb-6">
                  {step.title}
                </h3>
                <div className="h-px w-16 bg-gold/40 mb-6" />
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {step.caption}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Prev / Next */}
      <section className="px-6 py-20 border-t border-border/40">
        <div className="mx-auto max-w-6xl grid sm:grid-cols-2 gap-px bg-border/30">
          <Link
            to="/museum/$slug"
            params={{ slug: prev.slug }}
            className="group bg-background p-8 hover:bg-wall transition-colors"
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              ← Previous Chamber
            </div>
            <div className="font-display text-2xl text-foreground group-hover:text-gold transition-colors">
              {prev.title}
            </div>
          </Link>
          <Link
            to="/museum/$slug"
            params={{ slug: next.slug }}
            className="group bg-background p-8 hover:bg-wall transition-colors sm:text-right"
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Next Chamber →
            </div>
            <div className="font-display text-2xl text-foreground group-hover:text-gold transition-colors">
              {next.title}
            </div>
          </Link>
        </div>
      </section>

      <MuseumFooter />
    </div>
  );
}
