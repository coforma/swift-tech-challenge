import { FieldValues, UseFormRegister } from "react-hook-form";
import { FieldHint } from "../../types";

export const TextField = ({
  id,
  label,
  required,
  name,
  registerField,
  hint,
}: Props) => {
  const fieldLabel = required ? `${label} *` : `${label}`;
  return (
    <div>
      <label className="usa-label" htmlFor={id}>
        {fieldLabel}
      </label>
      {hint && (
        <div className="usa-hint" id={hint.id}>
          {hint.text}
        </div>
      )}
      <input
        className="usa-input usa-input--lg"
        id={id}
        aria-describedby={hint?.id}
        {...registerField(`${name}`, { required: required })}
      />
    </div>
  );
};

type Props = {
  id: string;
  label: string;
  required: boolean;
  name: string;
  registerField: UseFormRegister<FieldValues>;
  hint?: FieldHint;
};
