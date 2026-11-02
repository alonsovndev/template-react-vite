import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { AppLayout } from "@/shared/components/AppLayout";
import { ErrorFallback } from "@/shared/components/ErrorFallback";

const HomePage = lazy(() => import("@/app/routes/HomePage"));
const NotFoundPage = lazy(() => import("@/app/routes/NotFoundPage"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    // The router catches render errors itself, so ErrorBoundary above it never sees them.
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
