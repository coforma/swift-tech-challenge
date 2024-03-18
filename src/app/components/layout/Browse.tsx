"use client";
import { useContext, useEffect, useState } from "react";
// components
import { Button } from "@trussworks/react-uswds";
import Image from "next/image";
import { CollegeCard, FilterModal, InstitutionContext } from "../../components";
// utils
import { College } from "../../types";
// icons
import arrow_upward from "../../assets/icons/arrow_upward.svg";

export const Browse = () => {
  const { institutionsArray } = useContext(InstitutionContext);
  const [scrollPosition, setScrollPosition] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollPosition(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollPosition]);

  const launchModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <div className="browse_header">
        <h1 className="browse_header-title"> Browse colleges </h1>
        <p className="site_text-intro browse_header-subtitle">
          Find the college thats right for you
        </p>
        <Button type="button" outline={true} onClick={launchModal}>
          Add filters
        </Button>
      </div>
      {isModalVisible && (
        <FilterModal closeHandler={() => setIsModalVisible(false)} />
      )}
      <ul className="usa-card-group">
        {institutionsArray?.map((school: College) => (
          <CollegeCard key={school.id} college={school} />
        ))}
      </ul>
      {scrollPosition && (
        <Button
          type="button"
          className="browse_back-to-top-button"
          onClick={() => window.scrollTo(0, 0)}
        >
          <Image
            src={arrow_upward}
            className="browse_back-to-top-button-icon"
            height="16"
            width="16"
            alt="arrow_upward icon"
            loading="eager"
          />
          Back to Top
        </Button>
      )}
    </>
  );
};
