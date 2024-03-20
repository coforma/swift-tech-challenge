"use server";
import dynamoClient from "./libs/dynamodb-lib";
import { parallelScan } from "@shelf/dynamodb-parallel-scan";
// types
import { College, degreeMap } from "../types";

const INSTITUTIONS_TABLE_NAME = "institutions";
const scanConcurrency = 12;

export async function getInstitutions() {
  let colleges: College[] = [];
  const params = {
    TableName: INSTITUTIONS_TABLE_NAME,
    FilterExpression: "recordType = :recordType",
    ExpressionAttributeValues: { ":recordType": "data" },
  };
  const items = await parallelScan(params, { concurrency: scanConcurrency });
  if (Array.isArray(items)) {
    for (const item of items) {
      const college: College = {
        // basics
        id: item?.institutionId,
        name: item?.institutionName,
        city: item?.city,
        state: item?.state,
        zip: item?.zip,
        url: item?.url,
        type: item?.institutionType,
        description: item?.description,
        // focus
        predominantUndergradDegree: mapToDegreeString(
          item?.predominantUndergradDegree,
        ),
        highestDegreeAwarded: mapToDegreeString(item?.highestDegreeAwarded),
        specialties: convertStringToBoolObject(item?.specialties),
        // enrollment
        population: parseInt(item?.studentPopulation),
        demographics: convertFloatToObject(item?.raceDemographics),
        // admissions
        admissionRate: parseFloat(item?.admissionRate),
        satScores: convertIntToObject(item?.satScores),
        // cost
        avgCost: parseInt(item?.averageAttendanceCost),
        tuitionInState: parseInt(item?.tuitionInState),
        tuitionOutOfState: parseInt(item?.tuitionOutOfState),
        undergradWithFedLoan: parseFloat(item?.percentUndergradWithLoan),
        npcUrl: item?.netPriceCalculatorUrl,
        netPricePublic: convertIntToObject(item?.publicNetPrice),
        netPricePrivate: convertIntToObject(item?.netPricePrivate),
        // faculty & expenditures
        facultyAvgSalary: parseInt(item?.facultyAverageSalary),
        facultyEmployedFullTime: parseFloat(
          item?.facultyPercentageEmployedFull,
        ),
        studentFacultyRatio: parseInt(item?.studentToFacultyRatio),
        instructionalExpPerStudent: parseInt(
          item?.instructionalExpenditurePerSt,
        ),
        // outcomes
        completionRate: parseFloat(
          item?.completionRates.fourYearInstitution ||
            item?.completionRates.underFourYearInstitution,
        ),
        // awardIn8Yrs: "", TODO: Get after data ingestion update
        earnings: convertIntToObject(item?.earnings),
        retentionRate: parseFloat(
          item?.retentionRate.fourYearInstitution ||
            item?.retentionRate.underFourYearInstitution,
        ),
      };
      colleges.push(college);
    }
  }

  /*
   * Sort colleges by name in alpha order, could optimize but inserting
   * in sorted order if performance becomes an issue
   */
  colleges.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
  );
  return colleges;
}

// TODO: Add tests for utility methods here
const mapToDegreeString = (key: number | string) =>
  degreeMap[key as keyof typeof degreeMap];

const convertStringToBoolObject: any = (obj: { [key: string]: string }) => {
  if (obj) {
    return Object.fromEntries(
      Object.keys(obj).map((el) => [el, obj[el] === "True"]),
    );
  } else return undefined;
};

const convertFloatToObject: any = (obj: { [key: string]: any }) => {
  if (obj) {
    return Object.fromEntries(
      Object.keys(obj).map((el) => [el, parseFloat(obj[el])]),
    );
  } else return undefined;
};

const convertIntToObject: any = (obj: { [key: string]: any }) => {
  if (obj) {
    return Object.fromEntries(
      Object.keys(obj).map((el) => [el, parseFloat(obj[el])]),
    );
  } else return undefined;
};

export async function getInstitutionApplication(institutionId: Number) {
  const params = {
    TableName: INSTITUTIONS_TABLE_NAME,
    Key: { institutionId: institutionId, recordType: "application" },
  };
  const result = await dynamoClient.get(params);
  return result?.Item;
}
