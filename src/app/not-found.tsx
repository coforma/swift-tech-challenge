import { ButtonGroup, GridContainer } from "@trussworks/react-uswds";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <GridContainer>
        <h1>Page not found</h1>
        <p className="site_text-intro">
          We’re sorry, we can’t find the page you&apos;re looking for. The site
          administrator may have removed it, changed its location, or made it
          otherwise unavailable.
        </p>
        <p className="padding-y-1 site_text-p">
          If you typed the URL directly, check your spelling and capitalization.
          Our URLs look like this: <b>{`${"<agency.gov/example-one>"}.`}</b>
        </p>
        <p className="padding-y-2 site_text-p">
          Visit our homepage for helpful tools and resources, or contact us and
          we’ll point you in the right direction.
        </p>
        <ButtonGroup className="notfound_button-group">
          <Link href="/" className="usa-button">
            Visit homepage
          </Link>
          <Link href="#" className="usa-button usa-button--outline">
            Contact us
          </Link>
        </ButtonGroup>
        <p className="site_text-p">For immediate assistance: </p>
        <ul className="margin-y-0 usa-list">
          <li>
            <Link href="#">Start a live chat with us</Link>
          </li>
          <li>
            Call <a href="tel:555-555-GOVT">(555) 555-GOVT</a>
          </li>
        </ul>
        <p className="padding-y-2 site_text-p notfound_errorcode">
          Error Code: 404
        </p>
      </GridContainer>
    </>
  );
}
