"use client";
import mixpanel from "mixpanel-browser";
// components
import Image from "next/image";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
} from "@trussworks/react-uswds";
import Link from "next/link";
import { CardIcon } from "./CardIcon";
// utils
import {
  maskCurrency,
  maskThousands,
  maskPercentage,
} from "../../utils/masking";
//types
import { College } from "../../types";
import { unstable_noStore as noStore } from "next/cache";

export const CollegeCard = ({ college }: Props) => {
  noStore();
  return (
    <Card layout="flagDefault" headerFirst={true} className="card">
      <CardHeader className="card_header">
        <h2 className="card_header-title">{college.name}</h2>
        <p className="card_header-subtitle">{`${college.city}, ${college.state}`}</p>
      </CardHeader>
      <CardMedia className="card_media">
        <Image
          src={`https://${process.env.NEXT_PUBLIC_IMAGES_BUCKET}.s3.amazonaws.com/${college.id}.png`}
          alt={`AI generated image of ${college.name}`}
          width={400}
          height={400}
        />
      </CardMedia>
      <CardBody>
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
        >
          Apply
        </Link>
        <Link
          className="usa-button usa-button--outline card_footer-view-more-button"
          href={`/${college.id}`}
          onClick={() => mixpanel.track("click_view-details")}
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
