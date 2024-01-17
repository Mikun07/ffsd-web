import Select, { SingleValue, ActionMeta } from "react-select";
import { startCase } from "lodash";
import { Controller } from "react-hook-form";

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
  title = "",
  options,
  handleChange,
  useValue = false,
  control,
}) => {
  function handleValueChange(selected) {
    const value = useValue ? selected?.value : selected;
    handleChange({ label, value });
  }
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-xs">
        <div>{title ? startCase(title) : startCase(label)}</div>
      </label>
      <Controller
        name={label}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            inputId={label}
            options={options}
            onChange={(v) => {
              field.onChange(v);
              handleChange && handleValueChange(v);
            }}
            styles={colorStyles}
            isClearable
            isSearchable
            closeMenuOnSelect
            blurInputOnSelect
            value={field?.value}
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
        )}
      />
    </div>
  );
};

export default SelectInput;
