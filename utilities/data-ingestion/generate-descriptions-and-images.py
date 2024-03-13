import json
import boto3
import random

bedrock_runtime = boto3.client("bedrock-runtime", "us-east-1")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("institutions")
s3_client = boto3.client("s3")


def lambda_handler(event, context):
    # load the json to a string
    resp = json.loads(json.loads(json.dumps(event))["Records"][0]["body"])

    ## variable for use throughtout function
    institutionName = resp["institutionName"]
    institutionId = resp["institutionId"]

    # create text prompt
    text_prompt = "Create a 45 word description for " + institutionName

    # get description
    bedrock_text_args = {
        "modelId": "ai21.j2-mid-v1",
        "contentType": "application/json",
        "accept": "application/json",
        "body": '{"prompt":"'
        + text_prompt
        + '","maxTokens":200,"temperature":0.8,"topP":0.9,"stopSequences":[],"countPenalty":{"scale":0},"presencePenalty":{"scale":0},"frequencyPenalty":{"scale":0}}',
    }

    generated_text_response = bedrock_runtime.invoke_model(**bedrock_text_args)
    text_json = json.loads(generated_text_response.get("body").read())
    resp["description"] = text_json["completions"][0]["data"]["text"]

    # get image
    image_prompts = [
        "Can you generate me a night time full color image of",
        "Can you generate me a full color image of",
        "Can you generate me a winter full color image of",
        "Can you generate me an impressionist image of",
        "Can you generate me an post-modern fall image of",
    ]

    image_prompt = random.choice(image_prompts) + " " + institutionName

    bedrock_image_args = {
        "modelId": "amazon.titan-image-generator-v1",
        "contentType": "application/json",
        "accept": "application/json",
        "body": '{"textToImageParams":{"text":"'
        + image_prompt
        + '"},"taskType":"TEXT_IMAGE","imageGenerationConfig":{"cfgScale":8,"seed":0,"quality":"standard","width":512,"height":512,"numberOfImages":1}}',
    }

    generated_image_response = bedrock_runtime.invoke_model(**bedrock_image_args)
    image_body = json.loads(generated_image_response.get("body").read())

    # write image to S3
    fileName = str(institutionId) + ".json"
    bucketName = "swift-institution-images"
    s3_client.put_object(Body=image_body["images"][0], Bucket=bucketName, Key=fileName)
    resp["imagePath"] = bucketName + "/" + fileName

    try:
        table.put_item(Item=resp)
    except Exception as err:
        print(err)
