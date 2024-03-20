import { string, number as numberSchema } from "yup";
import { validationErrors as error } from "../verbiage/errors";

const isWhitespaceString = (value?: string) => value?.trim().length === 0;

// TEXT
export const text = () =>
  string()
    .typeError(error.INVALID_GENERIC)
    .required(error.REQUIRED_GENERIC)
    .test({
      test: (value) => !isWhitespaceString(value),
      message: error.REQUIRED_GENERIC,
    });
export const textOptional = () => string().typeError(error.INVALID_GENERIC);

export const number = () =>
  numberSchema()
    .typeError(error.INVALID_NUMBER)
    .required(error.REQUIRED_GENERIC);

export const numberOptional = () => number().notRequired().nullable();

export const email = () => text().email(error.INVALID_EMAIL);
export const emailOptional = () => email().notRequired();
