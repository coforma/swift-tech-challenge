import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const AmazonDaxClient = require("amazon-dax-client"); // tslint:disable-line
import {
  GetCommand,
  GetCommandInput,
  DynamoDBDocumentClient,
  ScanCommand,
  ScanCommandInput,
  PutCommandInput,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const awsConfig = {
  region: "us-east-1",
};

const ddbClient = DynamoDBDocumentClient.from(new DynamoDBClient(awsConfig));
var daxClient = null;

if (process.env.DAX_ENDPOINT) {
  var dax = new AmazonDaxClient({
    endpoints: [process.env.DAX_ENDPOINT],
    region: "us-east-1",
  });
  daxClient = DynamoDBDocumentClient.from(dax);
  // eslint-disable-next-line no-console
  console.log("using DAX!!");
}

var client = daxClient != null ? daxClient : ddbClient;

const dynamoClient = {
  get: async function (params: GetCommandInput) {
    return await client.send(new GetCommand(params));
  },
  put: async (params: PutCommandInput) =>
    await client.send(new PutCommand(params)),
  scanAll: async function (params: ScanCommandInput) {
    let items: any[] = [];
    let ExclusiveStartKey: any;
    // eslint-disable-next-line no-console
    console.log("Called scan all!!");
    do {
      const command = new ScanCommand({ ...params, ExclusiveStartKey });
      const result = await client.send(command);
      items = items.concat(result.Items ?? []);
      ExclusiveStartKey = result.LastEvaluatedKey;
    } while (ExclusiveStartKey);

    return items;
  },
};

export default dynamoClient;
