// components
import { GridContainer } from "@trussworks/react-uswds";
import { CollegeCard, HeroImage } from "./components";
// utils
import { getInstitutions } from "@/src/app/utils/institutions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cards = await getInstitutions();
  return (
    <main>
      <HeroImage />
      <GridContainer>
        <div className="browse_header">
          <h1 className="browse_header-title"> Browse colleges </h1>
          <p className="site_text-intro browse_header-subtitle">
            Find the college thats right for you
          </p>
        </div>
        <ul className="usa-card-group">
          {cards.map((card) => (
            <CollegeCard key={card.id} college={card} />
          ))}
        </ul>
      </GridContainer>
    </main>
  );
}
