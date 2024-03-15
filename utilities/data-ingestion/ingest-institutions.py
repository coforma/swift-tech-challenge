import boto3
import json
from decimal import Decimal
from datetime import datetime
import logging


s3_client = boto3.client("s3")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("institutions")
sqs = boto3.client("sqs")
logger = logging.getLogger()

# Helper function to convert to Decimal, has to have an
# option to return original string
def convert_to_numeric(inputString, isInteger=False):
    if len(inputString) == 0:
        return None
    try:
        if isInteger:
            return Decimal(int(inputString))
        return Decimal(inputString)
    finally:
        return inputString


# Helper function to map id to value
def map_control(control_id):
    match int(control_id):
        case 1:
            return "Public"
        case 2:
            return "Private nonprofit"
        case _:
            return "Private for-profit"


def lambda_handler(event, context):
    try:
        # Grab file from S3
        s3_bucket_name = event["Records"][0]["s3"]["bucket"]["name"]
        s3_file_name = event["Records"][0]["s3"]["object"]["key"]
        csv_object = s3_client.get_object(Bucket=s3_bucket_name, Key=s3_file_name)

        # massage data
        data = csv_object["Body"].read().decode("utf-8")
        institutions = data.split("\n")
        institutions.pop(0)  # removes header row
        institutions_to_save = []

        # transform data into Item and add to queue
        for institution in institutions:
            institution_data = institution.split(",")
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
                "latitude": convert_to_numeric(institution_data[11]),
                "longitude": convert_to_numeric(institution_data[12]),
                "url": institution_data[7],
                "institutionType": map_control(institution_data[6]),
                "predominantUndergradDegree": int(institution_data[9]),
                "highestDegreeAwarded": int(institution_data[10]),
                "specialties": {
                    "humanities": institution_data[61],
                    "stem": institution_data[62],
                    "socialScience": institution_data[63],
                    "occupational": institution_data[64],
                    "interdisciplinary": institution_data[65],
                },
                "raceDemographics": {
                    "percentWhite": convert_to_numeric(institution_data[14]),
                    "percentBlack": convert_to_numeric(institution_data[15]),
                    "percentAsian": convert_to_numeric(institution_data[17]),
                    "percentHispanic": convert_to_numeric(institution_data[16]),
                    "percentAian": convert_to_numeric(institution_data[18]),
                    "percentNhpi": convert_to_numeric(institution_data[19]),
                    "percentTwoOrMore": convert_to_numeric(institution_data[20]),
                    "percentNonResidentAlien": convert_to_numeric(institution_data[21]),
                    "percentUnknownRace": convert_to_numeric(institution_data[22]),
                },
                "admissionRate": convert_to_numeric(institution_data[13]),
                "averageAttendanceCost": convert_to_numeric(institution_data[35]),
                "tuitionInState": convert_to_numeric(institution_data[36]),
                "tuitionOutOfState": convert_to_numeric(institution_data[37]),
                "percentUndergradWithLoan": convert_to_numeric(institution_data[43]),
                "netPriceCalculatorUrl": institution_data[8],
                "satScores": {
                    "satAverageScore": convert_to_numeric(institution_data[60], True),
                    "satReadingPercentile25": convert_to_numeric(
                        institution_data[51], True
                    ),
                    "satReadingPercentile50": convert_to_numeric(
                        institution_data[57], True
                    ),
                    "satReadingPercentile75": convert_to_numeric(
                        institution_data[52], True
                    ),
                    "satWritingPercentile25": convert_to_numeric(
                        institution_data[55], True
                    ),
                    "satWritingPercentile50": convert_to_numeric(
                        institution_data[59], True
                    ),
                    "satWritingPercentile75": convert_to_numeric(
                        institution_data[56], True
                    ),
                    "satMathPercentile25": convert_to_numeric(
                        institution_data[53], True
                    ),
                    "satMathPercentile50": convert_to_numeric(
                        institution_data[58], True
                    ),
                    "satMathPercentile75": convert_to_numeric(
                        institution_data[54], True
                    ),
                },
                "publicNetPrice": {
                    "averagePrice": convert_to_numeric(institution_data[23], True),
                    "averagePriceUnder30k": convert_to_numeric(
                        institution_data[25], True
                    ),
                    "averagePriceUnder30To48k": convert_to_numeric(
                        institution_data[26], True
                    ),
                    "averagePriceUnder48To75k": convert_to_numeric(
                        institution_data[27], True
                    ),
                    "averagePriceUnder75To110k": convert_to_numeric(
                        institution_data[28], True
                    ),
                    "averagePriceUnder110kPlus": convert_to_numeric(
                        institution_data[29], True
                    ),
                },
                "privateNetPrice": {
                    "averagePrice": convert_to_numeric(institution_data[24], True),
                    "averagePriceUnder30k": convert_to_numeric(
                        institution_data[30], True
                    ),
                    "averagePriceUnder30To48k": convert_to_numeric(
                        institution_data[31], True
                    ),
                    "averagePriceUnder48To75k": convert_to_numeric(
                        institution_data[32], True
                    ),
                    "averagePriceUnder75To110k": convert_to_numeric(
                        institution_data[33], True
                    ),
                    "averagePriceUnder110kPlus": convert_to_numeric(
                        institution_data[34], True
                    ),
                },
                "facultyAverageSalary": convert_to_numeric(institution_data[39]),
                "facultyPercentageEmployedFull": convert_to_numeric(
                    institution_data[40]
                ),
                "studentToFacultyRatio": convert_to_numeric(institution_data[47]),
                "instructionalExpenditurePerSt": convert_to_numeric(
                    institution_data[38]
                ),
                "completionRates": {
                    "fourYearInstitution": convert_to_numeric(institution_data[41]),
                    "underFourYearInstitution": convert_to_numeric(
                        institution_data[42]
                    ),
                },
                "percentCompletedInFourYears": convert_to_numeric(institution_data[44]),
                "percentCompletedInEightYears": convert_to_numeric(
                    institution_data[50]
                ),
                "earnings": {
                    "meanGraduateEarnings10Years": convert_to_numeric(
                        institution_data[45], True
                    ),
                    "medianGraduateEarnings10Years": convert_to_numeric(
                        institution_data[46], True
                    ),
                },
                "retentionRate": {
                    "fourYearInstitution": convert_to_numeric(institution_data[48]),
                    "underFourYearInstitution": convert_to_numeric(
                        institution_data[49]
                    ),
                },
            }
            institutions_to_save.append(Item)

        logger.info("Processed: " + str(len(institutions_to_save)))

        # write to Dynamo
        with table.batch_writer() as batch:
            for item in institutions_to_save:
                batch.put_item(Item=item)

        # write to get queues for AI content creation
        try:
            for item in institutions_to_save:
                # description queue
                sqs.send_message(
                    QueueUrl="https://sqs.us-east-1.amazonaws.com/905418154281/get-institution-descriptions",
                    MessageBody=json.dumps(item),
                )
                # images queue
                sqs.send_message(
                    QueueUrl="https://sqs.us-east-1.amazonaws.com/905418154281/get-institution-images",
                    MessageBody=json.dumps(item),
                )
        except Exception as e:
            print(e)

    except Exception as err:
        print(err)
