import { startCase } from "lodash";
import { TextInputProps } from "../../../types/components/input";

const FormTextInput = ({ title, label, errors, ...rest }: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-xs">
        <div>{title || startCase(label)}</div>
      </label>
      <input
        className="bg-[#E2E8F0] text-black rounded outline-none min-h-[38px] p-2 text-xs focus:ring-1 ring-[#40B52D]"
        placeholder={title || startCase(label)}
        {...rest}
      />
      <p className="lg:text-[15px] md:text-[12px] sm:text-[10px] text-[11px] text-red-700">
        {" "}
        {errors[label]?.message}
      </p>
    </div>
  );
};
export default FormTextInput;
