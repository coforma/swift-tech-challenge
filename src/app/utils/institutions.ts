import dynamoClient from "./libs/dynamodb-lib";
import s3Client from "./libs/s3-lib";
import emptyPictureIcon from "@/src/app/public/picture_icon.png";
// types
import { College } from "../types";
import { StaticImageData } from "next/image";

const INSTITUTIONS_TABLE_NAME = "institutions";
const IMAGES_BUCKET_NAME = "swift-institution-images";

export async function getInstitutions() {
  let colleges: College[] = [];
  const params = {
    TableName: INSTITUTIONS_TABLE_NAME,
    FilterExpression: "recordType = :recordType",
    ExpressionAttributeValues: { ":recordType": "data" },
    Limit: 4,
  };
  const result = await dynamoClient.singleScan(params);
  const items = result?.Items;

  if (Array.isArray(items)) {
    for (const item of items) {
      const college: College = {
        id: item?.institutionId,
        img: await getImage(item?.institutionId),
        name: item?.institutionName,
        city: item?.city,
        state: item?.state,
        description: item?.description,
        type: item?.institutionType,
        populationAmount: item?.studentPopulation,
        gradRate: item?.completionRates.fourYearInstitution,
        avgCost: item?.averageAttendanceCost,
      };
      colleges.push(college);
    }
  }

  return colleges;
}

async function getImage(institutionId: Number) {
  let image: string | StaticImageData = emptyPictureIcon;
  const params = {
    Bucket: IMAGES_BUCKET_NAME,
    Key: `${institutionId}.json`,
  };
  const response = await s3Client.get(params);
  if (response !== "") {
    image = `data:image/png;base64,${response}`;
  }
  return image;
}

export async function getInsitutionApplication(institutionId: Number) {
  const params = {
    TableName: INSTITUTIONS_TABLE_NAME,
    Key: { institutionId: institutionId, recordType: "application" },
  };
  const result = await dynamoClient.get(params);
  return result?.Item;
}
