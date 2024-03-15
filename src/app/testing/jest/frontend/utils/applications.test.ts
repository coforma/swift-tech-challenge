import { saveApplication } from "@/src/app/utils/applications";
import dynamodbLib from "../../../../utils/libs/dynamodb-lib";

jest.mock("../../../../utils/libs/dynamodb-lib", () => ({
  __esModule: true,
  default: {
    put: jest.fn(),
  },
}));

const mockSubmission = {
  questions: { questions1: "what is your name?" },
  answers: { answer1: "College Hopeful" },
};

describe("test institutions utils", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test("test getInstitutions", async () => {
    await saveApplication(mockSubmission);
    expect(dynamodbLib.put).toHaveBeenCalledWith({
      TableName: "applicants",
      Item: {
        email: "",
        recordType: "application",
        questions: mockSubmission.questions,
        answers: mockSubmission.answers,
      },
    });
  });
});
