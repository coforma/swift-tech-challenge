import s3Lib from "@/src/app/utils/libs/s3-lib";
import {
  GetObjectCommand,
  GetObjectCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { mockClient } from "aws-sdk-client-mock";

const s3ClientMock = mockClient(S3Client);

describe("Test s3Lib Interaction API Build Structure", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    s3ClientMock.reset();
  });

  test("Can get object", async () => {
    s3ClientMock.on(GetObjectCommand).resolves({
      Body: {
        transformToString: () => Promise.resolve(`superlongbase64string`),
      },
    } as GetObjectCommandOutput);

    const result = await s3Lib.get({ Bucket: "b", Key: "k" });

    expect(result).toEqual("superlongbase64string");
  });
});
