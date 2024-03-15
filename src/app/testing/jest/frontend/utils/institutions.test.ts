import { CollegeType } from "@/src/app/types";
import { getInstitutions } from "@/src/app/utils/institutions";
import s3Lib from "@/src/app/utils/libs/s3-lib";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import { mockCollegeDbItem } from "../../setupJest";

const dynamoClientMock = mockClient(DynamoDBDocumentClient);

describe("test institutions utils", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    dynamoClientMock.reset();
    jest.spyOn(s3Lib, "get").mockResolvedValueOnce("superlongbase64string");
  });
  test("test getInstitutions", async () => {
    dynamoClientMock.on(ScanCommand).resolves({ Items: [mockCollegeDbItem] });
    const result = await getInstitutions();
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(123456);
    expect(result[0].name).toBe("Test College");
    expect(result[0].type).toBe(CollegeType.PUBLIC);
  });

  test("test getInstitutions returns empty array if no items found", async () => {
    dynamoClientMock.on(ScanCommand).resolves({});
    const result = await getInstitutions();
    expect(result.length).toBe(0);
  });
});
