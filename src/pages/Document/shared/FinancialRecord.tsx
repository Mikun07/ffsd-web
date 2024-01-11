import React from "react";
import SelectInput from "../../../components/input/SelectInput";
import FileInput from "../../../components/input/FileInput";
import TextInput from "../../../components/input/TextInput";
import TextAreaInput from "../../../components/input/TextAreaInput";

const FinancialRecord = ({
  setValue,
  countryOptions,
  country,
  financialRecord,
  financialRecordOptions,
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
      <div className=" mt-10 flex lg:flex-row flex-col-reverse gap-4">
        <div className="">
          <FileInput label="choose file" />
        </div>
        <div className="w-full flex flex-col gap-6">
          <div>
            <SelectInput
              label="What financial record do you want to upload"
              options={financialRecordOptions}
              value={financialRecord}
              handleChange={setFinancialRecord}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Bank Name"
              value={finName}
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
