import { CardIcon } from "@/src/app/components";
import { render, screen } from "@testing-library/react";

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