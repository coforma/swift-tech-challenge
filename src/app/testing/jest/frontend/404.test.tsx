import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import NotFound from "@/src/app/not-found";
import { act } from "react-dom/test-utils";

const notFound = <NotFound />;

describe("Test NotFound Page", () => {
  test("Check that page renders", () => {
    render(notFound);
    expect(screen.getByText("Page not found")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Visit homepage" }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Contact us" })).toHaveAttribute(
      "href",
      "#",
    );
    expect(
      screen.getByRole("link", { name: "Start a live chat with us" }),
    ).toHaveAttribute("href", "#");
    expect(
      screen.getByRole("link", { name: "(555) 555-GOVT" }),
    ).toHaveAttribute("href", "tel:555-555-GOVT");
  });
});

describe("Test NotFound accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(notFound);
    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
