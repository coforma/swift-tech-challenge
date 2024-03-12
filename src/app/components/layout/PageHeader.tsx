// components
import { GovBanner, GridContainer, Header } from "@trussworks/react-uswds";

export const PageHeader = () => {
  return (
    <>
      <GovBanner />
      <Header basic={true} className="header">
        <div
          id="main-header-nav"
          aria-label="main-header-nav"
          role="navigation"
        >
          <GridContainer>
            <div className="header_logo">
              <div className="header_logo-title">
                <p>U.S. College Finder</p>
              </div>
              <div className="header_logo-subtitle">
                <p>From the Department of Higher Education</p>
              </div>
            </div>
          </GridContainer>
        </div>
      </Header>
    </>
  );
};
