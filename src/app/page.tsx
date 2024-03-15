// components
import { GridContainer } from "@trussworks/react-uswds";
import { HeroImage } from "./components";
// utils
import { Browse } from "./components/layout/Browse";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main>
      <HeroImage />
      <GridContainer>
        <Browse />
      </GridContainer>
    </main>
  );
}
