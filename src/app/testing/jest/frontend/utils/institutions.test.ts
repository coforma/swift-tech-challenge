import { CollegeType } from "@/src/app/types";
import { getInstitutions } from "@/src/app/utils/institutions";
import s3Lib from "@/src/app/utils/libs/s3-lib";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";

const dynamoClientMock = mockClient(DynamoDBDocumentClient);

const mockCollegeDbItem = {
  institutionId: 123456,
  institutionName: "Test College",
  city: "Edtown",
  state: "AZ",
  description: "Description of college",
  completionRates: { fourYearInstitution: "0.4784" },
  averageAttendanceCost: "5687.0",
  institutionType: "Public",
  studentPopulation: "99500",
};

const mockCollegeDbItemTwo = {
  institutionId: 122456,
  institutionName: " A University of College",
  city: "Beanington",
  state: "KY",
  description: "Description of description",
  completionRates: { fourYearInstitution: "0.4784" },
  averageAttendanceCost: "5687.0",
  institutionType: "Public",
  studentPopulation: "99500",
};

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

  test("test getInstitutions returns sorted array by name", async () => {
    dynamoClientMock
      .on(ScanCommand)
      .resolves({ Items: [mockCollegeDbItem, mockCollegeDbItemTwo] });
    const result = await getInstitutions();
    expect(result.length).toBe(2);
    expect(result[0].id).toBe(122456);
  });
});
