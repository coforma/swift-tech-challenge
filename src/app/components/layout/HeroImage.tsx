import { GridContainer } from "@trussworks/react-uswds";
import Image from "next/image";
//assets
import hero from "../../assets/hero-image-transparent.png";

export const HeroImage = () => {
  return (
    <div className="hero_background">
      <GridContainer className="hero_container">
        <div className="hero_container-text-container">
          <p className="hero_container-title">Find your dream school today</p>
          <p className="hero_container-subtitle">
            Browse and apply to schools using U.S. College Finder
          </p>
        </div>
        <Image
          src={hero}
          alt={"Hero image"}
          className="hero_container-image"
          priority
        />
      </GridContainer>
    </div>
  );
};
