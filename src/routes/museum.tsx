import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/museum")({
  component: () => <Outlet />,
});
