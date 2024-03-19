"use client";

import { Field } from "formik";
//types
import { CheckboxOptions } from "../../types";

export const CheckboxField = ({ name, options }: Props) => (
  <fieldset className="usa-fieldset">
    <div>
      {options.map((option: CheckboxOptions) => (
        <div className="usa-checkbox" key={option.id}>
          <Field
            className="usa-checkbox__input"
            id={option.id}
            type="checkbox"
            value={option.id}
            name={name}
          />
          <label className="usa-checkbox__label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
);

type Props = {
  id: string;
  name: string;
  options: CheckboxOptions[];
};
