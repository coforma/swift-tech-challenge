"use client";

import { ErrorMessage, Field } from "formik";

export const TextField = ({ name, label, required }: Props) => {
  return (
    <div>
      <label className="usa-label" htmlFor={name}>
        {required ? (
          <>
            {label} <span className="required">*</span>
          </>
        ) : (
          label
        )}
      </label>
      <Field id={name} name={name} className="usa-input usa-input--lg" />
      <ErrorMessage name={name} component="div" className="formError" />
    </div>
  );
};

type Props = {
  name: string;
  label: string;
  required: boolean;
};
