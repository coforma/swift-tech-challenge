import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { CollegeType } from "@/src/app/types";
import Home from "../../../page";

jest.mock("../../../utils/institutions", () => ({
  getInstitutions: jest.fn().mockReturnValue([
    {
      id: 123456,
      img: "",
      name: "Test Institute of Technology",
      city: "Edtown",
      state: "AZ",
      description: "Description of university",
      type: CollegeType.PUBLIC,
      populationAmount: 0,
      gradRate: "0.4784",
      avgCost: "5687.0",
    },
  ]),
}));

describe("Test Homepage", () => {
  test("Check that page renders", async () => {
    render(await Home());
    expect(screen.getByText("Browse Schools")).toBeVisible();
  });
});

describe("Test Homepage accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(await Home());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
