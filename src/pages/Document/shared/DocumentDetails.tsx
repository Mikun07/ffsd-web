import React from "react";
import TextInput from "../../../components/input/TextInput";

const DocumentDetails = ({
  setValue,
  firstname,
  lastname,
  middlename,
  dob,
}) => {
  return (
    <>
      <div className="  flex flex-col bg-slate-100 p-4 shadow-sm rounded-lg gap-y-4">
        <TextInput
          type="text"
          label="Firstname"
          value={firstname}
          onChange={(e) => setValue("firstname", e.target.value)}
        />

        <TextInput
          type="text"
          label="Lastname"
          value={lastname}
          onChange={(e) => setValue("lastname", e.target.value)}
        />

        <TextInput
          type="text"
          label="Middlename"
          value={middlename}
          onChange={(e) => setValue("firstname", e.target.value)}
        />

        <TextInput
          type="date"
          label="Date of Birth"
          value={dob}
          onChange={(e) => setValue("dob", e.target.value)}
        />
      </div>
    </>
  );
};

export default DocumentDetails;
