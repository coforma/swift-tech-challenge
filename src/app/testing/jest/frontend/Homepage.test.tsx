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
  get20Institutions: jest.fn().mockResolvedValue({
    colleges: [
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
    ],
    lastKey: 123,
  }),
}));

describe("Test Homepage", () => {
  test("Check that page renders", async () => {
    await act(async () => {
      await render(await Home());
    });
    expect(screen.queryAllByText("Browse colleges")[0]).toBeVisible();
  });
});

describe("Test Homepage accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    await act(async () => {
      const { container } = await render(await Home());
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
