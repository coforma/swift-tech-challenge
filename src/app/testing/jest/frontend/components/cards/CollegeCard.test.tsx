import { render, screen } from "@testing-library/react";
import mixpanel from "mixpanel-browser";
import { CollegeCard } from "@/src/app/components";
import { mockCollege } from "../../../setupJest";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { axe } from "jest-axe";
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
    <CollegeCard college={mockCollege} />
  </ul>
);

describe("Test CollegeCard", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    render(component);
  });

  test("CollegeCard is showing all details of college", () => {
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

  test("CollegeCard should have apply link", () => {
    expect(screen.getByRole("link", { name: /apply/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /apply/i })).toHaveTextContent(
      "Apply",
    );
  });

  test("On click, apply link fires tracking event", async () => {
    const mixpanelTrackSpy = jest.spyOn(mixpanel, "track");
    const applyButton = screen.getByRole("link", { name: /apply/i });
    expect(applyButton).toBeVisible();
    await userEvent.click(applyButton);
    expect(mixpanelTrackSpy).toHaveBeenCalledTimes(1);
  });

  test("On click, view more link fires tracking event", async () => {
    const mixpanelTrackSpy = jest.spyOn(mixpanel, "track");
    const viewMoreButton = screen.getByRole("link", { name: /View more/i });
    expect(viewMoreButton).toBeVisible();
    await userEvent.click(viewMoreButton);
    expect(mixpanelTrackSpy).toHaveBeenCalledTimes(1);
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
