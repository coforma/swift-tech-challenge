import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { axe } from "jest-axe";
// components
import { DetailsCards } from "@/src/app/components";
import { mockCollege } from "../../../setupJest";
// utils

jest.mock("mixpanel-browser", () => ({
  ...jest.requireActual("mixpanel-browser"),
  track: jest.fn(() => {}),
}));

const allDataAvailableDetailsCards = (
  <ul>
    <DetailsCards college={mockCollege} />
  </ul>
);

const noAvgPrice = {
  ...mockCollege,
  netPricePublic: undefined,
  netPricePrivate: undefined,
};

const NoAvgPriceDetailsCards = (
  <ul>
    <DetailsCards college={noAvgPrice} />
  </ul>
);

describe("Test DetailsCard", () => {
  test("DetailsCards are showing all 5 sections", () => {
    render(allDataAvailableDetailsCards);
    expect(screen.getByText("Outcomes")).toBeVisible();
    expect(screen.getByText("Admissions")).toBeVisible();
    expect(screen.getByText("Student body")).toBeVisible();
    expect(screen.getByText("Academics")).toBeVisible();
    expect(screen.getByText("Costs")).toBeVisible();
  });

  test("DetailsCards doesn't show average price table if not available", () => {
    render(NoAvgPriceDetailsCards);
    expect(
      screen.queryByText("Average net price by household income"),
    ).toBeFalsy();
  });
});

describe("Test DetailsCards accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(allDataAvailableDetailsCards);
    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it("Should not have basic accessibility issues if not showing average price", async () => {
    const { container } = render(NoAvgPriceDetailsCards);
    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
