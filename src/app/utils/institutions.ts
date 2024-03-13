import dynamoClient from "./libs/dynamodb-lib";
// types
import { College, CollegeType } from "../types";

const INSTITUTIONS_TABLE_NAME = "institutions";

export async function getInstitutions() {
  let colleges: College[] = [];
  const params = {
    TableName: INSTITUTIONS_TABLE_NAME,
    FilterExpression: "recordType = :recordType",
    ExpressionAttributeValues: { ":recordType": "data" },
    Limit: 4,
  };
  const result = await dynamoClient.singleScan(params);
  const items = result?.Items;

  items?.forEach((item) => {
    const college: College = {
      id: item?.institutionId,
      img: "",
      name: item?.institutionName,
      city: item?.city,
      state: item?.state,
      description: item?.description,
      type: mapControlToCollegeType(item?.control),
      populationAmount: 0,
      gradRate: item?.completionRates.fourYearInstitution,
      avgCost: item?.publicNetPrice.averagePrice,
    };
    colleges.push(college);
  });

  return colleges;
}

// maps control value from dataset to college type
function mapControlToCollegeType(controlValue: string) {
  switch (controlValue) {
    case "1":
      return CollegeType.PUBLIC;
    case "2":
      return CollegeType.PRIVATE_NP;
    case "3":
      return CollegeType.PRIVATE_FP;
  }
  return null;
}
