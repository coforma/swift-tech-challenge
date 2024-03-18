import { CardIcon } from "@/src/app/components";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { act } from "react-dom/test-utils";

const component = (
  <CardIcon
    subtitle={"Example Subtitle"}
    highlight={"Example Highlight"}
    icon="people"
  />
);

describe("Test CardIcon", () => {
  beforeEach(() => {
    render(component);
  });

  test("CardIcon icon is visible", () => {
    expect(screen.getByAltText("people icon")).toBeVisible();
  });

  test("CardIcon Subtitle is visible", () => {
    expect(screen.getByText("Example Subtitle")).toBeVisible();
  });

  test("CardIcon Highlight is visible", () => {
    expect(screen.getByText("Example Highlight")).toBeVisible();
  });
});

describe("Test CollegeCard accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(component);
    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
