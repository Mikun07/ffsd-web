import { FC } from "react";
import { TextInputProps } from "../../types/input";
import { startCase } from "lodash";

const TextInput: FC<TextInputProps> = ({ label = "", ...rest }) => {
  const title = startCase(label);
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-xs">
        <div>{title}</div>
      </label>
      <input
        className="bg-[#E2E8F0] text-black rounded outline-none min-h-[38px] p-2 text-xs focus:ring-1 ring-[#40B52D]"
        placeholder={title}
        {...rest}
      />
    </div>
  );
};

export default TextInput;
