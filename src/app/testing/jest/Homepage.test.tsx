import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import Home from "../../page";

const homepage = <Home />;

describe("Test Homepage", () => {
  test("Check that page renders", () => {
    render(homepage);
    expect(screen.getByText("App running successfully")).toBeVisible();
  });
});

describe("Test Homepage accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(homepage);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
