import { filterInstitutions } from "@/src/app/utils/filtering";
import { mockCollege } from "@/src/app/testing/jest/setupJest";
// types
import { CollegeType, FilterShape } from "@/src/app/types";

const mockCollegeArray = [
  mockCollege,
  {
    ...mockCollege,
    type: CollegeType.PRIVATE_FP,
  },
];

// filter to only Public institutions
const filterCriteria: FilterShape = {
  "filter-type": ["Public"],
  "filter-undergrad-pop": ["<2", "2-5", "5-10", "10-20", ">20"],
  "filter-avg-cost-per-year": ["<10$", "10-20$", "20-40$", "40-60$", ">60$"],
  "filter-state": "- Select -",
  "filter-grad-rate": [">90", "60-90", "30-60", "<30"],
};

describe("test filterInstitutions", () => {
  it("returns institutions matching filter criteria", () => {
    const filterResult = filterInstitutions(mockCollegeArray, filterCriteria);
    expect(mockCollegeArray.length).toBe(2);
    expect(filterResult.length).toBe(1);
  });
});
