import React from "react";
import SelectInput from "../../../components/input/SelectInput";
import FileInput from "../../../components/input/FileInput";
import TextInput from "../../../components/input/TextInput";
import TextAreaInput from "../../../components/input/TextAreaInput";
import FormTextInput from "../../../components/input/Form/FormTextInput";

const FinancialRecord = ({
  setValue,
  countryOptions,
  country,
  financialRecord,
  financialRecordOptions,
  errors,
  register,
  finName,
  finCountry,
  finInfo,
  finDocFile,
}) => {
  function setCountry(item) {
    setValue(item?.label, item?.value);
  }

  function setFinancialRecord(item) {
    setValue(item?.label, item?.value);
  }
  return (
    <>
      <div className=" mt-10 flex lg:flex-row flex-col gap-4">
        <div className="">
          <FileInput label="choose file" />
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4">
            <SelectInput
              label="What financial record do you want to upload"
              options={financialRecordOptions}
              value={financialRecord}
              handleChange={setFinancialRecord}
            />

            <FormTextInput
              label="finName"
              title="Bank Name"
              errors={errors}
              {...register("finName", {
                required: {
                  value: true,
                  message: "Bank name is required",
                },
              })}
              onChange={(e) => setValue("finName", e.target.value)}
            />

            <SelectInput
              label="What country is the Bank located"
              options={countryOptions}
              handleChange={setCountry}
              value={finCountry}
            />
          </div>

          <div>
            <TextAreaInput
              label="Additional Information"
              value={finInfo}
              onChange={(e) => setValue("finInfo", e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialRecord;
