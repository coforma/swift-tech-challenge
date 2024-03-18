"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// components
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  GridContainer,
} from "@trussworks/react-uswds";
import { TextField, TextArea } from "../../components";
import Link from "next/link";
// utils
import { getInstitutionApplication } from "../../utils/institutions";
import { saveApplication } from "@/src/app/utils/applications";

export const ApplicationForm = ({ institutionId }: Props) => {
  const [application, setApplication] = useState<
    Record<string, any> | undefined
  >();

  useEffect(() => {
    getInstitutionApplication(Number(institutionId)).then((application) => {
      setApplication(application);
    });
  }, [institutionId]);

  const { handleSubmit, register } = useForm();

  const appq = application?.questions;

  const onSubmit = (data: any) => {
    const submission = {
      questions: appq,
      answers: data,
      email: data.email,
    };
    saveApplication(submission);
  };

  //Handle personal questions
  const hasNameQ: boolean = appq?.includes("First and last name");
  const hasEmailQ: boolean = appq?.includes("Email");
  const hasPhoneQ: boolean = appq?.includes("Phone");
  const hasPersonalQ: boolean = hasNameQ || hasEmailQ || hasPhoneQ;

  //Handle SAT score questions
  const hasSATQ: boolean = appq?.includes("What is your SAT score?");

  //Handle EssayQuestions
  const essayQ1: string | undefined = appq?.[4];
  const essayQ2: string | undefined = appq?.[5];
  const essayQ3: string | undefined = appq?.[6];
  return (
    <main className="application">
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {hasPersonalQ && (
              <Card className="card">
                <CardBody>
                  <fieldset className="usa-fieldset">
                    <legend className="usa-legend usa-legend--large">
                      Applicant info
                    </legend>
                    <div className="application_questions-grid">
                      {hasNameQ && (
                        <>
                          <TextField
                            id={"given-name"}
                            label={"First name"}
                            name={"first-name"}
                            required
                            registerField={register}
                          />
                          <TextField
                            id={"family-name"}
                            label={"Last name"}
                            name={"last-name"}
                            required
                            registerField={register}
                          />
                        </>
                      )}
                      {hasEmailQ && (
                        <TextField
                          id={"email-address"}
                          label={"Email"}
                          name={"email"}
                          required
                          registerField={register}
                        />
                      )}
                      {hasPhoneQ && (
                        <TextField
                          id={"phone-number"}
                          label={"Phone number"}
                          name={"phone"}
                          required
                          registerField={register}
                        />
                      )}
                    </div>
                  </fieldset>
                </CardBody>
              </Card>
            )}
            {hasSATQ && (
              <Card className="card">
                <CardBody>
                  <fieldset className="usa-fieldset">
                    <legend className="usa-legend usa-legend--large">
                      SAT scores
                    </legend>
                    <div className="application_questions-grid">
                      <TextField
                        id={"math-sat"}
                        label={"Math"}
                        name={"math-score"}
                        required
                        registerField={register}
                      />

                      <TextField
                        id={"crit-reading-sat"}
                        label={"Critical reading"}
                        name={"reading-score"}
                        required
                        registerField={register}
                      />

                      <TextField
                        id={"writing-sat"}
                        label={"Writing"}
                        name={"writing-score"}
                        required
                        registerField={register}
                      />
                    </div>
                  </fieldset>
                </CardBody>
              </Card>
            )}
            {essayQ1 && (
              <Card>
                <CardBody>
                  <fieldset className="usa-fieldset">
                    <legend className="usa-legend usa-legend--large">
                      Essay Question 1
                    </legend>
                    <p className="application_questions-essay-guidance">
                      Answer the following essay question. We encourage you to
                      write the essays in separate word processing program,
                      check them for grammar and spelling, and then copy/paste
                      into the boxes here.
                    </p>
                    <p className="application_questions-essay-q">Question</p>
                    <TextArea
                      id={"essay-question-1"}
                      label={essayQ1}
                      name={"question-1"}
                      required={false}
                      registerField={register}
                    />
                  </fieldset>
                </CardBody>
              </Card>
            )}
            {essayQ2 && (
              <Card>
                <CardBody>
                  <fieldset className="usa-fieldset">
                    <legend className="usa-legend usa-legend--large">
                      Essay Question 2
                    </legend>
                    <p className="application_questions-essay-guidance">
                      Answer the following essay question. We encourage you to
                      write the essays in separate word processing program,
                      check them for grammar and spelling, and then copy/paste
                      into the boxes here.
                    </p>
                    <p className="application_questions-essay-q">Question</p>
                    <TextArea
                      id={"essay-question-2"}
                      label={essayQ2}
                      name={"question-2"}
                      required={false}
                      registerField={register}
                    />
                  </fieldset>
                </CardBody>
              </Card>
            )}
            {essayQ3 && (
              <Card>
                <CardBody>
                  <fieldset className="usa-fieldset">
                    <legend className="usa-legend usa-legend--large">
                      Essay Question 3
                    </legend>
                    <p className="application_questions-essay-guidance">
                      Answer the following essay question. We encourage you to
                      write the essays in separate word processing program,
                      check them for grammar and spelling, and then copy/paste
                      into the boxes here.
                    </p>
                    <p className="application_questions-essay-q">Question</p>
                    <TextArea
                      id={"essay-question-3"}
                      label={essayQ3}
                      name={"question-3"}
                      required={false}
                      registerField={register}
                    />
                  </fieldset>
                </CardBody>
              </Card>
            )}
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
      </form>
    </main>
  );
};

type Props = {
  institutionId: string;
};
