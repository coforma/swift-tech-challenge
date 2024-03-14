import dynamoClient from "./libs/dynamodb-lib";
// types
import { College } from "../types";

const INSTITUTIONS_TABLE_NAME = "institutions";

export async function getInstitutions() {
  let colleges: College[] = [];
  const params = {
    TableName: INSTITUTIONS_TABLE_NAME,
    FilterExpression: "recordType = :recordType",
    ExpressionAttributeValues: { ":recordType": "data" },
    Limit: 12,
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
      type: item?.institutionType,
      populationAmount: item?.studentPopulation,
      gradRate: item?.completionRates.fourYearInstitution,
      avgCost: item?.averageAttendanceCost,
    };
    colleges.push(college);
  });

  /*
   * Sort colleges by name in alpha order, could optimize but inserting
   * in sorted order if performance becomes an issue
   */
  colleges.sort((a, b) => (a.name > b.name ? 1 : -1));
  return colleges;
}
