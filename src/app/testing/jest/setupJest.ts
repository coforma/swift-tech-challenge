import "@testing-library/jest-dom";
import "jest-axe/extend-expect";

import { College, CollegeType } from "@/src/app/types";

export const mockCollege: College = {
  id: 0,
  name: "Name of school",
  city: "City",
  state: "State",
  zip: "00000",
  url: "/image",
  type: CollegeType.PUBLIC,
  description: "School Description",
  img: "",
  predominantUndergradDegree: "",
  highestDegreeAwarded: "",
  specialties: {
    humanities: true,
    interdisciplinary: true,
    occupational: true,
    socialScience: true,
    stem: true,
  },
  population: 123,
  demographics: {
    percentAian: 0.125,
    percentAsian: 0.125,
    percentBlack: 0.125,
    percentHispanic: 0.125,
    percentNhpi: 0.125,
    percentNonResidentAlien: 0.125,
    percentTwoOrMore: 0.125,
    percentUnknownRace: 0.125,
    percentWhite: 0.125,
  },
  admissionRate: 0.125,
  satScores: {
    satAverageScore: 800,
    satMathPercentile25: 800,
    satMathPercentile50: 800,
    satMathPercentile75: 800,
    satReadingPercentile25: 800,
    satReadingPercentile50: 800,
    satReadingPercentile75: 800,
    satWritingPercentile25: 800,
    satWritingPercentile50: 800,
    satWritingPercentile75: 800,
  },
  // cost
  avgCost: 23171,
  tuitionInState: 20000,
  tuitionOutOfState: 30000,
  undergradWithFedLoan: 0.125,
  npcUrl: "npcurl",
  netPricePublic: {
    averagePrice: 20000,
    averagePriceUnder30k: 20000,
    averagePriceUnder30To48k: 20000,
    averagePriceUnder48To75k: 20000,
    averagePriceUnder75To110k: 20000,
    averagePriceUnder110kPlus: 20000,
  },
  netPricePrivate: {
    averagePrice: NaN,
    averagePriceUnder30k: NaN,
    averagePriceUnder30To48k: NaN,
    averagePriceUnder48To75k: NaN,
    averagePriceUnder75To110k: NaN,
    averagePriceUnder110kPlus: NaN,
  },
  // faculty & expenditures
  facultyAvgSalary: 50000,
  facultyEmployedFullTime: 0.125,
  studentFacultyRatio: 20,
  instructionalExpPerStudent: 3000,
  // outcomes
  completionRate: 0.125,
  earnings: {
    meanGraduateEarnings10Years: 50000,
    medianGraduateEarnings10Years: 50000,
  },
  retentionRate: 0.125,
};

export const mockCollegeDbItemTwo = {
  institutionId: 122456,
  institutionName: " A University of College",
  city: "Beanington",
  state: "KY",
  description: "Description of description",
  completionRates: { fourYearInstitution: "0.4784" },
  averageAttendanceCost: "5687.0",
  institutionType: "Public",
  studentPopulation: "99500",
};

export const mockCollegeDbItem = {
  institutionId: 123456,
  institutionName: "Test College",
  city: "Edtown",
  state: "AZ",
  zip: "00000",
  url: "/image",
  institutionType: "Public",
  description: "Description of college",
  img: "",
  predominantUndergradDegree: 3,
  highestDegreeAwarded: 4,
  specialties: {
    humanities: "True",
    interdisciplinary: "True",
    occupational: "True",
    socialScience: "True",
    stem: "True",
  },
  studentPopulation: "99500",
  raceDemographics: {
    percentAian: "0.125",
    percentAsian: "0.125",
    percentBlack: "0.125",
    percentHispanic: "0.125",
    percentNhpi: "0.125",
    percentNonResidentAlien: "0.125",
    percentTwoOrMore: "0.125",
    percentUnknownRace: "0.125",
    percentWhite: "0.125",
  },
  admissionRate: "0.125",
  satScores: {
    satAverageScore: "800",
    satMathPercentile25: "800",
    satMathPercentile50: "800",
    satMathPercentile75: "800",
    satReadingPercentile25: "800",
    satReadingPercentile50: "800",
    satReadingPercentile75: "800",
    satWritingPercentile25: "800",
    satWritingPercentile50: "800",
    satWritingPercentile75: "800",
  },
  // cost
  averageAttendanceCost: "5687.0",
  tuitionInState: "20000",
  tuitionOutOfState: "30000",
  percentUndergradWithLoan: "0.125",
  netPriceCalculatorUrl: "npcurl",
  publicNetPrice: {
    averagePrice: "20000",
    averagePriceUnder30k: "20000",
    averagePriceUnder30To48k: "20000",
    averagePriceUnder48To75k: "20000",
    averagePriceUnder75To110k: "20000",
    averagePriceUnder110kPlus: "20000",
  },
  netPricePrivate: {
    averagePrice: null,
    averagePriceUnder30k: null,
    averagePriceUnder30To48k: null,
    averagePriceUnder48To75k: null,
    averagePriceUnder75To110k: null,
    averagePriceUnder110kPlus: null,
  },
  // faculty & expenditures
  facultyAverageSalary: "50000",
  facultyPercentageEmployedFull: ".125",
  studentToFacultyRatio: "20",
  instructionalExpenditurePerSt: "3000",
  // outcomes
  completionRates: {
    fourYearInstitution: "0.125",
    underFourYearInstitution: null,
  },
  earnings: {
    meanGraduateEarnings10Years: "50000",
    medianGraduateEarnings10Years: "50000",
  },
  retentionRate: {
    fourYearInstitution: "0.125",
    underFourYearInstitution: null,
  },
};
