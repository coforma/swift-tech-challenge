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
    Limit: 10,
  };
  const result = await dynamoClient.singleScan(params);
  const items = result?.Items;

  items?.map((item) => {
    const college: College = {
      id: item?.institutionId,
      img: "",
      name: item?.institutionName,
      city: item?.city,
      state: item?.state,
      description: item?.description,
      type: CollegeType.PUBLIC,
      populationAmount: 0,
      gradRate: item?.completionRates.fourYearInstitution,
      avgCost: item?.publicNetPrice.averagePrice,
    };
    colleges.push(college);
  });

  return colleges;
}
