export function MuseumFooter() {
  return (
    <footer className="border-t border-border/40 mt-32">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        <span>© {new Date().getFullYear()} Seraphine Delacroix</span>
        <span className="text-gold/70">✦ The gallery never truly closes ✦</span>
        <span>Hours · By Appointment</span>
      </div>
    </footer>
  );
}
