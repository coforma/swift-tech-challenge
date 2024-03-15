// components
import { Button, GridContainer } from "@trussworks/react-uswds";
import { CollegeCard, HeroImage } from "./components";
// utils
import { getInstitutions } from "@/src/app/utils/institutions";
import { College } from "./types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const institutions = await getInstitutions();
  return (
    <main>
      <HeroImage />
      <GridContainer>
        <div className="browse_header">
          <h1 className="browse_header-title"> Browse colleges </h1>
          <p className="site_text-intro browse_header-subtitle">
            Find the college thats right for you
          </p>
          <Button type={"button"} outline={true}>
            Add filters
          </Button>
        </div>
        <ul className="usa-card-group">
          {institutions.map((school: College) => (
            <CollegeCard key={school.id} college={school} />
          ))}
        </ul>
      </GridContainer>
    </main>
  );
}
