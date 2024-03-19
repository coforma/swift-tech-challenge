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

export interface Specialties {
  humanities: boolean;
  interdisciplinary: boolean;
  occupational: boolean;
  socialScience: boolean;
  stem: boolean;
}

export interface netPrice {
  averagePrice: number;
  averagePriceUnder30k: number;
  averagePriceUnder30To48k: number;
  averagePriceUnder48To75k: number;
  averagePriceUnder75To110k: number;
  averagePriceUnder110kPlus: number;
}

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
  specialties?: Specialties;
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
  netPricePublic?: netPrice;
  netPricePrivate?: netPrice;
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

export enum States {
  AL = "Alabama",
  AS = "American Samoa",
  AK = "Alaska",
  AZ = "Arizona",
  AR = "Arkansas",
  CA = "California",
  CO = "Colorado",
  CT = "Connecticut",
  DE = "Delaware",
  DC = "District of Columbia",
  FL = "Florida",
  FM = "Micronesia (Federated States of)",
  GA = "Georgia",
  GU = "Guam",
  HI = "Hawaii",
  ID = "Idaho",
  IL = "Illinois",
  IN = "Indiana",
  IA = "Iowa",
  KS = "Kansas",
  KY = "Kentucky",
  LA = "Louisiana",
  ME = "Maine",
  MD = "Maryland",
  MA = "Massachusetts",
  MH = "Marshall Islands",
  MI = "Michigan",
  MN = "Minnesota",
  MP = "Northern Mariana Islands",
  MS = "Mississippi",
  MO = "Missouri",
  MT = "Montana",
  NE = "Nebraska",
  NV = "Nevada",
  NH = "New Hampshire",
  NJ = "New Jersey",
  NM = "New Mexico",
  NY = "New York",
  NC = "North Carolina",
  ND = "North Dakota",
  OH = "Ohio",
  OK = "Oklahoma",
  OR = "Oregon",
  PA = "Pennsylvania",
  PR = "Puerto Rico",
  RI = "Rhode Island",
  SC = "South Carolina",
  SD = "South Dakota",
  TN = "Tennessee",
  TX = "Texas",
  UT = "Utah",
  VI = "Virgin Islands",
  VT = "Vermont",
  VA = "Virginia",
  WA = "Washington",
  WV = "West Virginia",
  WI = "Wisconsin",
  WY = "Wyoming",
}

export const stateOptions = Object.keys(States)
  .map((value) => ({
    id: value,
    label: States[value as keyof typeof States],
  }))
  .sort((a: any, b: any) => (a.label > b.label ? 1 : -1));
