import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  GetCommandInput,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const localConfig = {
  endpoint: process.env.LOCAL_DYNAMODB_URL,
  region: "localhost",
  credentials: {
    accessKeyId: "LOCALFAKEKEY", // pragma: allowlist secret
    secretAccessKey: "LOCALFAKESECRET", // pragma: allowlist secret
  },
};

const awsConfig = {
  region: "us-east-1",
};

export function getConfig() {
  return process.env.LOCAL_DYNAMODB_URL ? localConfig : awsConfig;
}

const client = DynamoDBDocumentClient.from(new DynamoDBClient(getConfig()));

const dynamoClient = {
  get: async function (params: GetCommandInput) {
    return await client.send(new GetCommand(params));
  },
};

export default dynamoClient;
