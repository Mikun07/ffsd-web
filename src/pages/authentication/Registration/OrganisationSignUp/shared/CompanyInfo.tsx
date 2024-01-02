import SelectInput from "../../../../../components/input/SelectInput";
import TextInput from "../../../../../components/input/TextInput";

const CompanyInfo = ({
  setValue,
  countryOptions,
  industryOptions,
  companyName,
  companyEmail,
  industry,
  country,
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
        <TextInput
          type="text"
          label="Company Name"
          value={companyName}
          onChange={(e) => setValue("companyName", e.target.value)}
        />
        <TextInput
          type="text"
          label="companyEmail"
          value={companyEmail}
          onChange={(e) => setValue("companyEmail", e.target.value)}
        />

        <SelectInput
          label="country"
          options={countryOptions}
          handleChange={setCountry}
          value={country}
        />
        <SelectInput
          label="industry"
          options={industryOptions}
          handleChange={setIndustry}
          value={industry}
        />
      </div>
    </>
  );
};

export default CompanyInfo;
