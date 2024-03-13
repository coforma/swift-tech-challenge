import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { CardIcon } from "../../../../../components";

const component = (
  <CardIcon subtitle={"Example Subtitle"} highlight={"Example Highlight"} />
);

describe("Test CardIcon", () => {
  beforeEach(() => {
    render(component);
  });

  test("CardIcon Subtitle is visible", () => {
    expect(screen.getByText("Example Subtitle")).toBeVisible();
  });

  test("CardIcon Highlight is visible", () => {
    expect(screen.getByText("Example Highlight")).toBeVisible();
  });
});

describe("Test CardIcon accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(component);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
