import { render, screen } from "@testing-library/react";
import { App } from "@/app/App";

describe("App", () => {
  it("renders the home route inside the application providers", async () => {
    render(<App />);

    expect(await screen.findByRole("heading", { name: "Welcome" })).toBeInTheDocument();
    expect(await screen.findByText(/version 1\.0\.0/)).toBeInTheDocument();
  });
});
