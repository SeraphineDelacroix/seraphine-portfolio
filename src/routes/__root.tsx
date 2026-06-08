import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6">
          ✦ Closed Wing ✦
        </div>
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 font-display text-2xl text-foreground">
          This corridor is empty
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The piece you're looking for is no longer on display.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-gold/40 text-gold px-6 py-3 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors"
          >
            Return to Entrance
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-foreground">
          The lights flickered
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A custodian is on the way. Please try again in a moment.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-gold/40 text-gold px-5 py-2 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-ink transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border text-foreground px-5 py-2 text-[11px] tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-colors"
          >
            Entrance
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Seraphine Delacroix — Gallery of Digital Artifacts" },
      {
        name: "description",
        content:
          "The portfolio of Seraphine Delacroix — 3D artist for games, exhibited as a midnight museum of digital artifacts.",
      },
      { name: "author", content: "Seraphine Delacroix" },
      { property: "og:title", content: "Seraphine Delacroix — Gallery of Digital Artifacts" },
      {
        property: "og:description",
        content:
          "A midnight museum of 3D map assets, modeled in Blender and finished in Substance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
