import { GridContainer } from "@trussworks/react-uswds";
import Image from "next/image";
//assets
import hero from "../../assets/hero-image.png";

export const HeroImage = () => {
  return (
    <GridContainer className="hero_container">
      <p className="hero_container-title">Find your dream school today</p>
      <Image src={hero} alt={"Hero image"} className="hero_container-image" />
    </GridContainer>
  );
};
