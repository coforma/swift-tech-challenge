import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
} from "@trussworks/react-uswds";
import { College, CollegeType } from "./types";

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
      <ul className="usa-card-group">
        {cards.map((card) => (
          <Card key={card.id} layout="flagDefault" headerFirst={true}>
            <CardHeader>
              <h2>{card.name}</h2>
            </CardHeader>
            <CardMedia>{card.img}</CardMedia>
            <CardBody>{card?.description && card.description}</CardBody>
            <CardFooter>
              <ButtonGroup>
                <Button type={"button"}>Apply to this school</Button>
                <Button type={"button"} outline={true}>
                  More information
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </main>
  );
}
