import { FieldHint } from "../../types";
import { FieldValues, UseFormRegister } from "react-hook-form";

export const TextArea = ({
  id,
  label,
  name,
  required,
  registerField,
  hint,
}: Props) => {
  const fieldLabel = required ? `${label} *` : `${label}`;
  return (
    <div>
      <label className="usa-labe input_textarea-label" htmlFor={id}>
        {fieldLabel}
      </label>
      {hint && (
        <div className="usa-hint" id={hint.id}>
          {hint.text}
        </div>
      )}
      <textarea
        id={id}
        aria-describedby={hint?.id}
        className="usa-textarea input_textarea-input"
        {...registerField(`${name}`, { required: required })}
      />
    </div>
  );
};

type Props = {
  id: string;
  label?: string;
  name: string;
  required: boolean;
  registerField: UseFormRegister<FieldValues>;
  hint?: FieldHint;
};
