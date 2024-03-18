"use client";
import mixpanel from "mixpanel-browser";
import { useRouter } from "next/navigation";
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

export const CollegeCard = ({ college }: Props) => {
  const router = useRouter();
  return (
    <Card
      layout="flagDefault"
      headerFirst={true}
      className="card"
      onClick={() => router.push(`/${college.id}`)}
    >
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
          href={`${college.id}/apply`}
          onClick={() => mixpanel.track("click_launch-application")}
        >
          Apply
        </Link>
      </CardFooter>
    </Card>
  );
};

type Props = {
  college: College;
};
