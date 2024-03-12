import { GridContainer } from "@trussworks/react-uswds";
import { College, CollegeType } from "./types";
import { CollegeCard } from "./components/cards/CollegeCard";

export default function Home() {
  const cards: College[] = [
    {
      id: 0,
      img: "",
      name: "Name of school",
      city: "City",
      state: "State",
      description:
        "Smiley was monstrous proud of his frog, and well he might be, for fellers that had traveled and been everywheres, all said he laid over any frog that ever they see.",
      type: CollegeType.PUBLIC,
      populationAmount: 17560,
      gradRate: 56,
      avgCost: 57000,
    },
    {
      id: 1,
      img: "",
      name: "Name of private school",
      city: "City",
      state: "State",
      type: CollegeType.PRIVATE,
      populationAmount: 9560,
      gradRate: 86,
      avgCost: 102000,
    },
  ];

  return (
    <main>
      <GridContainer>
        <h1> Browse Schools </h1>
        <p> Find the school that&apos;s right for you</p>
        <ul className="usa-card-group">
          {cards.map((card) => (
            <CollegeCard key={card.id} card={card} />
          ))}
        </ul>
      </GridContainer>
    </main>
  );
}
