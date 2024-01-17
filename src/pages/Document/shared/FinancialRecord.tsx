import React from "react";
import SelectInput from "../../../components/input/SelectInput";
import FileInput from "../../../components/input/FileInput";
import TextInput from "../../../components/input/TextInput";
import TextAreaInput from "../../../components/input/TextAreaInput";
import FormTextInput from "../../../components/input/Form/FormTextInput";
import FormTextAreaInput from "../../../components/input/Form/FormTextAreaInput";

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
  control,
  index,
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
              label={`finType.${index}`}
              title="What financial record do you want to upload"
              options={financialRecordOptions}
              control={control}
              handleChange={setFinancialRecord}
            />

            <FormTextInput
              label={`finName.${index}`}
              title="Bank Name"
              errors={errors}
              {...register(`finName.${index}`, {
                required: {
                  value: true,
                  message: "Bank name is required",
                },
              })}
              onChange={(e) => setValue(`finName.${index}`, e.target.value)}
            />

            <SelectInput
              title="Bank Country"
              label={`finCountry.${index}`}
              options={countryOptions}
              handleChange={setCountry}
              control={control}
            />
          </div>

          <div>
            <FormTextAreaInput
              title="Additional Information"
              label={`finInfo.${index}`}
              errors={errors}
              onChange={(e) => setValue(`finInfo.${index}`, e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialRecord;
