import { GridContainer } from "@trussworks/react-uswds";
import NotFoundIcon from "./assets/not_found.svg";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <GridContainer>
        <div className="notfound_container">
          <h1 className="notfound_h1">404</h1>
          <p className="site_text-intro">
            We couldn&apos;t find the page you&apos;re looking for
          </p>
          <Image
            src={NotFoundIcon}
            height="125"
            width="125"
            alt="not found icon"
          />
          <p className="padding-y-1 site_text-p">
            If you typed the URL directly, check your spelling and
            capitalization.
            <br />
            Our URLs look like this: <b>{`${"<agency.gov/example-one>"}.`}</b>
          </p>
          <Link href="/" className="usa-button notfound_link">
            Browse Colleges
          </Link>
        </div>
      </GridContainer>
    </>
  );
}
