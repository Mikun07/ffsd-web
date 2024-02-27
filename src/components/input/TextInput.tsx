import { FC } from "react";
import { TextInputProps } from "../../types/components/input";
import { startCase } from "lodash";

interface CustomTextInputProps extends TextInputProps {
  inputClassName?: string; // New prop for custom input class
}

const TextInput: FC<CustomTextInputProps> = ({
  label = "",
  inputClassName = "",
  disabled,
  ...rest
}) => {
  const title = startCase(label);
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={rest.id || label} className="text-xs font-medium">
        <div>{title}</div>
      </label>
      <input
        className={`bg-[#E2E8F0] text-black rounded outline-none min-h-[38px] p-2 text-xs focus:ring-1 ring-[#40B52D] ${inputClassName} ${
          disabled ? "text-gray-700" : ""
        }`}
        placeholder={title}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

export default TextInput;
