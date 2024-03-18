import { MouseEventHandler } from "react";
import {
  Button,
  ButtonGroup,
  ModalFooter,
  ModalHeading,
} from "@trussworks/react-uswds";

export const FilterModal = ({ closeHandler }: Props) => {
  const closeModal = () => {
    closeHandler();
    // TODO: Add tracking
  };
  return (
    <div
      role="dialog"
      className="usa-modal-wrapper is-visible"
      aria-labelledby="modal-1-heading"
      aria-describedby="modal-1-description"
    >
      <div
        data-testid="modalOverlay"
        className="usa-modal-overlay"
        onClick={closeModal}
      >
        <div className="usa-modal usa-modal--lg" tabIndex={-1}>
          <ModalHeading id="modal-1-heading">
            Are you sure you want to continue?
          </ModalHeading>
          <div className="usa-prose">
            <p id="modal-1-description">
              You have unsaved changes that will be lost.
            </p>
          </div>
          <ModalFooter>
            <ButtonGroup>
              <Button type="button" onClick={closeModal}>
                Continue without saving
              </Button>
              <Button
                type="button"
                onClick={closeModal}
                unstyled
                className="padding-105 text-center"
              >
                Go back
              </Button>
            </ButtonGroup>
          </ModalFooter>
          <button
            type="button"
            className="usa-button usa-modal__close"
            aria-label="Close this window"
            data-close-modal
            onClick={closeModal as MouseEventHandler}
          >
            X ICON
          </button>
        </div>
      </div>
    </div>
  );
};

interface Props {
  closeHandler: Function;
}
