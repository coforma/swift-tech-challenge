export enum CollegeType {
  PUBLIC = "Public",
  PRIVATE = "Private",
}

export interface College {
  id: number;
  img: string;
  name: string;
  city: string;
  state: string;
  description?: string;
  type: CollegeType;
  populationAmount: number;
  gradRate: number;
  avgCost: number;
}
