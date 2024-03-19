"use client";

import { FieldHint, DropdownOptions } from "../../types";
import { Field } from "formik";

export const DropdownField = ({ id, label, name, options, hint }: Props) => {
  return (
    <>
      <label className="usa-label" htmlFor={id}>
        {label}
      </label>
      <Field
        className="usa-select"
        id={id}
        name={name}
        aria-describedby={hint?.id}
        as="select"
      >
        <option value={undefined}>- Select -</option>
        {options.map((option: DropdownOptions) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </Field>
    </>
  );
};

type Props = {
  id: string;
  label: string;
  name: string;
  options: DropdownOptions[];
  hint?: FieldHint;
};
