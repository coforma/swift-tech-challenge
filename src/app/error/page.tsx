import { ButtonGroup, GridContainer } from "@trussworks/react-uswds";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <GridContainer>
      There was an error
      <ButtonGroup>
        <Link href="/" className="usa-button">
          Visit homepage
        </Link>
      </ButtonGroup>
    </GridContainer>
  );
}
