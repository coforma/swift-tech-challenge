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
import { TextField, TextArea, Spinner } from "@/src/app/components";
import NotFound from "@/src/app/not-found";
import Link from "next/link";
import { useRouter } from "next/navigation";
// utils
import { getInstitutionApplication } from "@/src/app/utils/institutions";
import { saveApplication } from "@/src/app/utils/applications";

export const ApplicationForm = ({ institutionId }: Props) => {
  const router = useRouter();
  const [application, setApplication] = useState<
    Record<string, any> | undefined
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInstitutionApplication(Number(institutionId)).then((application) => {
      setApplication(application);
      setLoading(false);
    });
  }, [institutionId]);

  const { handleSubmit, register } = useForm();

  const appq = application?.questions;

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
  //Handle EssayQuestions
  const essayQ1: string | undefined = appq?.[4];
  const essayQ2: string | undefined = appq?.[5];
  const essayQ3: string | undefined = appq?.[6];
  const ApplicationView = !application ? (
    <NotFound />
  ) : (
    <div className="application">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="application_header">
          <h1 className="application_header-title">
            {application?.institutionName}
          </h1>
          <p className="application_header-subtitle">
            NEW APPLICATION (2024-2025)
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
                      id={"given-name"}
                      label={"First name (required)"}
                      name={"first-name"}
                      required
                      registerField={register}
                    />
                    <TextField
                      id={"family-name"}
                      label={"Last name (required)"}
                      name={"last-name"}
                      required
                      registerField={register}
                    />
                    <TextField
                      id={"email-address"}
                      label={"Email (required)"}
                      name={"email"}
                      required
                      registerField={register}
                    />
                    <TextField
                      id={"phone-number"}
                      label={"Phone number (required)"}
                      name={"phone"}
                      required
                      registerField={register}
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
                      id={"math-sat"}
                      label={"Math (required)"}
                      name={"math-score"}
                      required={hasSATQ}
                      registerField={register}
                    />

                    <TextField
                      id={"crit-reading-sat"}
                      label={"Critical reading (required)"}
                      name={"reading-score"}
                      required={hasSATQ}
                      registerField={register}
                    />

                    <TextField
                      id={"writing-sat"}
                      label={"Writing (required)"}
                      name={"writing-score"}
                      required={hasSATQ}
                      registerField={register}
                    />
                  </div>
                </fieldset>
              </CardBody>
            </Card>

            <Card className="application_card">
              <CardBody className="application_card">
                <fieldset className="usa-fieldset">
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
                    Essay Question 1{" "}
                    <span className="required">(required)*</span>
                  </legend>
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
            <Card className="application_card">
              <CardBody>
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    Essay Question 2{" "}
                    <span className="required">(required)*</span>
                  </legend>
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

            <Card className="application_card">
              <CardBody>
                <fieldset className="usa-fieldset">
                  <legend className="usa-legend usa-legend--large">
                    Essay Question 3{" "}
                    <span className="required">(required)*</span>
                  </legend>
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
    </div>
  );

  return <main>{loading ? <Spinner /> : ApplicationView}</main>;
};

type Props = {
  institutionId: string;
};
