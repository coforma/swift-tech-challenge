import { CollegeType } from "@/src/app/types";
import {
  get20Institutions,
  getInstitutions,
} from "@/src/app/utils/institutions";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import {
  mockCollegeDbItem,
  mockCollegeDbItemTwo,
} from "@/src/app/testing/jest/setupJest";

const dynamoClientMock = mockClient(DynamoDBDocumentClient);

describe("test institutions utils", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    dynamoClientMock.reset();
  });
  test("test getInstitutions", async () => {
    dynamoClientMock.on(ScanCommand).resolves({ Items: [mockCollegeDbItem] });
    const result = await getInstitutions();
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(123456);
    expect(result[0].name).toBe(mockCollegeDbItem.institutionName);
    expect(result[0].type).toBe(CollegeType.PUBLIC);
  });

  test("test getInstitutions returns empty array if no items found", async () => {
    dynamoClientMock.on(ScanCommand).resolves({});
    const result = await getInstitutions();
    expect(result.length).toBe(0);
  });

  test("test getInstitutions returns sorted array by name", async () => {
    dynamoClientMock
      .on(ScanCommand)
      .resolves({ Items: [mockCollegeDbItem, mockCollegeDbItemTwo] });
    const result = await getInstitutions();
    expect(result.length).toBe(2);
    expect(result[0].id).toBe(122456);
  });

  test("test get20Institutions", async () => {
    dynamoClientMock
      .on(ScanCommand)
      .resolves({ Items: [mockCollegeDbItem, mockCollegeDbItemTwo] });
    const { colleges: result } = await get20Institutions();
    expect(result.length).toBe(2);
    expect(result[0].id).toBe(122456);
  });
});
