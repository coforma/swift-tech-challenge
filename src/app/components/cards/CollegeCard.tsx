"use client";
import mixpanel from "mixpanel-browser";
// components
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
} from "@trussworks/react-uswds";
import Link from "next/link";
import { CardIcon } from "./CardIcon";
import { ImageWithFallback } from "../utilities/ImageWithFallback";
// utils
import {
  maskCurrency,
  maskThousands,
  maskPercentage,
} from "../../utils/masking";
//types
import { College } from "../../types";

export const CollegeCard = ({ college }: Props) => {
  return (
    <Card layout="flagDefault" headerFirst={true} className="card">
      <CardMedia className="card_media">
        <ImageWithFallback
          src={`https://swift-institution-images-public.s3.amazonaws.com/${college.id}.png`}
          alt={`AI generated image of ${college.name}`}
          width={400}
          height={400}
        />
      </CardMedia>
      <CardHeader className="card_header">
        <p className="card_header-title">{college.name}</p>
        <p className="card_header-subtitle">{`${college.city}, ${college.state}`}</p>
      </CardHeader>
      <CardBody className="card_body">
        <p className="card_desc">{college.description}</p>
        <div className="card_grid">
          <CardIcon
            subtitle={"Type"}
            highlight={college.type}
            icon="account_balance"
          />
          <CardIcon
            subtitle={"Undergraduate population"}
            highlight={maskThousands(college.population)}
            icon="people"
          />
          <CardIcon
            subtitle={"Graduation rate"}
            highlight={maskPercentage(college.completionRate)}
            icon="school"
          />
          <CardIcon
            subtitle={"Average cost per year"}
            highlight={maskCurrency(college.avgCost)}
            icon="local_offer"
          />
        </div>
      </CardBody>
      <CardFooter className="card_footer">
        <Link
          className="usa-button card_footer-apply-button"
          href={`/${college.id}/apply`}
          onClick={() => mixpanel.track("click_launch-application")}
          aria-label={`Apply to ${college.name}`}
        >
          Apply
        </Link>
        <Link
          className="usa-button usa-button--outline card_footer-view-more-button"
          href={`/${college.id}`}
          onClick={() => mixpanel.track("click_view-details")}
          aria-label={`View more info about ${college.name}`}
        >
          View more
        </Link>
      </CardFooter>
    </Card>
  );
};

type Props = {
  college: College;
};
