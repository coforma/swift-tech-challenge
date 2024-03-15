"use client";
import { useContext } from "react";
// components
import { Button } from "@trussworks/react-uswds";
import { CollegeCard, InstitutionContext } from "../../components";
// utils
import { College } from "../../types";

export const Browse = () => {
  const { institutionData } = useContext(InstitutionContext);
  return (
    <>
      <div className="browse_header">
        <h1 className="browse_header-title"> Browse colleges </h1>
        <p className="site_text-intro browse_header-subtitle">
          Find the college thats right for you
        </p>
        <Button type={"button"} outline={true}>
          Add filters
        </Button>
      </div>
      <ul className="usa-card-group">
        {institutionData?.map((school: College) => (
          <CollegeCard key={school.id} college={school} />
        ))}
      </ul>
    </>
  );
};
