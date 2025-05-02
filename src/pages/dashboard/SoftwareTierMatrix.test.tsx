import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SoftwareTierMatrix from "./SoftwareTierMatrix";
import { BrowserRouter } from "react-router-dom";

describe("SoftwareTierMatrix", () => {
  it("renders Tier & Category selectors", () => {
    render(
      <BrowserRouter>
        <SoftwareTierMatrix />
      </BrowserRouter>
    );
    expect(screen.getByLabelText("Number of Tiers")).toBeInTheDocument();
    expect(screen.getByLabelText("Number of Categories")).toBeInTheDocument();
  });

  it("adds a new vendor", () => {
    render(
      <BrowserRouter>
        <SoftwareTierMatrix />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText("Enter vendor name");
    const btn = screen.getByRole("button", { name: /Add Vendor/i });
    fireEvent.change(input, { target: { value: "Vendor X" } });
    fireEvent.click(btn);
    expect(screen.getByText("Vendor X")).toBeInTheDocument();
  });
});
