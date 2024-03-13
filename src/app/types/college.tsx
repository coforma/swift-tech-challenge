export enum CollegeType {
  PUBLIC = "Public",
  PRIVATE_NP = "Private Nonprofit",
  PRIVATE_FP = "Private For-profit",
}

export interface College {
  id: number;
  img: string;
  name: string;
  city: string;
  state: string;
  description: string;
  type: CollegeType | null;
  populationAmount: number;
  gradRate: number;
  avgCost: number;
}
