import { Link } from "@tanstack/react-router";
import type { Artwork } from "@/data/artworks";

interface Props {
  artwork: Artwork;
  index: number;
}

export function ArtworkFrame({ artwork, index }: Props) {
  // Three cascade preview offsets (diagonal fan)
  const cascades = [
    { x: 24, y: 18, r: 4, d: 80 },
    { x: 48, y: 36, r: 8, d: 160 },
    { x: 72, y: 54, r: 12, d: 240 },
  ];

  return (
    <div
      className="group relative animate-fade-up"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <Link
        to="/museum/$slug"
        params={{ slug: artwork.slug }}
        className="block relative"
        aria-label={`View ${artwork.title}`}
      >
        {/* Cascade ghosts — peek out on hover */}
        <div className="absolute inset-0 pointer-events-none">
          {cascades.map((c, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100"
              style={{
                transitionDelay: `${c.d}ms`,
                transform: `translate(0, 0) rotate(0deg)`,
              }}
            >
              <div
                className="absolute inset-0 gold-frame bg-ink overflow-hidden transition-transform duration-700 ease-out"
                style={{
                  transform: `translate(0, 0) rotate(0deg)`,
                }}
                ref={(el) => {
                  if (!el) return;
                  // Set hover transform via CSS var trick — simpler inline:
                  el.style.setProperty("--tx", `${c.x}px`);
                  el.style.setProperty("--ty", `${c.y}px`);
                  el.style.setProperty("--tr", `${c.r}deg`);
                }}
              >
                <img
                  src={artwork.hero}
                  alt=""
                  className="w-full h-full object-cover opacity-70"
                  loading="lazy"
                  width={1024}
                  height={1024}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Main frame */}
        <div className="relative gold-frame bg-ink overflow-hidden aspect-[4/5] transition-transform duration-500 group-hover:-translate-y-1">
          <img
            src={artwork.hero}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
            loading="lazy"
            width={1024}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20 pointer-events-none" />
        </div>
      </Link>

      {/* Nameplate */}
      <div className="mt-6 mx-auto max-w-[80%] nameplate px-5 py-3 text-center relative">
        <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-2 h-2 rounded-full bg-gold/50" />
        <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-2 h-2 rounded-full bg-gold/50" />
        <h3 className="font-display text-xl text-gold leading-tight">
          {artwork.title}
        </h3>
        <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
          {artwork.medium}
        </p>
      </div>

      {/* Inline cascade styles via JS — apply group hover transforms */}
      <style>{`
        .group:hover [style*="--tx"] {
          transform: translate(var(--tx), var(--ty)) rotate(var(--tr)) scale(0.85) !important;
        }
      `}</style>
    </div>
  );
}
