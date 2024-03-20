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
import { College, FilterShape } from "../../types";
// utils
import { filterInstitutions } from "../../utils/filtering";
import { get20Institutions } from "../../utils/institutions";

const defaultFilters = {
  "filter-type": ["Public", "Private nonprofit", "Private for-profit"],
  "filter-undergrad-pop": ["<2", "2-5", "5-10", "10-20", ">20"],
  "filter-avg-cost-per-year": ["<10$", "10-20$", "20-40$", "40-60$", ">60$"],
  "filter-state": "- Select -",
  "filter-grad-rate": [">90", "60-90", "30-60", "<30"],
};

export const Browse = () => {
  const { institutionsArray, setFilteredInstitutions } =
    useContext(InstitutionContext);
  const [instArray, setInstArray] = useState<College[]>([]);
  const [filterChips, setFilterChips] = useState<FilterShape>(defaultFilters);
  const [hasFiltered, setHasFiltered] = useState<boolean>(false);
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

  const checkFilterEquality = (selectedFilters: any, defaultFilters: any) => {
    const sortObject = (obj: any) =>
      Object.entries(obj)
        .sort((a, b) => (a > b ? 1 : -1))
        .map((el: any[]) =>
          typeof el[1] === "string"
            ? el[1]
            : el[1].sort((a: any, b: any) => (a > b ? 1 : -1)),
        );
    return (
      JSON.stringify(sortObject(selectedFilters)) ===
      JSON.stringify(sortObject(defaultFilters))
    );
  };

  const applyFilters = async (filters: any) => {
    const filtersAreEqual = checkFilterEquality(filters, defaultFilters);
    if (filtersAreEqual) {
      await load20Institutions(true);
    } else {
      const filteredColleges = filterInstitutions(institutionsArray!, filters);
      setFilteredInstitutions(filteredColleges);
      setInstArray(filteredColleges);
      setFilterChips(filters);
      setHasFiltered(true);
      setLastScannedKey(undefined);
      setShowPagination(false);
    }
    closeModal();
  };

  const load20Institutions = async (shouldReset?: boolean) => {
    try {
      let newArray;
      const { colleges: result, lastKey } =
        await get20Institutions(lastScannedKey);
      if (shouldReset) {
        newArray = Array(...result);
      } else {
        newArray = Array(...instArray, ...result);
      }
      setInstArray(newArray);
      setFilterChips(defaultFilters);
      setLastScannedKey(lastKey);
      setShowPagination(true);
      setLoading(false);
      setHasFiltered(false);
    } catch (e: any) {
      throw new Error("Institution data could not be loaded.");
    }
  };

  useEffect(() => {
    // loads initial 20 institutions to display
    load20Institutions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className="browse_filter-chips">
          {checkFilterEquality(filterChips, defaultFilters) || !hasFiltered ? (
            <p className="browse_chip">No filters applied</p>
          ) : (
            <>
              {filterChips["filter-state"] && (
                <p className="browse_chip">{`State (${filterChips["filter-state"] === "- Select -" ? "All" : filterChips["filter-state"]})`}</p>
              )}
              {filterChips["filter-type"] && (
                <p
                  className={`browse_chip ${filterChips["filter-type"].length === 0 ? "browse_chip-error" : ""}`}
                >{`Types (${filterChips["filter-type"].length === 3 ? "All" : filterChips["filter-type"].length})`}</p>
              )}
              {filterChips["filter-undergrad-pop"] && (
                <p
                  className={`browse_chip ${filterChips["filter-type"].length === 0 ? "browse_chip-error" : ""}`}
                >{`Population Ranges (${filterChips["filter-undergrad-pop"].length === 5 ? "All" : filterChips["filter-undergrad-pop"].length})`}</p>
              )}
              {filterChips["filter-avg-cost-per-year"] && (
                <p
                  className={`browse_chip ${filterChips["filter-type"].length === 0 ? "browse_chip-error" : ""}`}
                >{`Cost Ranges (${filterChips["filter-avg-cost-per-year"].length === 5 ? "All" : filterChips["filter-avg-cost-per-year"].length})`}</p>
              )}
              {filterChips["filter-grad-rate"] && (
                <p
                  className={`browse_chip ${filterChips["filter-type"].length === 0 ? "browse_chip-error" : ""}`}
                >{`Graduation Rate Ranges (${filterChips["filter-grad-rate"].length === 4 ? "All" : filterChips["filter-grad-rate"].length})`}</p>
              )}
            </>
          )}
        </div>
        <Button type="button" outline={true} onClick={launchModal}>
          {hasFiltered ? "Edit filters" : "Add filters"}
        </Button>
      </div>
      <USWDSForm initialValues={defaultFilters} submit={applyFilters}>
        {isModalVisible && <FilterModal closeHandler={closeModal} />}
      </USWDSForm>
      {instArray.length > 0 ? (
        InstList()
      ) : (
        <p className="site_text-intro browse_header-subtitle">
          No matches found. Please update your filters.
        </p>
      )}
      {showPagination && (
        <Button
          type="button"
          className="browse_load-more-button"
          onClick={() => load20Institutions()}
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
