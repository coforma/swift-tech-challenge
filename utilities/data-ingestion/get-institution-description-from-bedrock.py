import json
import boto3
import logging

logger = logging.getLogger()
bedrock_runtime = boto3.client("bedrock-runtime", "us-east-1")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("institutions")


def lambda_handler(event, context):
    # load the json to a string
    resp = json.loads(json.loads(json.dumps(event))["Records"][0]["body"])

    ## variable for use throughout function
    institution_name = resp["institutionName"]
    institution_id = resp["institutionId"]
    logger.info("Generating description for " + institution_name)

    # create text prompt
    text_prompt = "Create a 40 word description for " + institution_name

    # get description -- from the bedrock docs
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

    try:
        table.update_item(
            Key={
                "institutionId": int(institution_id),
                "recordType": resp["recordType"],
            },
            UpdateExpression="set description=:d",
            ExpressionAttributeValues={
                ":d": text_json["completions"][0]["data"]["text"]
            },
            ReturnValues="UPDATED_NEW",
        )
    except Exception as err:
        print(err)
