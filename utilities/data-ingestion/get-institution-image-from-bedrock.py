import json
import boto3
import random
import logging
import base64
from io import BytesIO
import os

logger = logging.getLogger()
bedrock_runtime = boto3.client("bedrock-runtime", "us-east-1")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.getenv("DYNAMODB_TABLE") or "institutions")
s3_client = boto3.client("s3")
images_bucket = os.getenv("IMAGES_BUCKET") or "swift-institution-images-public"


def check_s3_file_exists(bucket, key):
    logger.info("Checking for bucket: " + bucket + " and key: " + key)
    try:
        # checks that file exists
        s3_client.head_object(Bucket=bucket, Key=key)
        logger.info("image file exists in S3")
        return True
    except s3_client.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "404":
            logger.info("image file does not exist in S3")
            return False
        else:
            # Handle Any other type of error
            raise


def lambda_handler(event, context):
    # load the json to a string
    resp = json.loads(json.loads(json.dumps(event))["Records"][0]["body"])

    # variable for use throughout function
    institution_name = resp["institutionName"]
    institution_id = resp["institutionId"]

    # Create image
    file_name = str(institution_id) + ".png"
    bucket_name = images_bucket
    image_path = bucket_name + "/" + file_name

    # since this is randomly generated and a temp solution to meet a design need
    # if an image already exists we will use it vs creating another image
    if not check_s3_file_exists(bucket_name, file_name):
        logger.info("Creating image for " + institution_name)
        image_prompts = [
            f"Can you generate me a night time full color image of {institution_name}",
            f"Can you generate me a full color image of  {institution_name}",
            f"Can you generate me a winter full color image of  {institution_name}",
            f"Can you generate me an post-modern fall image of {institution_name}",
            f"Can you generate me a sharp photo of a large, busy campus that looks like {institution_name}",
            f"Can you generate me a sharp photo of a small, busy campus that looks like {institution_name}",
        ]
        image_prompt = random.choice(image_prompts)
        bedrock_image_args = {
            "modelId": "amazon.titan-image-generator-v1",
            "contentType": "application/json",
            "accept": "application/json",
            "body": '{"textToImageParams":{"text":"'
            + image_prompt
            + '"},"taskType":"TEXT_IMAGE","imageGenerationConfig":{"cfgScale":8,"seed":10,"quality":"standard","width":512,"height":512,"numberOfImages":1}}',
        }

        generated_image_response = bedrock_runtime.invoke_model(**bedrock_image_args)
        image_body = json.loads(generated_image_response.get("body").read())

        # convert to png
        decoded_data = base64.b64decode(image_body["images"][0])
        img_data = BytesIO(decoded_data)

        # write image to S3
        s3_client.put_object(Body=img_data, Bucket=bucket_name, Key=file_name)
    else:
        logger.info("Image already exists for " + institution_name)

    # intentional update so images can be shared between environments to limit Bedrock load
    try:
        table.update_item(
            Key={
                "institutionId": int(institution_id),
                "recordType": resp["recordType"],
            },
            UpdateExpression="set imageLocation=:i",
            ExpressionAttributeValues={":i": image_path},
            ReturnValues="UPDATED_NEW",
        )
    except Exception as err:
        print(err)
