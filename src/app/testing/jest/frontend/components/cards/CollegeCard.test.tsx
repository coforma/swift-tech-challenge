import { render, screen } from "@testing-library/react";
import mixpanel from "mixpanel-browser";
import { College, CollegeType } from "@/src/app/types";
import { CollegeCard } from "@/src/app/components";
import { mockCollege } from "../../../setupJest";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { axe } from "jest-axe";
import {
  convertPercentage,
  convertToThousandsSeparatedString,
} from "@/src/app/utils/masking";

const college: College = {
  id: 0,
  img: "",
  name: "Name of school",
  description: "School Description",
  city: "City",
  state: "State",
  type: CollegeType.PUBLIC,
  population: 123,
  completionRate: 0.65,
  avgCost: 17980,
  zip: "",
  url: "",
  predominantUndergradDegree: "",
  highestDegreeAwarded: "",
};
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
    render(component);
  });

  test("CollegeCard is showing all details of college", () => {
    expect(screen.getByText(college.name)).toBeVisible();
    expect(screen.getByText(college.description)).toBeVisible();
    expect(screen.getByText(`${college.city}, ${college.state}`)).toBeVisible();
    expect(screen.getByText(college.type)).toBeVisible();
    expect(screen.getByText(college.population!)).toBeVisible();
    expect(
      screen.getByText(`${convertPercentage(college.completionRate!)} %`),
    ).toBeVisible();
    expect(
      screen.getByText(
        `$${convertToThousandsSeparatedString(college.avgCost!)}`,
      ),
    ).toBeVisible();
  });

  test("CollegeCard should have apply button", () => {
    expect(screen.getByRole("button", { name: /apply/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /apply/i })).toHaveTextContent(
      "Apply",
    );
  });

  test("On click, apply button fires tracking event", async () => {
    const mixpanelTrackSpy = jest.spyOn(mixpanel, "track");
    const applyButton = screen.getByRole("button", { name: /apply/i });
    expect(applyButton).toBeVisible();
    await act(async () => {
      await userEvent.click(applyButton);
    });
    expect(mixpanelTrackSpy).toHaveBeenCalledTimes(1);
  });
});

describe("Test CollegeCard accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(component);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
