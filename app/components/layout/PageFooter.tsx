// components
import { Footer, GridContainer, NavList } from "@trussworks/react-uswds";
import Link from "next/link";
// styles
import styles from "./PageFooter.module.scss";

export const PageFooter = () => {
  return (
    <Footer
      className={styles.footer}
      size="medium"
      primary={
        <GridContainer>
          <div className={styles.primary_section}>
            <div className={styles.logo}>
              <div className={styles.logo_image}>Logo</div>
            </div>
            <div className={styles.logo}>
              <Link className={styles.logo_title} href="https://highered.gov">
                highered.gov
              </Link>
              <p className={styles.logo_description}>
                An official website of the Department of Higher Ed
              </p>
            </div>
          </div>
        </GridContainer>
      }
      secondary={
        <>
          <nav>
            <NavList
              className={styles.nav}
              items={[
                <Link
                  href="#"
                  key={"footer-nav-link-1"}
                  className={styles.nav_item}
                >
                  About
                </Link>,
                <Link
                  href="#"
                  key={"footer-nav-link-2"}
                  className={styles.nav_item}
                >
                  Accessibility support
                </Link>,
                <Link
                  href="#"
                  key={"footer-nav-link-3"}
                  className={styles.nav_item}
                >
                  FOIA Requests
                </Link>,
                <Link
                  href="#"
                  key={"footer-nav-link-4"}
                  className={styles.nav_item}
                >
                  No FEAR Act data
                </Link>,
                <Link
                  href="#"
                  key={"footer-nav-link-5"}
                  className={styles.nav_item}
                >
                  Performance reports
                </Link>,
                <Link
                  href="#"
                  key={"footer-nav-link-6"}
                  className={styles.nav_item}
                >
                  Office of the Inspector General
                </Link>,
                <Link
                  href="#"
                  key={"footer-nav-link-6"}
                  className={styles.nav_item}
                >
                  Privacy Policy
                </Link>,
              ]}
            />
          </nav>
          <p className={styles.more}>
            Looking for U.S. government information and services?{" "}
            <Link href="https://usa.gov" className={styles.more_link}>
              Visit USA.gov
            </Link>
          </p>
        </>
      }
    />
  );
};
