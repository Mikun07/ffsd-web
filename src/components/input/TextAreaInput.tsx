import { FC } from "react";
import { TextAreasProps } from "../../types/textarea";
import { startCase } from "lodash";

const TextAreaInput: FC<TextAreasProps> = ({ label = "", ...rest }) => {
  const title = startCase(label);
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-xs">
        <div>{title}</div>
      </label>
      <textarea
        className="bg-[#E2E8F0] text-black rounded outline-none h-[100px] p-2 text-xs focus:ring-1 ring-[#40B52D]"
        placeholder={title}
        {...rest}
      />
    </div>
  );
};

export default TextAreaInput;
