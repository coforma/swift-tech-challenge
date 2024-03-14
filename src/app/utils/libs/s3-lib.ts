import {
  S3Client,
  GetObjectCommandInput,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

const awsConfig = {
  region: "us-east-1",
};

const client = new S3Client(awsConfig);

const s3Client = {
  get: async (params: GetObjectCommandInput) => {
    const response = await client.send(new GetObjectCommand(params));
    return await response.Body?.transformToString();
  },
};

export default s3Client;
