import { GridContainer } from "@trussworks/react-uswds";
import { College, CollegeType } from "./types";
import { CollegeCard, HeroImage } from "./components";

export default function Home() {
  const cards: College[] = [
    {
      id: 0,
      img: "",
      name: "Name of school",
      description: "School Description",
      city: "City",
      state: "State",
      type: CollegeType.PUBLIC,
      populationAmount: 123,
      gradRate: 65,
      avgCost: 17980,
    },
    {
      id: 1,
      img: "",
      name: "Second Name of school",
      description: "School Description",
      city: "City",
      state: "State",
      type: CollegeType.PRIVATE,
      populationAmount: 123,
      gradRate: 65,
      avgCost: 17980,
    },
  ];

  return (
    <main>
      <HeroImage />
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
