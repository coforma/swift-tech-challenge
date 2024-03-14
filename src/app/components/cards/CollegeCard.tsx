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
import {
  convertToThousandsSeparatedString,
  convertPercentage,
} from "../../utils/masking";

export const CollegeCard = ({ college }: Props) => {
  return (
    <Card layout="flagDefault" headerFirst={true} className="card">
      <CardHeader>
        <h2 className="card_header-title">{college.name}</h2>
        <p className="card_header-subtitle">{`${college.city}, ${college.state}`}</p>
      </CardHeader>
      <CardMedia>{college.img}</CardMedia>
      <CardBody>
        <p className="card_desc">{college.description}</p>
        <div className="card_grid">
          <CardIcon subtitle={"Type"} highlight={college.type} />
          <CardIcon
            subtitle={"Student population"}
            highlight={convertToThousandsSeparatedString(
              college.populationAmount,
            )}
          />
          <CardIcon
            subtitle={"Graduation rate"}
            highlight={`${convertPercentage(college.gradRate)} %`}
          />
          <CardIcon
            subtitle={"Average cost per year"}
            highlight={`$${convertToThousandsSeparatedString(college.avgCost)}`}
          />
        </div>
      </CardBody>
      <CardFooter>
        <ButtonGroup data-testid="card-button-group">
          <Button name="apply" type={"button"}>
            Apply
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

type Props = {
  college: College;
};
