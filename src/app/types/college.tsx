export enum CollegeType {
  PUBLIC = "Public",
  PRIVATE_NP = "Private nonprofit",
  PRIVATE_FP = "Private for-profit",
}

export const degreeMap = {
  "1": "Certificate",
  "2": "Associate's",
  "3": "Bachelor's",
  "4": "Graduate",
};

export interface College {
  // basics
  id: number;
  name: string;
  city: string;
  state: string;
  zip: string;
  url: string;
  type: CollegeType;
  description: string;
  // focus
  predominantUndergradDegree: string;
  highestDegreeAwarded: string;
  specialties?: {
    humanities: boolean;
    interdisciplinary: boolean;
    occupational: boolean;
    socialScience: boolean;
    stem: boolean;
  };
  // enrollment
  population?: number;
  demographics?: {
    percentAian: number;
    percentAsian: number;
    percentBlack: number;
    percentHispanic: number;
    percentNhpi: number;
    percentNonResidentAlien: number;
    percentTwoOrMore: number;
    percentUnknownRace: number;
    percentWhite: number;
  };
  // admissions
  admissionRate?: number;
  satScores?: {
    satAverageScore: number;
    satMathPercentile25: number;
    satMathPercentile50: number;
    satMathPercentile75: number;
    satReadingPercentile25: number;
    satReadingPercentile50: number;
    satReadingPercentile75: number;
    satWritingPercentile25: number;
    satWritingPercentile50: number;
    satWritingPercentile75: number;
  };
  // cost
  avgCost?: number;
  tuitionInState?: number;
  tuitionOutOfState?: number;
  undergradWithFedLoan?: number;
  npcUrl?: string;
  netPricePublic?: {
    averagePrice: number;
    averagePriceUnder30k: number;
    averagePriceUnder30To48k: number;
    averagePriceUnder48To75k: number;
    averagePriceUnder75To110k: number;
    averagePriceUnder110kPlus: number;
  };
  netPricePrivate?: {
    averagePrice: number;
    averagePriceUnder30k: number;
    averagePriceUnder30To48k: number;
    averagePriceUnder48To75k: number;
    averagePriceUnder75To110k: number;
    averagePriceUnder110kPlus: number;
  };
  // faculty & expenditures
  facultyAvgSalary?: number;
  facultyEmployedFullTime?: number;
  studentFacultyRatio?: number;
  instructionalExpPerStudent?: number;
  // outcomes
  completionRate?: number;
  // awardIn8Yrs: number; TODO: Get after data ingestion update
  earnings?: {
    meanGraduateEarnings10Years: number;
    medianGraduateEarnings10Years: number;
  };
  retentionRate?: number;
}
