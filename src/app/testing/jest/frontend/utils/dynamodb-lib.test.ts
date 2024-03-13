import dynamoLib from "../../../../utils/dynamodb-lib";
import {
  GetCommand,
  DynamoDBDocumentClient,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";

const dynamoClientMock = mockClient(DynamoDBDocumentClient);

describe("Test DynamoDB lib", () => {
  beforeEach(() => {
    dynamoClientMock.reset();
  });
  test("Can get", async () => {
    const mockGet = jest.fn();
    dynamoClientMock.on(GetCommand).callsFake(mockGet);

    await dynamoLib.get({ TableName: "foos", Key: { id: "foo1" } });

    expect(mockGet).toHaveBeenCalled();
  });

  test("Can perform a single scan", async () => {
    const mockItem = { foo: "bar" };
    dynamoClientMock.on(ScanCommand).resolves({ Items: [mockItem] });

    const result = await dynamoLib.singleScan({ TableName: "foos" });

    expect(result.Items?.[0]).toBe(mockItem);
  });
});
