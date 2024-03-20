"use client";

import { ErrorMessage, Field } from "formik";

export const TextArea = ({ id, label, name, required }: Props) => {
  return (
    <div>
      <label className="usa-label input_textarea-label" htmlFor={id}>
        {required ? (
          <>
            {label} <span className="required">*</span>
          </>
        ) : (
          label
        )}
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
  id: string;
  label?: string;
  name: string;
  required: boolean;
};
