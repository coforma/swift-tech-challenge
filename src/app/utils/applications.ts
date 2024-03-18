"use server";

import dynamoClient from "./libs/dynamodb-lib";

export interface Application {
  answers: object;
  email: string;
  questions: object;
  institution: string;
}

const APPLICANTS_TABLE_NAME = "applicants";

export async function saveApplication(submission: Application) {
  const params = {
    TableName: APPLICANTS_TABLE_NAME,
    Item: {
      email: submission.email,
      recordType: `application - ${submission.institution}`,
      questions: submission.questions,
      answers: submission.answers,
    },
  };
  await dynamoClient.put(params);
}
