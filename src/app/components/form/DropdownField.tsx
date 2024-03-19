"use client";

import { FieldHint, DropdownOptions } from "../../types";
import { Field } from "formik";

export const DropdownField = ({
  id,
  label,
  required,
  name,
  options,
  hint,
}: Props) => {
  const fieldLabel = required ? `${label} *` : `${label}`;
  return (
    <>
      <label className="usa-label" htmlFor={id}>
        {fieldLabel}
      </label>
      {hint && (
        <div className="usa-hint" id={hint.id}>
          {hint.text}
        </div>
      )}
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
  required: boolean;
  name: string;
  options: DropdownOptions[];
  hint?: FieldHint;
};
