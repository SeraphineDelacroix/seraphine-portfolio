import { Link } from "@tanstack/react-router";

export function MuseumNav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="group flex items-baseline gap-3 font-display text-sm tracking-[0.35em] uppercase"
        >
          <span className="text-gold">✦</span>
          <span className="text-foreground/90 group-hover:text-gold transition-colors">
            Seraphine Delacroix
          </span>
          <span className="hidden sm:inline text-muted-foreground/60 text-[10px]">
            — Gallery of Digital Artifacts
          </span>
        </Link>
        <nav className="flex items-center gap-8 text-[11px] tracking-[0.3em] uppercase">
          <NavLink to="/">Entrance</NavLink>
          <NavLink to="/museum">Gallery</NavLink>
          <NavLink to="/contact">Curator</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="relative text-muted-foreground hover:text-gold transition-colors"
      activeProps={{ className: "text-gold" }}
      activeOptions={{ exact: to === "/" }}
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500 ${
              isActive ? "w-full" : "w-0"
            }`}
          />
        </>
      )}
    </Link>
  );
}
