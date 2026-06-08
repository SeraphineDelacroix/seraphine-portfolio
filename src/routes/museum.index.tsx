import { createFileRoute } from "@tanstack/react-router";
import { MuseumNav } from "@/components/MuseumNav";
import { MuseumFooter } from "@/components/MuseumFooter";
import { ArtworkFrame } from "@/components/ArtworkFrame";
import { artworks } from "@/data/artworks";

export const Route = createFileRoute("/museum/")({
  head: () => ({
    meta: [
      { title: "Gallery — Seraphine Delacroix" },
      {
        name: "description",
        content:
          "Six 3D artifacts on display: chests, fountains, lanterns, gargoyles, swords, and tomes — each modeled, textured, and rendered by hand.",
      },
      { property: "og:title", content: "Gallery — Seraphine Delacroix" },
      {
        property: "og:description",
        content: "Currently exhibiting six pieces. Hover a frame to glimpse more.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <div className="min-h-screen bg-background grain">
      <MuseumNav />

      <section className="pt-40 pb-20 px-6 text-center relative">
        <div className="absolute inset-0 spotlight pointer-events-none" />
        <div className="relative">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-6">
            ✦ The Long Hall ✦
          </div>
          <h1 className="font-display text-5xl sm:text-7xl">
            The <span className="italic text-gold">Exhibition</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
            Hover a frame to glimpse the alternate views. Step closer — click a
            piece — to enter its private chamber.
          </p>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {artworks.map((art, i) => (
              <ArtworkFrame key={art.slug} artwork={art} index={i} />
            ))}
          </div>
        </div>
      </section>

      <MuseumFooter />
    </div>
  );
}
