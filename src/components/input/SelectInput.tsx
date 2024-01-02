import Select, { SingleValue, ActionMeta } from "react-select";
import { startCase } from "lodash";

const colorStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "#E2E8F0",
    fontSize: "0.75rem",
    color: "black",
  }),
  option: (styles: any) => ({
    ...styles,
  }),
};

const SelectInput = ({
  label = "",
  options,
  handleChange,
  useValue = false,
  value
}) => {
  const title = startCase(label);
  function handleValueChange(selected) {
    const value = useValue ? selected?.value : selected;
    handleChange({label, value})
  }
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-xs">
        <div>{title}</div>
      </label>
      <Select
        options={options}
        onChange={handleValueChange}
        styles={colorStyles}
        isClearable
        value={options?.find(option => option?.value === value)}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          height: 1,
          outline: 0,
          colors: {
            ...theme.colors,
            primary25: "#40B52D",
            primary: "#40B52D",
          },
        })}
      />
    </div>
  );
};

export default SelectInput;
