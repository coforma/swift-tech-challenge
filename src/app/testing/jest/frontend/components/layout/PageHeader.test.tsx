import { PageHeader } from "@/src/app/components";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { act } from "react-dom/test-utils";

const component = <PageHeader />;

describe("Test Header", () => {
  beforeEach(() => {
    render(component);
  });

  test("Header is visible", () => {
    const header = screen.getByRole("navigation");
    expect(header).toBeVisible();
  });

  test("Title is visible", () => {
    expect(screen.getByText("U.S. College Finder")).toBeVisible();
  });
});

describe("Test Header accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(component);
    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
