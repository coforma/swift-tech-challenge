"use client";
import { useContext, useEffect, useState } from "react";
// assets
import mail from "@/src/app/assets/mail.svg";
// components
import Image from "next/image";
import Link from "next/link";
import { ButtonGroup } from "@trussworks/react-uswds";
import { InstitutionContext, Spinner } from "@/src/app/components";
import ErrorPage from "@/src/app/error/page";
// types
import { College } from "@/src/app/types";

const filterCollege = (institutionsArray: College[], id: number) => {
  return institutionsArray.filter((college) => college.id == id)[0];
};

export default function ConfirmationPage({ params }: Props) {
  const { institutionsArray } = useContext(InstitutionContext);
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState<College>();
  useEffect(() => {
    if (institutionsArray) {
      setSelectedCollege(filterCollege(institutionsArray!, params.id));
      setLoading(false);
    }
  }, [institutionsArray, params.id]);

  const View = !selectedCollege ? (
    <ErrorPage />
  ) : (
    <>
      <div className="application_header">
        <h1 className="application_header-title">{selectedCollege.name}</h1>
        <p className="application_header-subtitle">
          NEW APPLICATION (2024-2025)
        </p>
      </div>
      <div className="application_confirmation">
        <div className="application_confirmation-container">
          <p className="application_confirmation-subtitle">Nice work!</p>
          <h1 className="application_confirmation-title">
            Application submitted
          </h1>
          <Image
            src={mail}
            className="application_confirmation-icon"
            height="30"
            width="30"
            alt="mail icon"
          />
          <p className="application_confirmation-notice">
            You should receive an email confirmation from the school.
          </p>
          <p className="application_confirmation-finalmessage">
            Take some time to relax and recharge before your next application.
          </p>
          <ButtonGroup>
            <Link className="usa-button usa-button--outline" href={`/`}>
              Browse colleges
            </Link>
            <Link
              className="usa-button usa-button--outline"
              href={`https://studentaid.gov/`}
            >
              Apply for financial aid
            </Link>
          </ButtonGroup>
        </div>
      </div>
    </>
  );

  return <>{loading ? <Spinner /> : View}</>;
}

type Props = {
  params: {
    id: number;
  };
};
