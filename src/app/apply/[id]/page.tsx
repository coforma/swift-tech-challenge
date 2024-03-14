"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
// components
import {
  Card,
  CardBody,
  CardHeader,
  GridContainer,
} from "@trussworks/react-uswds";
/*
 * utils
 * import { getInsitutionApplication } from "@/src/app/utils/institutions";
 */

export default function Page({ params }: { params: { id: string } }) {
  const [institution] = useState<Record<string, any> | undefined>({
    questions: [
      "First and last name",
      "Email",
      "Phone",
      "No SAT score required.",
      "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?",
      "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?",
      "Where Do You Stand on Unconcealed Handguns?",
    ],
    institutionName: "California State University-Northridge",
    institutionId: 110608,
    recordType: "application",
  });
  // const [isLoading, setLoading] = useState(true);

  // eslint-disable-next-line no-console
  console.log(params);

  /*
   * useEffect(() => {
   *   getInsitutionApplication(Number(params.id)).then((application) => {
   *     setApplication(application);
   *     setLoading(false);
   *   });
   * }, [params.id]);
   */

  const { handleSubmit } = useForm();

  // eslint-disable-next-line no-console
  const onSubmit = (data: any) => console.log(data);

  const appq = institution?.questions;
  const hasApplicantQuestions =
    appq.includes("First and last name") ||
    appq.includes("email") ||
    appq.includes("Phone");

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="application_header">
          <p className="application_header-subtitle">
            NEW APPLICATION (2024-2025)
          </p>
          <h1 className="application_header-title">
            {institution?.institutionName}
          </h1>
        </div>
        <GridContainer className="application_questions">
          <Card>
            <CardHeader>Applicant info</CardHeader>
            <CardBody>
              <fieldset className="usa-fieldset">
                {" "}
                {hasApplicantQuestions && (
                  <>
                    <legend className="usa-legend usa-legend--large">
                      Name
                    </legend>
                    <label className="usa-label" htmlFor="given-name">
                      First or given name
                    </label>
                    <div className="usa-hint" id="gnHint">
                      For example, Jose, Darren, or Mai
                    </div>
                    <input
                      className="usa-input usa-input--xl"
                      id="given-name"
                      name="first-name"
                      aria-describedby="gnHint"
                    />
                    <label className="usa-label" htmlFor="family-name">
                      Last or family name
                    </label>
                    <div className="usa-hint" id="lnHint">
                      For example, Martinez Gonzalez, Gu, or Smith
                    </div>
                    <input
                      className="usa-input usa-input--xl"
                      id="family-name"
                      name="last-name"
                      aria-describedby="lnHint"
                    />
                  </>
                )}
              </fieldset>
            </CardBody>
          </Card>
          <input type="submit" />
        </GridContainer>
      </form>
    </main>
  );
}
