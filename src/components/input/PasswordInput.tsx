import { FC, useEffect, useState } from "react";
import EyeOpenIcon from "../../assets/icons/EyeOpenIcon";
import EyeLockIcon from "../../assets/icons/EyeLockIcon";
import { TextInputProps } from "../../types/components/input";
import { startCase } from "lodash";

const PasswordInput: FC<TextInputProps> = ({ label = "Password", ...rest }) => {
  const title = startCase(label);

  function togglePasswordVisibility() {
    toggleType((prev) => (prev === "password" ? "text" : "password"));
  }

  const [type, toggleType] = useState("password");

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-xs">
        <div>{title}</div>
      </label>
      <div className="flex items-center relative">
        <span
          onClick={togglePasswordVisibility}
          className="cursor-pointer absolute right-2"
        >
          {type === "password" ? (
            <EyeOpenIcon width={15} height={15} />
          ) : (
            <EyeLockIcon width={15} height={15} />
          )}
        </span>
        <input
          type={type}
          placeholder={title}
          className="w-full bg-[#E2E8F0] text-black min-h-[38px] rounded outline-none p-2 pr-7 text-xs focus:ring-1 ring-[#40B52D]"
          {...rest}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
