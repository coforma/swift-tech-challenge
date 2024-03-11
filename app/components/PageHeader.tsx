import { GovBanner, GridContainer, Header } from "@trussworks/react-uswds";
import React from "react";
import "../../styles/styles.scss";

export const PageHeader = () => {
  return (
    <>
      <GovBanner />
      <Header basic={true} className="header">
        <GridContainer>
          <div className="logo">
            <div className="logo-title">
              <em className="text-no-italic">U.S. College Finder</em>
            </div>
            <div className="logo-subtitle">
              <em className="text-no-italic">
                From the Department of Higher Education
              </em>
            </div>
          </div>
        </GridContainer>
      </Header>
    </>
  );
};
