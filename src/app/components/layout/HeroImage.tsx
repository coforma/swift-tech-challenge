import { GridContainer } from "@trussworks/react-uswds";
import Image from "next/image";
//assets
import hero from "../../assets/hero-image-transparent.png";

export const HeroImage = () => {
  return (
    <div className="hero_background">
      <GridContainer className="hero_container">
        <p className="hero_container-title">
          Find your dream <br /> school today
        </p>
        <Image src={hero} alt={"Hero image"} className="hero_container-image" />
      </GridContainer>
    </div>
  );
};
