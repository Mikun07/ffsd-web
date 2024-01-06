import React from "react";
import SelectInput from "../../../components/input/SelectInput";
import TextAreaInput from "../../../components/input/TextAreaInput";
import { useMultiStepForm } from "../../../hooks/useMultiTabForm";
import MultiTabs from "../../../components/multiTabs/MultiTabs";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/input/TextInput";

const UploadDocument = ({ countryOptions, country, setValue }) => {
  function setCountry(item) {
    setValue(item?.label, item?.value);
  }
  return (
    <>
      <div>
        <div className="flex flex-col bg-slate-100 p-4 shadow-sm rounded-lg gap-y-4 ">
          <SelectInput
            label="What type of file to you want to upload"
            options={countryOptions}
            handleChange={setCountry}
            value={country}
          />
          <div className="flex gap-12 bg-slate-100 p-4 rounded-lg">
          <TextInput type="file" label="Upload Document"/>
        </div>
        </div>
        <button className="rounded-lg p-2 mt-3 bg-transparent font-medium text-[12px] items-center">
          <span className="flex gap-2">
            {" "}
            + <p>Add File</p>
          </span>
        </button>
      </div>
    </>
  );
};

export default UploadDocument;
