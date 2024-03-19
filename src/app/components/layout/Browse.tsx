"use client";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// components
import { Button } from "@trussworks/react-uswds";
import Image from "next/image";
import {
  CollegeCard,
  FilterModal,
  InstitutionContext,
  Spinner,
} from "../../components";
// utils
import { College } from "../../types";
import { filterInstitutions } from "../../utils/filtering";
// icons
import arrow_upward from "../../assets/icons/arrow_upward.svg";

export const Browse = () => {
  const form = useForm();

  const { institutionsArray, filteredInstitutions, setFilteredInstitutions } =
    useContext(InstitutionContext);
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

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const applyFilters = async (filters: any) => {
    const filteredInstitutions = filterInstitutions(
      institutionsArray!,
      filters,
    );
    setFilteredInstitutions(filteredInstitutions);
    closeModal();
  };

  if (!filteredInstitutions) return <Spinner />;
  return (
    <>
      {filteredInstitutions && (
        <div className="browse_header">
          <h2 className="browse_header-title">Browse colleges</h2>
          <p className="site_text-intro browse_header-subtitle">
            Find the college thats right for you
          </p>
          <Button type="button" outline={true} onClick={launchModal}>
            Add filters
          </Button>
        </div>
      )}

      {isModalVisible && (
        <form id="" onSubmit={form.handleSubmit(applyFilters)}>
          <FilterModal
            closeHandler={closeModal}
            registerField={form.register}
          />
        </form>
      )}
      {filteredInstitutions?.length > 0 ? (
        <ul className="usa-card-group">
          {filteredInstitutions.map((school: College) => (
            <CollegeCard key={school.id} college={school} />
          ))}
        </ul>
      ) : (
        <p className="site_text-intro browse_header-subtitle">
          No matches found for filters.
        </p>
      )}
      {filteredInstitutions.length > 0 && scrollPosition && (
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
