import { PageFooter } from "@/src/app/components";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { act } from "react-dom/test-utils";

const component = <PageFooter />;

describe("Test Footer", () => {
  beforeEach(() => {
    render(component);
  });

  test("Header is visible", () => {
    const header = screen.getByText(
      "An official website of the Department of Higher Ed",
    );
    expect(header).toBeVisible();
  });
});

describe("Test Footer accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(component);
    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
