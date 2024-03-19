import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { CollegeType } from "@/src/app/types";
import Home from "../../../page";
import { act } from "react-dom/test-utils";

jest.mock("../../../utils/institutions", () => ({
  getInstitutions: jest.fn().mockReturnValue([
    {
      id: 123456,
      img: "",
      name: "Test College",
      city: "Edtown",
      state: "AZ",
      description: "Description of college",
      type: CollegeType.PUBLIC,
      population: 0,
      completionRate: "0.4784",
      avgCost: "5687.0",
    },
  ]),
}));

describe("Test Homepage", () => {
  test("Check that page renders", async () => {
    render(await Home());
    expect(screen.queryAllByText("Browse colleges").length).toBe(0);
    expect(screen.getByTitle("spinner")).toBeVisible();
  });
});

describe("Test Homepage accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(await Home());
    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
