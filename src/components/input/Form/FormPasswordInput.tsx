import { FC, forwardRef, Ref, useState } from "react";
import EyeOpenIcon from "../../../assets/icons/EyeOpenIcon";
import EyeLockIcon from "../../../assets/icons/EyeLockIcon";
import { TextInputProps } from "../../../types/components/input";
import { startCase } from "lodash";

const FormPasswordInput: FC<TextInputProps> = forwardRef(
  ({ label = "password", errors, ...rest }, ref: Ref<HTMLInputElement>) => {
    const title = startCase(label);

    function togglePasswordVisibility() {
      toggleType((prev) => (prev === "password" ? "text" : "password"));
    }

    const [type, toggleType] = useState("password");

    const passwordErrors = errors[label]?.message;

    const renderErrorList = () => {
      if (!passwordErrors) return null;

      const errorList = passwordErrors.split(", ");
      return (
        <ul className="lg:text-[15px] md:text-[12px] sm:text-[10px] text-[11px] text-red-700 list-disc pl-2">
          {errorList.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      );
    };

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
            ref={ref}
            type={type}
            placeholder={title}
            className={`w-full bg-[#E2E8F0] text-black min-h-[38px] rounded outline-none p-2 pr-7 text-xs focus:ring-1 ring-[#40B52D]`}
            {...rest}
          />
        </div>
        {passwordErrors && renderErrorList()}
      </div>
    );
  }
);

export default FormPasswordInput;
