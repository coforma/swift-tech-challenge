import { College, FilterRangeShape, FilterShape } from "../types";

export const filterInstitutions = (
  instArr: College[],
  filters: FilterShape,
) => {
  let filteredArr = instArr;
  // filter by state
  if (filters["filter-state"] !== "- Select -") {
    filteredArr = filteredArr.filter(
      (el: College) => el.state === filters["filter-state"],
    );
  }
  // filter by institution type
  if (filters["filter-type"]) {
    filteredArr = filteredArr.filter((el: College) =>
      filters["filter-type"].includes(el.type),
    );
  }

  // filter by undergrad population range
  if (filters["filter-undergrad-pop"]) {
    const filterRanges = createFilterRanges(
      filters["filter-undergrad-pop"],
      populationMap,
    );
    filteredArr = filteredArr.filter((el: College) =>
      filterByRange(filterRanges, el.population),
    );
  }
  // filter by average cost range
  if (filters["filter-avg-cost-per-year"]) {
    const filterRanges = createFilterRanges(
      filters["filter-avg-cost-per-year"],
      costMap,
    );
    filteredArr = filteredArr.filter((el: College) =>
      filterByRange(filterRanges, el.avgCost),
    );
  }
  // filter by completion rate range
  if (filters["filter-grad-rate"]) {
    const filterRanges = createFilterRanges(
      filters["filter-grad-rate"],
      gradRateMap,
    );
    filteredArr = filteredArr.filter((el: College) =>
      filterByRange(filterRanges, el.completionRate),
    );
  }
  return filteredArr;
};

const createFilterRanges = (
  selectedRanges: string[],
  filterMap: { [key: string]: FilterRangeShape },
) => {
  let filterRanges: number[][] = [];
  selectedRanges.forEach((range: string) => {
    const { lower, upper } = filterMap[range as keyof typeof filterMap];
    filterRanges.push([lower, upper]);
  });
  return filterRanges;
};

const filterByRange = (filterRanges: number[][], value?: number) =>
  filterRanges.some((range: number[]) => {
    const [lower, upper] = range;
    return value && value >= lower && value < upper;
  });

const populationMap: { [key: string]: FilterRangeShape } = {
  "<2": {
    lower: 0,
    upper: 2000,
  },
  "2-5": {
    lower: 2000,
    upper: 5000,
  },
  "5-10": {
    lower: 5000,
    upper: 10000,
  },
  "10-20": {
    lower: 10000,
    upper: 20000,
  },
  ">20": {
    lower: 20000,
    upper: 150000,
  },
};

const costMap: { [key: string]: FilterRangeShape } = {
  "<10$": {
    lower: 0,
    upper: 10000,
  },
  "10-20$": {
    lower: 10000,
    upper: 20000,
  },
  "20-40$": {
    lower: 20000,
    upper: 40000,
  },
  "40-60$": {
    lower: 40000,
    upper: 60000,
  },
  ">60$": {
    lower: 60000,
    upper: 100000,
  },
};

const gradRateMap: { [key: string]: FilterRangeShape } = {
  "<30": {
    lower: 0,
    upper: 0.3,
  },
  "30-60": {
    lower: 0.3,
    upper: 0.6,
  },
  "60-90": {
    lower: 0.6,
    upper: 0.9,
  },
  ">90": {
    lower: 0.9,
    upper: 1,
  },
};
