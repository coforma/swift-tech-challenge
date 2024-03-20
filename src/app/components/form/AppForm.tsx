"use client";

import * as yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// components
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  GridContainer,
} from "@trussworks/react-uswds";
import {
  CloseAppModal,
  Spinner,
  TextArea,
  TextField,
  USWDSForm,
} from "../index";
// pages
import NotFound from "../../not-found";
// utils
import { getInstitutionApplication } from "../../utils/institutions";
import { saveApplication } from "../../utils/applications";
// schemas
import { email, number, numberOptional, text } from "../../schemas/schemas";

export const AppForm = ({ institutionId }: Props) => {
  const router = useRouter();
  const [application, setApplication] = useState<
    Record<string, any> | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const launchModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const appq = application?.questions;

  useEffect(() => {
    getInstitutionApplication(Number(institutionId)).then((application) => {
      setApplication(application);
      setLoading(false);
    });
  }, [institutionId]);

  const onSubmit = async (data: any) => {
    const submission = {
      questions: appq,
      answers: data,
      email: data.email,
      institutionId: institutionId,
    };

    try {
      await saveApplication(submission);
      router.push(`/${institutionId}/apply/confirmation`);
    } catch {
      router.push(`/error`);
    }
  };

  //Handle SAT score questions
  const hasSATQ: boolean = appq?.includes("What is your SAT score?");
  const satSchema = hasSATQ ? number() : numberOptional();

  const validationSchema = yup.object().shape({
    "first-name": text(),
    "last-name": text(),
    email: email(),
    phone: text(),
    "math-score": satSchema,
    "reading-score": satSchema,
    "writing-score": satSchema,
    essayOne: text(),
    essayTwo: text(),
    essayThree: text(),
  });
  // Handle EssayQuestions
  const essayQ1: string | undefined = appq?.[4];
  const essayQ2: string | undefined = appq?.[5];
  const essayQ3: string | undefined = appq?.[6];

  const ApplicationView = !application ? (
    <NotFound />
  ) : (
    <div className="application">
      <USWDSForm
        initialValues={{
          "first-name": "",
          "last-name": "",
          email: "",
          phone: "",
          "math-score": "",
          "reading-score": "",
          "writing-score": "",
          essayOne: "",
          essayTwo: "",
          essayThree: "",
        }}
        validationSchema={validationSchema}
        submit={onSubmit}
      >
        <div className="application_header">
          <h1 className="application_header-title">
            {application?.institutionName}
          </h1>
          <p className="application_header-subtitle">
            NEW APPLICATION (2025-2026)
          </p>
        </div>
        <GridContainer className="application_questions">
          <ul className="usa-card-group">
            <Card className="application_card">
              <CardBody className="application_card-container">
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    Applicant info
                  </legend>
                  <div className="application_questions-grid">
                    <TextField
                      label={"First name (required)"}
                      name={"first-name"}
                      required
                    />
                    <TextField
                      label={"Last name (required)"}
                      name={"last-name"}
                      required
                    />
                    <TextField
                      label={"Email (required)"}
                      name={"email"}
                      required
                    />
                    <TextField
                      label={"Phone number (required)"}
                      name={"phone"}
                      required
                    />
                  </div>
                </fieldset>
              </CardBody>
            </Card>

            <Card className="application_card">
              <CardBody>
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    SAT scores
                  </legend>
                  <div className="application_questions-grid">
                    <TextField
                      label={`Math${hasSATQ ? " (required)" : ""}`}
                      name={"math-score"}
                      required={hasSATQ}
                    />

                    <TextField
                      label={`Critical reading${hasSATQ ? " (required)" : ""}`}
                      name={"reading-score"}
                      required={hasSATQ}
                    />

                    <TextField
                      label={`Writing${hasSATQ ? " (required)" : ""}`}
                      name={"writing-score"}
                      required={hasSATQ}
                    />
                  </div>
                </fieldset>
              </CardBody>
            </Card>

            <Card className="application_card">
              <CardBody className="application_card">
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    Essay guidance
                  </legend>
                  <p className="application_questions-essay-guidance">
                    Answer the following essay questions. We encourage you to
                    write the essays in a separate word processing program,
                    check them for grammar and spelling, and then copy/paste
                    into the boxes here.
                  </p>
                </fieldset>
              </CardBody>
            </Card>
            <Card className="application_card">
              <CardBody className="application_card">
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    Essay question 1 (required){" "}
                    <span className="required">*</span>
                  </legend>
                  <TextArea label={essayQ1} name={"essayOne"} />
                </fieldset>
              </CardBody>
            </Card>
            <Card className="application_card">
              <CardBody>
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    Essay question 2 (required){" "}
                    <span className="required">*</span>
                  </legend>
                  <TextArea label={essayQ2} name={"essayTwo"} />
                </fieldset>
              </CardBody>
            </Card>

            <Card className="application_card">
              <CardBody>
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    Essay question 3 (required){" "}
                    <span className="required">*</span>
                  </legend>
                  <TextArea label={essayQ3} name={"essayThree"} />
                </fieldset>
              </CardBody>
            </Card>
          </ul>
        </GridContainer>
        <div className="application_footer">
          <ButtonGroup className="application_footer-buttons">
            <Button
              type="button"
              onClick={launchModal}
              className="usa-button usa-button--unstyled"
            >
              Close application
            </Button>
            <Button type={"submit"}>Submit application</Button>
          </ButtonGroup>
        </div>
      </USWDSForm>
      {isModalVisible && <CloseAppModal closeHandler={closeModal} />}
    </div>
  );

  return <main>{loading ? <Spinner /> : ApplicationView}</main>;
};

type Props = {
  institutionId: string;
};
