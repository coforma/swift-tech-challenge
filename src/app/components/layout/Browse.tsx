"use client";
import { useContext, useEffect, useState } from "react";
// components
import { Button } from "@trussworks/react-uswds";
import {
  CollegeCard,
  FilterModal,
  InstitutionContext,
  Spinner,
  USWDSForm,
} from "../../components";
// types
import { College } from "../../types";
// utils
import { filterInstitutions } from "../../utils/filtering";
import { get20Institutions } from "../../utils/institutions";

export const Browse = () => {
  const { institutionsArray, setFilteredInstitutions } =
    useContext(InstitutionContext);
  const [instArray, setInstArray] = useState<College[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [lastScannedKey, setLastScannedKey] = useState<any | undefined>();
  const [scrollPosition, setScrollPosition] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [showPagination, setShowPagination] = useState<boolean>(true);

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
    const filteredColleges = filterInstitutions(institutionsArray!, filters);
    setFilteredInstitutions(filteredColleges);
    setInstArray(filteredColleges);
    setLastScannedKey(undefined);
    setShowPagination(false);
    closeModal();
  };

  const load20Institutions = async () => {
    try {
      const { colleges: result, lastKey } =
        await get20Institutions(lastScannedKey);
      const newArray = Array(...instArray, ...result);
      setInstArray(newArray);
      setLastScannedKey(lastKey);
      setShowPagination(true);
      setLoading(false);
    } catch (e: any) {
      throw new Error("Institution data could not be loaded.");
    }
  };

  useEffect(() => {
    // loads initial 20 institutions to display
    load20Institutions();
  }, []); // ← runs once on app load

  const InstList = () => {
    return (
      <ul className="usa-card-group">
        {instArray!.map((school: College) => (
          <CollegeCard key={school.id} college={school} />
        ))}
      </ul>
    );
  };

  if (loading) return <Spinner />;
  return (
    <>
      <div className="browse_header">
        <h2 className="browse_header-title">Browse colleges</h2>
        <p className="site_text-intro browse_header-subtitle">
          Find the college that’s right for you
        </p>
        <Button type="button" outline={true} onClick={launchModal}>
          Add filters
        </Button>
      </div>
      <USWDSForm initialValues={{}} submit={applyFilters}>
        {isModalVisible && <FilterModal closeHandler={closeModal} />}
      </USWDSForm>
      {instArray.length > 0 ? (
        InstList()
      ) : (
        <p className="site_text-intro browse_header-subtitle">
          No matches found for filters.
        </p>
      )}
      {showPagination && (
        <Button
          type="button"
          className="browse_load-more-button"
          onClick={load20Institutions}
        >
          Load more
        </Button>
      )}
      {scrollPosition && (
        <Button
          type="button"
          className="usa-button usa-button--outline usa-button--unstyled browse_back-to-top-button"
          onClick={() => window.scrollTo(0, 0)}
        >
          Back to Top
        </Button>
      )}
    </>
  );
};
