import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SoftwareTierMatrix from "./SoftwareTierMatrix";

describe("SoftwareTierMatrix", () => {
  it("renders Tier & Category selectors", () => {
    render(<SoftwareTierMatrix />);
    expect(screen.getByLabelText(/Tiers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categories/i)).toBeInTheDocument();
  });

  it("adds a new vendor", () => {
    render(<SoftwareTierMatrix />);
    const input = screen.getByPlaceholderText("New Vendor");
    const btn = screen.getByRole("button", { name: /Add Vendor/i });
    fireEvent.change(input, { target: { value: "Vendor X" } });
    fireEvent.click(btn);
    expect(screen.getByText("Vendor X")).toBeInTheDocument();
  });
});
