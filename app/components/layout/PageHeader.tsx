// components
import { GovBanner, GridContainer, Header } from "@trussworks/react-uswds";
// styles
import styles from "./PageHeader.module.scss";

export const PageHeader = () => {
  return (
    <>
      <GovBanner />
      <Header basic={true} className={styles.header}>
        <GridContainer>
          <div className={styles.logo}>
            <div className={styles.logo_title}>
              <p>U.S. College Finder</p>
            </div>
            <div className={styles.logo_subtitle}>
              <p>From the Department of Higher Education</p>
            </div>
          </div>
        </GridContainer>
      </Header>
    </>
  );
};
