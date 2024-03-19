"use client";

import * as yup from "yup";
import { useEffect, useState } from "react";
import { getInstitutionApplication } from "../../utils/institutions";
import { USWDSForm } from "./Form";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  GridContainer,
} from "@trussworks/react-uswds";
import { Spinner } from "../utilities/Spinner";
import NotFound from "../../not-found";
import { TextField } from "./TextField";
import Link from "next/link";
import { saveApplication } from "../../utils/applications";
import router from "next/router";

const SignupSchema = yup.object().shape({
  "first-name": yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  "last-name": yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: yup.string().email().required("Required"),
  phone: yup.string().required("Required"),
  "math-score": yup.number(),
  "crit-reading-score": yup.number(),
  "writing-score": yup.number(),
});

export const AppForm = ({ institutionId }: Props) => {
  const [application, setApplication] = useState<
    Record<string, any> | undefined
  >();
  const [loading, setLoading] = useState(true);

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
    alert(submission);
    try {
      await saveApplication(submission);
      router.push(`/${institutionId}/apply/confirmation`);
    } catch {
      router.push(`/error`);
    }
  };

  //Handle SAT score questions
  const hasSATQ: boolean = appq?.includes("What is your SAT score?");
  /*
   * Handle EssayQuestions
   *  const essayQ1: string | undefined = appq?.[4];
   *  const essayQ2: string | undefined = appq?.[5];
   *  const essayQ3: string | undefined = appq?.[6];
   */
  const ApplicationView = !application ? (
    <NotFound />
  ) : (
    <main className="application">
      <USWDSForm
        initialValues={{
          "first-name": "",
          "last-name": "",
          email: "",
          phone: "",
          "math-score": "",
          "crit-reading-score": "",
          "writing-score": "",
        }}
        validationSchema={SignupSchema}
        submit={onSubmit}
      >
        <div className="application_header">
          <p className="application_header-subtitle">
            NEW APPLICATION (2024-2025)
          </p>
          <h1 className="application_header-title">
            {application?.institutionName}
          </h1>
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
                      label={"First name"}
                      name={"first-name"}
                      required
                    />
                    <TextField
                      label={"Last name"}
                      name={"last-name"}
                      required
                    />
                    <TextField label={"Email"} name={"email"} required />
                    <TextField label={"Phone number"} name={"phone"} required />
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
                      label={"Math"}
                      name={"math-score"}
                      required={hasSATQ}
                    />

                    <TextField
                      label={"Critical reading"}
                      name={"reading-score"}
                      required={hasSATQ}
                    />

                    <TextField
                      label={"Writing"}
                      name={"writing-score"}
                      required={hasSATQ}
                    />
                  </div>
                </fieldset>
              </CardBody>
            </Card>

            {/* <Card className="application_card">
              <CardBody className="application_card">
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    Essay Question 1 <span className="required">*</span>
                  </legend>
                  <p className="application_questions-essay-guidance">
                    Answer the following essay question. We encourage you to
                    write the essays in separate word processing program, check
                    them for grammar and spelling, and then copy/paste into the
                    boxes here.
                  </p>
                  <p className="application_questions-essay-q">Question</p>
                  <TextArea
                    id={"essay-question-1"}
                    label={essayQ1}
                    name={"question-1"}
                    required={false}
                  />
                </fieldset>
              </CardBody>
            </Card>
            <Card className="application_card">
              <CardBody>
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    Essay Question 2 <span className="required">*</span>
                  </legend>
                  <p className="application_questions-essay-guidance">
                    Answer the following essay question. We encourage you to
                    write the essays in separate word processing program, check
                    them for grammar and spelling, and then copy/paste into the
                    boxes here.
                  </p>
                  <p className="application_questions-essay-q">Question</p>
                  <TextArea
                    id={"essay-question-2"}
                    label={essayQ2}
                    name={"question-2"}
                    required={false}
                  />
                </fieldset>
              </CardBody>
            </Card>

            <Card className="application_card">
              <CardBody>
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    Essay Question 3 <span className="required">*</span>
                  </legend>
                  <p className="application_questions-essay-guidance">
                    Answer the following essay question. We encourage you to
                    write the essays in separate word processing program, check
                    them for grammar and spelling, and then copy/paste into the
                    boxes here.
                  </p>
                  <p className="application_questions-essay-q">Question</p>
                  <TextArea
                    id={"essay-question-3"}
                    label={essayQ3}
                    name={"question-3"}
                    required={false}
                  />
                </fieldset>
              </CardBody>
            </Card> */}
          </ul>
        </GridContainer>
        <div className="application_footer">
          <ButtonGroup className="application_footer-buttons">
            <Link href={"/"} className="usa-button usa-button--unstyled">
              Close application
            </Link>
            <Button type={"submit"}>Submit application</Button>
          </ButtonGroup>
        </div>
      </USWDSForm>
    </main>
  );

  return <main>{loading ? <Spinner /> : ApplicationView}</main>;
};

type Props = {
  institutionId: string;
};
