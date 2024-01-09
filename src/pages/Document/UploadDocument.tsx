import React, { useState } from "react";
import SelectInput from "../../components/input/SelectInput";
import EducationForm from "./shared/EducationForm";

const UploadDocument = ({
  countryOptions,
  EducationOptions,
  DocumentOptions,
  Education,
  Document,
  country,
  setValue,
}) => {
  function setCountry(item) {
    setValue(item?.label, item?.value);
  }

  function setDocument(item) {
    setValue(item?.label, item?.value);
  }

  function setEducation(item) {
    setValue(item?.label, item?.value);
  }

  const [selectedDocument, setSelectedDocument] = useState(null);
  const DocumentUrl = {
    Education: <EducationForm />,
  };

  return (
    <>
      <div>
        <div className="flex flex-col bg-slate-100 p-4 shadow-sm rounded-lg gap-y-4 ">
          <SelectInput
            label="What type of file to you want to upload"
            options={DocumentOptions}
            handleChange={setSelectedDocument}
            value={selectedDocument}
          />
          <div>
            {selectedDocument && DocumentUrl[selectedDocument?.value?.label]}
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
