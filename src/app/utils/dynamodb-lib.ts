import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  GetCommandInput,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const awsConfig = {
  region: "us-east-1",
};

const client = DynamoDBDocumentClient.from(new DynamoDBClient(awsConfig));

const dynamoClient = {
  get: async function (params: GetCommandInput) {
    return await client.send(new GetCommand(params));
  },
};

export default dynamoClient;
