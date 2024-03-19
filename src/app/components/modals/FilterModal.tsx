"use client";
import { MouseEventHandler, useContext } from "react";
import {
  Button,
  ButtonGroup,
  ModalFooter,
  ModalHeading,
} from "@trussworks/react-uswds";
import Image from "next/image";
import close from "../../assets/icons/close.svg";
import { CollegeType, stateOptions } from "../../types";

import { CheckboxField } from "../form/CheckboxField";
import { DropdownField } from "../form/DropdownField";
import { useForm } from "react-hook-form";
import { InstitutionContext } from "../institutions/InstitutionProvider";
import { filterInstitutions } from "../../utils/filtering";

export const FilterModal = ({ closeHandler }: Props) => {
  const form = useForm();
  const { institutionsArray, setFilteredInstitutions } =
    useContext(InstitutionContext);
  // const [filterState, setFilterState] = useState<Object | undefined>(undefined);

  const closeModal = () => {
    closeHandler();
    // TODO: Add tracking
  };

  // TODO: Add tracking
  const applyFilters = async (filters: any) => {
    // TODO: persist filters
    const filteredInstitutions = filterInstitutions(
      institutionsArray!,
      filters,
    );
    setFilteredInstitutions(filteredInstitutions);
    closeHandler();
  };

  return (
    <div
      role="dialog"
      className="usa-modal-wrapper is-visible"
      aria-labelledby="modal-1-heading"
      aria-describedby="modal-1-description"
    >
      <div data-testid="modalOverlay" className="usa-modal-overlay">
        <form id="" onSubmit={form.handleSubmit(applyFilters)}>
          <div className="usa-modal usa-modal--lg" tabIndex={-1}>
            <ModalHeading>Filter schools</ModalHeading>
            <div className="filter_section">
              <p className="filter_section-heading">Location</p>
              <DropdownField
                id="filter-state"
                name="filter-state"
                label="State"
                required={false}
                options={stateOptions}
                registerField={form.register}
              />
            </div>
            <div className="filter_section">
              <p className="filter_section-heading">Type</p>
              <CheckboxField
                id="filter-type"
                name="filter-type"
                options={[
                  { id: CollegeType.PUBLIC, label: CollegeType.PUBLIC },
                  { id: CollegeType.PRIVATE_NP, label: CollegeType.PRIVATE_NP },
                  { id: CollegeType.PRIVATE_FP, label: CollegeType.PRIVATE_FP },
                ]}
                registerField={form.register}
              />
            </div>
            <div className="filter_section">
              <p className="filter_section-heading">Undergraduate population</p>
              <CheckboxField
                id="filter-undergrad-pop"
                name="filter-undergrad-pop"
                options={[
                  { id: "<2", label: "Less than 2,000" },
                  { id: "2-5", label: "2,000 - 5,000" },
                  { id: "5-10", label: "5,000 - 10,000" },
                  { id: "10-20", label: "10,000 - 20,000" },
                  { id: ">20", label: "20,000 +" },
                ]}
                registerField={form.register}
              />
            </div>
            <div className="filter_section">
              <p className="filter_section-heading">Graduation rate</p>
              <CheckboxField
                id="filter-grad-rate"
                name="filter-grad-rate"
                options={[
                  { id: ">90", label: "More than 90%" },
                  { id: "60-90", label: "60% - 90%" },
                  { id: "30-60", label: "30% - 60%" },
                  { id: "<30", label: "Less than 30%" },
                ]}
                registerField={form.register}
              />
            </div>
            <div className="filter_section">
              <p className="filter_section-heading">Average cost per year</p>
              <CheckboxField
                id="filter-avg-cost-per-year"
                name="filter-avg-cost-per-year"
                options={[
                  { id: "<10", label: "Less than $10,000" },
                  { id: "10-20", label: "$10,000 - $20,000" },
                  { id: "20-40", label: "$20,000 - $40,000" },
                  { id: "40-60", label: "$40,000 - $60,000" },
                  { id: ">60", label: "More than $60,000" },
                ]}
                registerField={form.register}
              />
            </div>
            <ModalFooter>
              <ButtonGroup>
                <Button type="submit">Apply Filters</Button>
                <Button
                  type="button"
                  onClick={closeModal}
                  unstyled
                  className="padding-105 text-center"
                >
                  Close
                </Button>
              </ButtonGroup>
            </ModalFooter>
            <button
              type="button"
              className="usa-button usa-modal__close filter_close"
              aria-label="Close this window"
              data-close-modal
              onClick={closeModal as MouseEventHandler}
            >
              <Image
                src={close}
                className="filter-modal_icon-image"
                height="30"
                width="30"
                alt="close icon"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface Props {
  closeHandler: Function;
}
