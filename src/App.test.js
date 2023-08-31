import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders the Navbar and Outlet components", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const navbarElement = screen.getByText(/Space Travelers' Hub/i);
  expect(navbarElement).toBeInTheDocument();
});
