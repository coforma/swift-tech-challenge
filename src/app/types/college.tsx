export enum CollegeType {
  PUBLIC = "Public",
  PRIVATE_NP = "Private nonprofit",
  PRIVATE_FP = "Private for-profit",
}

export interface College {
  id: number;
  name: string;
  city: string;
  state: string;
  description: string;
  type: CollegeType;
  populationAmount: number;
  gradRate: number;
  avgCost: number;
}
