import FormTextInput from "../../../../../components/input/Form/FormTextInput";
import SelectInput from "../../../../../components/input/SelectInput";

const CompanyInfo = ({
  setValue,
  countryOptions,
  industryOptions,
  errors,
  register,
  industry,
  country,
  control,
}) => {
  function setCountry(item) {
    setValue(item?.label, item?.value);
  }

  function setIndustry(item) {
    setValue(item?.label, item?.value);
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-y-4 gap-x-3">
        <FormTextInput
          label="companyName"
          title="company Name"
          errors={errors}
          {...register("companyName", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          onChange={(e) => setValue("companyName", e.target.value)}
        />
        <FormTextInput
          label="companyEmail"
          title="Company Email"
          errors={errors}
          {...register("companyEmail", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          onChange={(e) => setValue("companyEmail", e.target.value)}
        />

        <SelectInput
          label="country"
          options={countryOptions}
          handleChange={setCountry}
          // value={country}
          control={control}
        />
        <SelectInput
          label="industry"
          options={industryOptions}
          handleChange={setIndustry}
          // value={industry}
          control={control}
        />
      </div>
    </>
  );
};

export default CompanyInfo;
