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

export const BannerCard = ({ college }: Props) => {
  return (
    <Card layout="flagDefault" headerFirst={true} className="card card_banner">
      <div className="card_banner-container">
        <CardMedia>
          <Image
            src={`https://swift-institution-images-public.s3.amazonaws.com/${college.id}.png`}
            alt={`AI generated image of ${college.name}`}
            width={400}
            height={400}
          />
        </CardMedia>
        <CardBody>
          <CardHeader className="card_header">
            <h2 className="card_header-title">{college.name}</h2>
            <p className="card_header-subtitle">{`${college.city}, ${college.state}`}</p>
          </CardHeader>
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
          <CardFooter>
            <Link
              className="usa-button card_banner-apply-button"
              href={`${college.id}/apply`}
              onClick={() => mixpanel.track("click_launch-application")}
            >
              Apply
            </Link>
          </CardFooter>
        </CardBody>
      </div>
    </Card>
  );
};

type Props = {
  college: College;
};
