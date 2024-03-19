// components
import { GovBanner, GridContainer, Header } from "@trussworks/react-uswds";
import Link from "next/link";

export const PageHeader = () => {
  return (
    <>
      <GovBanner />
      <Header basic={true} className="header">
        <div id="main-header-nav" aria-label="Main" role="navigation">
          <GridContainer>
            <Link href="/" className="header_logo">
              <div className="header_logo-title">
                <h1>U.S. College Finder</h1>
              </div>
              <div className="header_logo-subtitle">
                <p>From the Department of Higher Education</p>
              </div>
            </Link>
          </GridContainer>
        </div>
      </Header>
    </>
  );
};
