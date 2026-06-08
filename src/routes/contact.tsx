import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MuseumNav } from "@/components/MuseumNav";
import { MuseumFooter } from "@/components/MuseumFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "The Curator's Desk — Seraphine Delacroix" },
      {
        name: "description",
        content:
          "Reach Seraphine Delacroix for commissions and collaborations — email, Discord, Twitter, Fiverr, and more.",
      },
      { property: "og:title", content: "The Curator's Desk — Seraphine Delacroix" },
      {
        property: "og:description",
        content: "Commissions, collaborations, and correspondence.",
      },
    ],
  }),
  component: Contact,
});

interface Channel {
  label: string;
  handle: string;
  href?: string;
  copy?: string;
  status?: "live" | "soon";
}

const channels: Channel[] = [
  {
    label: "Email",
    handle: "Seraphinedelacroix3d@gmail.com",
    href: "mailto:Seraphinedelacroix3d@gmail.com",
    status: "live",
  },
  {
    label: "Discord",
    handle: "seraphineartist",
    copy: "seraphineartist",
    status: "live",
  },
  {
    label: "Twitter · X",
    handle: "@SeraphineDela",
    href: "https://twitter.com/SeraphineDela",
    status: "live",
  },
  {
    label: "Fiverr",
    handle: "fiverr.com/sellers/seraphine3d",
    href: "https://www.fiverr.com/sellers/seraphine3d",
    status: "live",
  },
  {
    label: "Instagram",
    handle: "Coming soon",
    status: "soon",
  },
  {
    label: "YouTube",
    handle: "Coming soon",
    status: "soon",
  },
];

function Contact() {
  return (
    <div className="min-h-screen bg-background grain flex flex-col">
      <MuseumNav />

      <section className="flex-1 flex items-center px-6 pt-40 pb-20 relative">
        <div className="absolute inset-0 spotlight pointer-events-none" />
        <div className="relative mx-auto max-w-3xl w-full">
          <div className="text-center mb-16">
            <div className="text-[10px] tracking-[0.5em] uppercase text-gold mb-6">
              ✦ The Curator's Desk ✦
            </div>
            <h1 className="font-display text-5xl sm:text-7xl">
              Leave a <span className="italic text-gold">note</span>.
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
              For commissions, collaborations, or simply to say the gallery moved
              you — these are the bells you can ring.
            </p>
          </div>

          <div className="border-y border-gold/20">
            {channels.map((c, i) => (
              <ChannelRow key={c.label} channel={c} index={i} />
            ))}
          </div>

          <p className="mt-10 text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70">
            ✦ Replies within two days · most days the same evening ✦
          </p>
        </div>
      </section>

      <MuseumFooter />
    </div>
  );
}

function ChannelRow({ channel, index }: { channel: Channel; index: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!channel.copy) return;
    await navigator.clipboard.writeText(channel.copy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const Inner = (
    <>
      <div className="flex items-center gap-6">
        <span className="font-display text-gold/60 text-sm w-6 text-right">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground w-28">
          {channel.label}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`font-display text-xl sm:text-2xl ${
            channel.status === "soon" ? "text-muted-foreground italic" : "text-foreground group-hover:text-gold"
          } transition-colors`}
        >
          {channel.handle}
        </span>
        {channel.status !== "soon" && (
          <span className="text-gold/60 text-sm group-hover:translate-x-1 transition-transform">
            {channel.copy ? (copied ? "✓ Copied" : "Copy") : "→"}
          </span>
        )}
      </div>
    </>
  );

  const base =
    "group flex items-center justify-between py-6 px-2 border-b border-border/30 last:border-b-0 transition-colors hover:bg-wall/40";

  if (channel.href) {
    return (
      <a
        href={channel.href}
        target={channel.href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className={base}
      >
        {Inner}
      </a>
    );
  }
  if (channel.copy) {
    return (
      <button onClick={handleCopy} className={`${base} w-full text-left`}>
        {Inner}
      </button>
    );
  }
  return <div className={base}>{Inner}</div>;
}
