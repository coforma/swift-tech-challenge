import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { PageHeader } from "../../../components";

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
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
