// components
import { Footer, GridContainer, NavList } from "@trussworks/react-uswds";
import Link from "next/link";

export const PageFooter = () => {
  return (
    <Footer
      className="footer"
      size="medium"
      primary={
        <GridContainer>
          <div className="footer_primary-section">
            <div className="footer_logo">
              <div className="footer_logo-img">Logo</div>
            </div>
            <div className="footer_logo">
              <Link className="footer_logo-title" href="https://highered.gov">
                highered.gov
              </Link>
              <p className="footer_logo-description">
                An official website of the Department of Higher Ed
              </p>
            </div>
          </div>
        </GridContainer>
      }
      secondary={
        <>
          <nav className="footer_secondary-section">
            <NavList
              className={"footer_nav"}
              items={[
                <Link
                  href="#"
                  key="footer-nav-link-1"
                  className="footer_nav-item"
                >
                  About
                </Link>,
                <Link
                  href="#"
                  key="footer-nav-link-2"
                  className="footer_nav-item"
                >
                  Accessibility support
                </Link>,
                <Link
                  href="#"
                  key="footer-nav-link-3"
                  className="footer_nav-item"
                >
                  FOIA Requests
                </Link>,
                <Link
                  href="#"
                  key="footer-nav-link-4"
                  className="footer_nav-item"
                >
                  No FEAR Act data
                </Link>,
                <Link
                  href="#"
                  key="footer-nav-link-5"
                  className="footer_nav-item"
                >
                  Performance reports
                </Link>,
                <Link
                  href="#"
                  key="footer-nav-link-6"
                  className="footer_nav-item"
                >
                  Office of the Inspector General
                </Link>,
                <Link
                  href="#"
                  key="footer-nav-link-7"
                  className="footer_nav-item"
                >
                  Privacy Policy
                </Link>,
              ]}
            />
          </nav>
          <p className="footer_more">
            Looking for U.S. government information and services?{" "}
            <Link href="https://usa.gov" className={"footer_more-link"}>
              Visit USA.gov
            </Link>
          </p>
        </>
      }
    />
  );
};
