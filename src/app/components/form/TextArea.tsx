"use client";

import { ErrorMessage, Field } from "formik";

export const TextArea = ({ label, name }: Props) => {
  return (
    <div>
      <label className="usa-label input_textarea-label" htmlFor={name}>
        {label}
      </label>
      <Field
        id={name}
        name={name}
        className="usa-textarea input_textarea-input"
        as="textarea"
      />
      <ErrorMessage name={name} component="div" className="formError" />
    </div>
  );
};

type Props = {
  label?: string;
  name: string;
};
