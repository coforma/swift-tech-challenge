// components
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
} from "@trussworks/react-uswds";
import { CardIcon } from "./CardIcon";
//types
import { College } from "../../types";

export const CollegeCard = ({ card }: Props) => {
  return (
    <Card layout="flagDefault" headerFirst={true} className="card">
      <CardHeader>
        <h3 className="card_header-title">{card.name}</h3>
        <p className="card_header-subtitle">{`${card.city}, ${card.state}`}</p>
      </CardHeader>
      <CardMedia>{card.img}</CardMedia>
      <CardBody>
        {card?.description && <p>{card.description}</p>}
        <div className="card_grid">
          <CardIcon subtitle={"Type"} highlight={card.type} />
          <CardIcon
            subtitle={"Student population"}
            highlight={card.populationAmount}
          />
          <CardIcon subtitle={"Graduation rate"} highlight={card.gradRate} />
          <CardIcon
            subtitle={"Average cost per year"}
            highlight={card.avgCost}
          />
        </div>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button type={"button"}>Apply to this school</Button>
          <Button type={"button"} outline={true}>
            More information
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

type Props = {
  card: College;
};
