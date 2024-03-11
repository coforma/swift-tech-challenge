import {
  GovBanner,
  Grid,
  GridContainer,
  Header,
} from "@trussworks/react-uswds";
import React from "react";
import "../../styles/styles.scss";

export const PageHeader = () => {
  return (
    <>
      <GovBanner />
      <Header basic={true} className="header">
        <GridContainer className="usa-nav-container">
          <Grid className="usa-navbar">
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
          </Grid>
        </GridContainer>
      </Header>
    </>
  );
};
