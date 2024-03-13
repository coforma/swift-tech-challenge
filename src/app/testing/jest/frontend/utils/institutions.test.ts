import { CollegeType } from "@/src/app/types";
import { getInstitutions } from "@/src/app/utils/institutions";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";

const dynamoClientMock = mockClient(DynamoDBDocumentClient);

const mockCollegeDbItem = {
  institutionId: 123456,
  institutionName: "Test Institute of Technology",
  city: "Edtown",
  state: "AZ",
  description: "Description of university",
  completionRates: { fourYearInstitution: "0.4784" },
  publicNetPrice: { averagePrice: "5687.0" },
  control: "1",
};

describe("test institutions utils", () => {
  test("test getInstitutions", async () => {
    dynamoClientMock.on(ScanCommand).resolves({ Items: [mockCollegeDbItem] });
    const result = await getInstitutions();
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(123456);
    expect(result[0].name).toBe("Test Institute of Technology");
    expect(result[0].type).toBe(CollegeType.PUBLIC);
  });

  test("test getInstitutions returns empty array if no items found", async () => {
    dynamoClientMock.on(ScanCommand).resolves({});
    const result = await getInstitutions();
    expect(result.length).toBe(0);
  });
});
