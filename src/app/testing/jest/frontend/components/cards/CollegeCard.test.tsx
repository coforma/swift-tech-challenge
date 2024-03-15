import { render, screen } from "@testing-library/react";
import mixpanel from "mixpanel-browser";
import { CollegeCard } from "@/src/app/components";
import { mockCollege } from "../../../setupJest";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { axe } from "jest-axe";

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
    expect(screen.getByText(mockCollege.name)).toBeVisible();
    expect(screen.getByText(mockCollege.description)).toBeVisible();
    expect(
      screen.getByText(`${mockCollege.city}, ${mockCollege.state}`),
    ).toBeVisible();
    expect(screen.getByText(mockCollege.type)).toBeVisible();
    expect(screen.getByText(mockCollege.population!)).toBeVisible();
    expect(screen.getByText(mockCollege.completionRate!)).toBeVisible();
    expect(screen.getByText(mockCollege.avgCost!)).toBeVisible();
  });

  test("CollegeCard should have apply button", () => {
    expect(screen.getByRole("button", { name: /apply/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /apply/i })).toHaveTextContent(
      "Apply to this school",
    );
  });

  test("On click, apply button fires tracking event", async () => {
    const mixpanelTrackSpy = jest.spyOn(mixpanel, "track");
    const applyButton = screen.getByRole("button", { name: /apply/i });
    expect(screen.getByRole("button", { name: /apply/i })).toBeVisible();
    await act(async () => {
      await userEvent.click(applyButton);
    });
    expect(mixpanelTrackSpy).toHaveBeenCalledTimes(1);
  });

  test("CollegeCard button group should have one button", () => {
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});

describe("Test CollegeCard accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(component);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
