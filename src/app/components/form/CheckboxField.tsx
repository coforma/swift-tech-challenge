import { FieldValues, UseFormRegister } from "react-hook-form";
import { CheckboxOptions } from "../../types";

export const CheckboxField = ({ name, registerField, options }: Props) => (
  <fieldset className="usa-fieldset">
    <div>
      {options.map((option: CheckboxOptions) => (
        <div className="usa-checkbox" key={option.id}>
          <input
            className="usa-checkbox__input"
            id={option.id}
            type="checkbox"
            value={option.id}
            {...registerField(`${name}`)}
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
  registerField: UseFormRegister<FieldValues>;
  options: CheckboxOptions[];
};
