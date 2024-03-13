// components
import { GridContainer } from "@trussworks/react-uswds";
import { CollegeCard } from "./components/cards/CollegeCard";
// utils
import { getInstitutions } from "./utils/institutions";

export default async function Home() {
  const cards = await getInstitutions();
  return (
    <main>
      <GridContainer>
        <h1> Browse Schools </h1>
        <ul className="usa-card-group">
          {cards.map((card) => (
            <CollegeCard key={card.id} college={card} />
          ))}
        </ul>
      </GridContainer>
    </main>
  );
}
