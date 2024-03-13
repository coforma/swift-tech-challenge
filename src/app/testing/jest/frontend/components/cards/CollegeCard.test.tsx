import { render, screen } from "@testing-library/react";
import { College, CollegeType } from "@/src/app/types";
import { CollegeCard } from "@/src/app/components";

const college: College = {
  id: 0,
  img: "",
  name: "Name of school",
  description: "School Description",
  city: "City",
  state: "State",
  type: CollegeType.PUBLIC,
  populationAmount: 123,
  gradRate: 65,
  avgCost: 17980,
};

const component = <CollegeCard college={college} />;

describe("Test CollegeCard", () => {
  beforeEach(() => {
    render(component);
  });

  test("CollegeCard is showing all details of college", () => {
    expect(screen.getByText(college.name)).toBeVisible();
    expect(screen.getByText(college.description)).toBeVisible();
    expect(screen.getByText(`${college.city}, ${college.state}`)).toBeVisible();
    expect(screen.getByText(college.type)).toBeVisible();
    expect(screen.getByText(college.populationAmount)).toBeVisible();
    expect(screen.getByText(college.gradRate)).toBeVisible();
    expect(screen.getByText(college.avgCost)).toBeVisible();
  });

  test("CollegeCard should have apply button", () => {
    expect(screen.getByRole("button", { name: /apply/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /apply/i })).toHaveTextContent(
      "Apply to this school",
    );
  });

  test("CollegeCard button group should have one button", () => {
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});
