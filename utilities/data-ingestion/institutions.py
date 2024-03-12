import boto3
from decimal import Decimal


s3_client = boto3.client("s3")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("institutions")


def lambda_handler(event, context):
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

    try:
        # Grab file from S3
        s3_Bucket_Name = event["Records"][0]["s3"]["bucket"]["name"]
        s3_File_Name = event["Records"][0]["s3"]["object"]["key"]
        object = s3_client.get_object(Bucket=s3_Bucket_Name, Key=s3_File_Name)

        # massage data
        data = object["Body"].read().decode("utf-8")
        institutions = data.split("\n")
        institutions.pop(0)
        institutions = institutions[:80]
        records_processed = 0

        # transform data into Item and write to table
        for institution in institutions:
            institution_data = institution.split(",")
            print(institution_data[1])
            try:
                table.put_item(
                    Item={
                        "institutionId": int(institution_data[0]),
                        "recordType": "data",
                        "description": """Immerse yourself in cutting-edge
                             academia at our university, where innovation meets
                             tradition. Discover a vibrant campus community
                             dedicated to fostering growth and excellence.
                             Join us in shaping tomorrow's leaders and
                             innovators!""",
                        "institutionName": institution_data[1],
                        "city": institution_data[3],
                        "state": institution_data[4],
                        "zip": institution_data[5],
                        "latitude": convertToNumeric(institution_data[11]),
                        "longitude": convertToNumeric(institution_data[12]),
                        "url": institution_data[7],
                        "control": convertToNumeric(institution_data[6], True),
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
                            "percentUnknownRace": convertToNumeric(
                                institution_data[22]
                            ),
                        },
                        "admissionRate": convertToNumeric(institution_data[13]),
                        "averageAttendanceCost": convertToNumeric(institution_data[35]),
                        "tuitionInState": convertToNumeric(institution_data[36]),
                        "tuitionOutOfState": convertToNumeric(institution_data[37]),
                        "percentUndergradWithLoan": convertToNumeric(
                            institution_data[43]
                        ),
                        "netPriceCalculatorUrl": institution_data[8],
                        "satScores": {
                            "satAverageScore": convertToNumeric(
                                institution_data[60], True
                            ),
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
                            "averagePrice": convertToNumeric(
                                institution_data[23], True
                            ),
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
                            "averagePrice": convertToNumeric(
                                institution_data[24], True
                            ),
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
                            "fourYearInstitution": convertToNumeric(
                                institution_data[41]
                            ),
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
                            "fourYearInstitution": convertToNumeric(
                                institution_data[48]
                            ),
                            "underFourYearInstitution": convertToNumeric(
                                institution_data[49]
                            ),
                        },
                    },
                )

            except Exception as e:
                raise e

            records_processed += 1

        print("Records processed: ", records_processed)

    except Exception as err:
        print(err)
