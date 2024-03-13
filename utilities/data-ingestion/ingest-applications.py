import boto3
import csv


s3_client = boto3.client("s3")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("institutions")


def lambda_handler(event, context):
    try:
        # Grab file from S3, based on Lambda trigger
        s3_Bucket_Name = event["Records"][0]["s3"]["bucket"]["name"]
        s3_File_Name = event["Records"][0]["s3"]["object"]["key"]
        object = s3_client.get_object(Bucket=s3_Bucket_Name, Key=s3_File_Name)

        # massage data
        data = object["Body"].read().decode("utf-8")
        institution_questions = data.split("\n")
        institution_questions.pop(0)

        # transform data into Item and write to table
        records_processed = 0
        items = []
        for questions in institution_questions:
            try:
                # opting for csv reader due to commas in the questions and .split(",")
                csv_reader = csv.reader([questions])
                question_list = next(csv_reader)
                Item = {
                    "institutionId": int(question_list.pop(0)),
                    "recordType": "application",
                    "institutionName": question_list.pop(0),
                    "questions": question_list,
                }
                items.append(Item)
            except Exception as err:
                print(err)

        with table.batch_writer() as batch:
            for item in items:
                batch.put_item(Item=item)

    except Exception as err:
        print(err)
