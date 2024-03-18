import { FieldValues, UseFormRegister } from "react-hook-form";
import { FieldHint, DropdownOptions } from "../../types";

export const DropdownField = ({
  id,
  label,
  required,
  name,
  registerField,
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
      <select
        className="usa-select"
        id={id}
        {...registerField(`${name}`, { required: required })}
        aria-describedby={hint?.id}
      >
        <option>- Select -</option>
        {options.map((option: DropdownOptions) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

type Props = {
  id: string;
  label: string;
  required: boolean;
  name: string;
  registerField: UseFormRegister<FieldValues>;
  options: DropdownOptions[];
  hint?: FieldHint;
};
