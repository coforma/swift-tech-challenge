import boto3
import json
from decimal import Decimal
from datetime import datetime
import logging
import os

s3_client = boto3.client("s3")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.getenv("DYNAMODB_TABLE") or "institutions")
DESCRIPTIONS_QUEUE_URL = (
    os.getenv("DESCRIPTIONS_QUEUE_URL")
    or "https://sqs.us-east-1.amazonaws.com/905418154281/get-institution-descriptions"
)
IMAGES_QUEUE_URL = (
    os.getenv("IMAGES_QUEUE_URL")
    or "https://sqs.us-east-1.amazonaws.com/905418154281/get-institution-images"
)
sqs = boto3.client("sqs")
logger = logging.getLogger()

# Helper function to convert to Decimal, has to have an
# option to return original string
def convertToNumeric(inputString, isInteger=False):
    if len(inputString) == 0:
        return None
    try:
        if isInteger:
            return Decimal(int(inputString))
        return Decimal(inputString)
    finally:
        return inputString


# Helper function to map id to value
def mapControl(control_id):
    match control_id:
        case "1":
            return "Public"
        case "2":
            return "Private nonprofit"
        case _:
            return "Private for-profit"


def lambda_handler(event, context):
    try:
        # Grab file from S3
        s3_Bucket_Name = event["Records"][0]["s3"]["bucket"]["name"]
        s3_File_Name = event["Records"][0]["s3"]["object"]["key"]
        object = s3_client.get_object(Bucket=s3_Bucket_Name, Key=s3_File_Name)

        # massage data
        data = object["Body"].read().decode("utf-8")
        institutions = data.split("\n")
        institutions.pop(0)  # removes header row
        institutions_to_save = []

        # transform data into Item and add to queue
        for institution in institutions:
            institution_data = institution.split(",")
            try:
                Item = {
                    "institutionId": int(institution_data[0]),
                    "recordType": "data",
                    "updatedAt": datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f"),
                    "description": "",
                    "imageLocation": "",
                    "institutionName": institution_data[1],
                    "studentPopulation": institution_data[2],
                    "city": institution_data[3],
                    "state": institution_data[4],
                    "zip": institution_data[5],
                    "latitude": convertToNumeric(institution_data[11]),
                    "longitude": convertToNumeric(institution_data[12]),
                    "url": institution_data[7],
                    "institutionType": mapControl(institution_data[6]),
                    "predominantUndergradDegree": institution_data[9],
                    "highestDegreeAwarded": institution_data[10],
                    "specialties": {
                        "humanities": institution_data[61],
                        "stem": institution_data[62],
                        "socialScience": institution_data[63],
                        "occupational": institution_data[64],
                        "interdisciplinary": institution_data[65],
                    },
                    "raceDemographics": {
                        "percentWhite": convertToNumeric(institution_data[14]),
                        "percentBlack": convertToNumeric(institution_data[15]),
                        "percentAsian": convertToNumeric(institution_data[17]),
                        "percentHispanic": convertToNumeric(institution_data[16]),
                        "percentAian": convertToNumeric(institution_data[18]),
                        "percentNhpi": convertToNumeric(institution_data[19]),
                        "percentTwoOrMore": convertToNumeric(institution_data[20]),
                        "percentNonResidentAlien": convertToNumeric(
                            institution_data[21]
                        ),
                        "percentUnknownRace": convertToNumeric(institution_data[22]),
                    },
                    "admissionRate": convertToNumeric(institution_data[13]),
                    "averageAttendanceCost": convertToNumeric(institution_data[35]),
                    "tuitionInState": convertToNumeric(institution_data[36]),
                    "tuitionOutOfState": convertToNumeric(institution_data[37]),
                    "percentUndergradWithLoan": convertToNumeric(institution_data[43]),
                    "netPriceCalculatorUrl": institution_data[8],
                    "satScores": {
                        "satAverageScore": convertToNumeric(institution_data[60], True),
                        "satReadingPercentile25": convertToNumeric(
                            institution_data[51], True
                        ),
                        "satReadingPercentile50": convertToNumeric(
                            institution_data[57], True
                        ),
                        "satReadingPercentile75": convertToNumeric(
                            institution_data[52], True
                        ),
                        "satWritingPercentile25": convertToNumeric(
                            institution_data[55], True
                        ),
                        "satWritingPercentile50": convertToNumeric(
                            institution_data[59], True
                        ),
                        "satWritingPercentile75": convertToNumeric(
                            institution_data[56], True
                        ),
                        "satMathPercentile25": convertToNumeric(
                            institution_data[53], True
                        ),
                        "satMathPercentile50": convertToNumeric(
                            institution_data[58], True
                        ),
                        "satMathPercentile75": convertToNumeric(
                            institution_data[54], True
                        ),
                    },
                    "publicNetPrice": {
                        "averagePrice": convertToNumeric(institution_data[23], True),
                        "averagePriceUnder30k": convertToNumeric(
                            institution_data[25], True
                        ),
                        "averagePriceUnder30To48k": convertToNumeric(
                            institution_data[26], True
                        ),
                        "averagePriceUnder48To75k": convertToNumeric(
                            institution_data[27], True
                        ),
                        "averagePriceUnder75To110k": convertToNumeric(
                            institution_data[28], True
                        ),
                        "averagePriceUnder110kPlus": convertToNumeric(
                            institution_data[29], True
                        ),
                    },
                    "privateNetPrice": {
                        "averagePrice": convertToNumeric(institution_data[24], True),
                        "averagePriceUnder30k": convertToNumeric(
                            institution_data[30], True
                        ),
                        "averagePriceUnder30To48k": convertToNumeric(
                            institution_data[31], True
                        ),
                        "averagePriceUnder48To75k": convertToNumeric(
                            institution_data[32], True
                        ),
                        "averagePriceUnder75To110k": convertToNumeric(
                            institution_data[33], True
                        ),
                        "averagePriceUnder110kPlus": convertToNumeric(
                            institution_data[34], True
                        ),
                    },
                    "facultyAverageSalary": convertToNumeric(institution_data[39]),
                    "facultyPercentageEmployedFull": convertToNumeric(
                        institution_data[40]
                    ),
                    "studentToFacultyRatio": convertToNumeric(institution_data[47]),
                    "instructionalExpenditurePerSt": convertToNumeric(
                        institution_data[38]
                    ),
                    "completionRates": {
                        "fourYearInstitution": convertToNumeric(institution_data[41]),
                        "underFourYearInstitution": convertToNumeric(
                            institution_data[42]
                        ),
                    },
                    "percentCompletedInFourYears": convertToNumeric(
                        institution_data[44]
                    ),
                    "percentCompletedInEightYears": convertToNumeric(
                        institution_data[50]
                    ),
                    "earnings": {
                        "meanGraduateEarnings10Years": convertToNumeric(
                            institution_data[45], True
                        ),
                        "medianGraduateEarnings10Years": convertToNumeric(
                            institution_data[46], True
                        ),
                    },
                    "retentionRate": {
                        "fourYearInstitution": convertToNumeric(institution_data[48]),
                        "underFourYearInstitution": convertToNumeric(
                            institution_data[49]
                        ),
                    },
                }
            except Exception as e:
                print(f"Skipping institution because of {e}")
            institutions_to_save.append(Item)

        logger.info("Processed: " + str(len(institutions_to_save)))
        print(type(institutions_to_save))

        # remove dupes
        unique_dictionary_collection = {}
        deduped_institutions = []

        for item in institutions_to_save:
            item_id = item["institutionId"]
            if item_id not in unique_dictionary_collection:
                unique_dictionary_collection[item_id] = item
                deduped_institutions.append(item)

        # write to Dynamo
        with table.batch_writer() as batch:
            for item in deduped_institutions:
                batch.put_item(Item=item)

        # write to get queues for AI content creation
        try:
            for item in deduped_institutions:
                # description queue
                sqs.send_message(
                    QueueUrl=DESCRIPTIONS_QUEUE_URL, MessageBody=json.dumps(item)
                )
                # images queue
                sqs.send_message(
                    QueueUrl=IMAGES_QUEUE_URL, MessageBody=json.dumps(item)
                )
        except Exception as e:
            print(e)

    except Exception as err:
        print(err)
