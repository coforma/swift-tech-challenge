"use client";

import { MouseEventHandler } from "react";
//components
import Image from "next/image";
import {
  Button,
  ButtonGroup,
  ModalFooter,
  ModalHeading,
} from "@trussworks/react-uswds";
//assets
import close from "../../assets/icons/close.svg";
import Link from "next/link";

export const CloseAppModal = ({ closeHandler }: Props) => {
  return (
    <div
      role="dialog"
      className="usa-modal-wrapper is-visible"
      aria-labelledby="modal-1-heading"
      aria-describedby="modal-1-description"
    >
      <div data-testid="modalOverlay" className="usa-modal-overlay">
        <div className="usa-modal usa-close-app-modal--lg" tabIndex={-1}>
          <ModalHeading>
            Are you sure you want to close the application?
          </ModalHeading>
          <p>You have unsaved changes that will be lost. </p>
          <ModalFooter>
            <ButtonGroup>
              <Link href={"/"} className="usa-button">
                Close application
              </Link>
              <Button
                type="button"
                onClick={closeHandler as MouseEventHandler}
                unstyled
                className="padding-105 text-center"
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
          <button
            type="button"
            className="usa-button usa-modal__close filter_close"
            aria-label="Close this window"
            data-close-modal
            onClick={closeHandler as MouseEventHandler}
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
      </div>
    </div>
  );
};

interface Props {
  closeHandler: Function;
}
