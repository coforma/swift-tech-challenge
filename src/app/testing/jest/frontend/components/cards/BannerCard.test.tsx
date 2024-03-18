import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { axe } from "jest-axe";
// components
import { BannerCard } from "@/src/app/components";
import { mockCollege } from "../../../setupJest";
// utils
import {
  maskCurrency,
  maskPercentage,
  maskThousands,
} from "@/src/app/utils/masking";

jest.mock("mixpanel-browser", () => ({
  ...jest.requireActual("mixpanel-browser"),
  track: jest.fn(() => {}),
}));

const component = (
  <ul>
    <BannerCard college={mockCollege} />
  </ul>
);

describe("Test BannerCard", () => {
  beforeEach(() => {
    render(component);
  });

  test("BannerCard is showing all details of college", () => {
    expect(screen.getByText(mockCollege.name)).toBeVisible();
    expect(screen.getByText(mockCollege.description)).toBeVisible();
    expect(
      screen.getByText(`${mockCollege.city}, ${mockCollege.state}`),
    ).toBeVisible();
    expect(screen.getByText(mockCollege.type)).toBeVisible();
    expect(
      screen.getByText(maskThousands(mockCollege.population)),
    ).toBeVisible();
    expect(
      screen.getByText(`${maskPercentage(mockCollege.completionRate!)}`),
    ).toBeVisible();
    expect(screen.getByText(maskCurrency(mockCollege.avgCost))).toBeVisible();
  });
});

describe("Test BannerCard accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(component);
    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
