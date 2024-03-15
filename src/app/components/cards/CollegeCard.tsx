"use client";
import mixpanel from "mixpanel-browser";
// components
import Image from "next/image";
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
// types
import { College } from "../../types";

export const CollegeCard = ({ college }: Props) => {
  return (
    <Card layout="flagDefault" headerFirst={true} className="card">
      <CardHeader className="card_header">
        <h2 className="card_header-title">{college.name}</h2>
        <p className="card_header-subtitle">{`${college.city}, ${college.state}`}</p>
      </CardHeader>
      <CardMedia className="card_media">
        <Image
          src={`https://swift-institution-images-public.s3.amazonaws.com/${college.id}.png`}
          alt={`AI generated image of ${college.name}`}
          width={400}
          height={400}
        />
      </CardMedia>
      <CardBody>
        <p className="card_desc">{college.description}</p>
        <div className="card_grid">
          <CardIcon subtitle={"Type"} highlight={college.type} />
          <CardIcon
            subtitle={"Student population"}
            highlight={college.populationAmount}
          />
          <CardIcon subtitle={"Graduation rate"} highlight={college.gradRate} />
          <CardIcon
            subtitle={"Average cost per year"}
            highlight={college.avgCost}
          />
        </div>
      </CardBody>
      <CardFooter className="card_footer">
        <ButtonGroup>
          <Button
            name="apply"
            type={"button"}
            onClick={() => mixpanel.track("click_launch-application")}
          >
            Apply to this school
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

type Props = {
  college: College;
};
