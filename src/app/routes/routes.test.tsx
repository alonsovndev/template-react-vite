import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { ConfigProvider, App as AntApp } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "@/app/routes";

function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  return render(
    <ConfigProvider>
      <AntApp>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AntApp>
    </ConfigProvider>
  );
}

describe("routes", () => {
  it("renders the home page with the service status at /", async () => {
    renderRoute("/");

    expect(await screen.findByRole("heading", { name: "Welcome" })).toBeInTheDocument();
    expect(await screen.findByText(/version 1\.0\.0/)).toBeInTheDocument();
  });

  it("renders the not-found page for an unknown path", async () => {
    renderRoute("/does-not-exist");

    expect(await screen.findByText("Page not found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});

describe("route error handling", () => {
  it("shows the recovery screen instead of the router default when a page throws", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    function Boom(): never {
      throw new Error("boom");
    }
    const [rootRoute] = routes;
    if (!rootRoute) {
      throw new Error("routes must define a root route");
    }
    const router = createMemoryRouter(
      [
        {
          path: rootRoute.path,
          element: rootRoute.element,
          errorElement: rootRoute.errorElement,
          children: [{ index: true, element: <Boom /> }],
        },
      ],
      { initialEntries: ["/"] }
    );

    render(
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    );

    expect(await screen.findByText("Something went wrong")).toBeInTheDocument();
    expect(screen.queryByText(/Unexpected Application Error/)).not.toBeInTheDocument();
  });
});
