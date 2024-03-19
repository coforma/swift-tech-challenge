"use client";
import { useContext, useEffect, useState } from "react";
// assets
import mail from "@/src/app/assets/mail.png";
// components
import Image from "next/image";
import Link from "next/link";
import { InstitutionContext, Spinner } from "@/src/app/components";
import ErrorPage from "@/src/app/error/page";
// types
import { College } from "@/src/app/types";

const filterCollege = (institutionData: College[], id: number) => {
  return institutionData.filter((college) => college.id == id)[0];
};

export default function ConfirmationPage({ params }: Props) {
  const { institutionData } = useContext(InstitutionContext);
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState<College>();
  useEffect(() => {
    if (institutionData) {
      setSelectedCollege(filterCollege(institutionData!, params.id));
      setLoading(false);
    }
  }, [institutionData, params.id]);

  const View = !selectedCollege ? (
    <ErrorPage />
  ) : (
    <>
      <p>NEW APPLICATION (2024-2025)</p>
      <p>{selectedCollege.name}</p>
      <div>
        <p>Nice work!</p>
        <h1>Application submitted</h1>
        <Image
          src={mail}
          className="icon-mail"
          height="30"
          width="30"
          alt="mail icon"
        />
        <p>You should receive an email confirmation from the school.</p>
        <p>
          Take some time to relax and recharge before your next application.
        </p>
        <Link className="usa-button usa-button--outline" href={`/`}>
          Browse colleges
        </Link>
        <Link
          className="usa-button usa-button--outline"
          href={`https://studentaid.gov/`}
        >
          Apply for financial aid
        </Link>
      </div>
    </>
  );

  return <main>{loading ? <Spinner /> : View}</main>;
}

type Props = {
  params: {
    id: number;
  };
};
