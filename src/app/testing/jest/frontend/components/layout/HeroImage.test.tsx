import { HeroImage } from "@/src/app/components";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

const component = <HeroImage />;

describe("Test HeroImage", () => {
  beforeEach(() => {
    render(component);
  });

  test("HeroImage is visible", () => {
    const header = screen.getByText("Find your dream school today");
    expect(header).toBeVisible();

    const image = screen.getByAltText("Hero image");
    expect(image).toBeVisible();
  });
});

describe("Test HeroImage accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(component);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
