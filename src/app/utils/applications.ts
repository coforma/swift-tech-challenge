import dynamoClient from "./libs/dynamodb-lib";

export interface Application {
  questions: object;
  answers: object;
}

const APPLICANTS_TABLE_NAME = "applicants";

export async function saveApplication(submission: Application) {
  const params = {
    TableName: APPLICANTS_TABLE_NAME,
    Item: {
      email: "",
      recordType: "application",
      questions: submission.questions,
      answers: submission.answers,
    },
  };
  await dynamoClient.put(params);
}
