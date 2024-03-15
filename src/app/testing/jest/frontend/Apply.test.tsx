import Page from "@/src/app/apply/[id]/page";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

const Apply = Page({ params: { id: "123" } });

describe("Test Homepage", () => {
  it("should render the application page", async () => {
    render(await Apply);
    expect(
      screen.getByText("California State University-Northridge"),
    ).toBeVisible();
  });
});

describe("Test Homepage accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = await render(Apply);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
