import { FieldValues, UseFormRegister } from "react-hook-form";
import { CheckboxOptions } from "../../types";

export const CheckboxField = ({ id, name, registerField, options }: Props) => {
  return (
    <div className="usa-checkbox" id={id} {...registerField(`${name}`)}>
      {options.map((option: CheckboxOptions) => (
        <div key={option.id}>
          <input
            className="usa-checkbox__input"
            id={option.id}
            type="checkbox"
            name={option.id}
            value={option.id}
          />
          <label className="usa-checkbox__label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

type Props = {
  id: string;
  name: string;
  registerField: UseFormRegister<FieldValues>;
  options: CheckboxOptions[];
};
