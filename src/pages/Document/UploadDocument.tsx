import React, { useState } from "react";
import SelectInput from "../../components/input/SelectInput";
import EducationForm from "./shared/EducationForm";
import ProfessionalCertificateForm from "./shared/ProfessionalCertificateForm";
import FinancialRecord from "./shared/FinancialRecord";

const UploadDocument = ({
  country,
  Document,
  Education,
  financialRecord,
  professionalCertificate,
  countryOptions,
  DocumentOptions,
  EducationOptions,
  financialRecordOptions,
  professionalCertificateOptions,
  setValue,
  matricNumber,
  dateOfIssueEduc,
  schoolCountryEduc,
  schoolNameEduc,
  schoolCity,
  enrollmentYearEduc,
  graduationYearEduc,
  addInfo,
  courseOrSubject,
  fileDocEduc,
  studentIdProf,
  qualificationProf,
  enrolmentStatusProf,
  schoolNameProf,
  schoolCountryProf,
  enrollmentYearProf,
  graduationYearProf,
  addInfoProf,
  profCourse,
  finName,
  finCountry,
  finInfo,
  finDocFile,

}) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [fileSections, addFileSection] = useState([])
  const DocumentUrl = {
    Education: (
      <EducationForm
        setValue={setValue}
        Education={Education}
        country={country}
        countryOptions={countryOptions}
        EducationOptions={EducationOptions}
        matricNumber={matricNumber}
        dateOfIssueEduc={dateOfIssueEduc}
        schoolCountryEduc={schoolCountryEduc}
        schoolNameEduc={schoolNameEduc}
        schoolCity={schoolCity}
        enrollmentYearEduc={enrollmentYearEduc}
        graduationYearEduc={graduationYearEduc}
        addInfo={addInfo}
        courseOrSubject={courseOrSubject}
        fileDocEduc={fileDocEduc}
      />
    ),
    "Professional Certification": (
      <ProfessionalCertificateForm
        setValue={setValue}
        country={country}
        countryOptions={countryOptions}
        professionalCertificate={professionalCertificate}
        professionalCertificateOptions={professionalCertificateOptions}
        studentIdProf={studentIdProf}
        qualificationProf={qualificationProf}
        enrolmentStatusProf={enrolmentStatusProf}
        schoolNameProf={schoolNameProf}
        schoolCountryProf={schoolCountryProf}
        enrollmentYearProf={enrollmentYearProf}
        graduationYearProf={graduationYearProf}
        addInfoProf={addInfoProf}
        profCourse={profCourse}
      />
    ),
    "Financial Record": (
      <FinancialRecord
        setValue={setValue}
        country={country}
        countryOptions={countryOptions}
        financialRecord={financialRecord}
        financialRecordOptions={financialRecordOptions}
        finName={finName}
        finCountry={finCountry}
        finInfo={finInfo}
        finDocFile={finDocFile}
      />
    ),
  };

  return (
    <>
      <div>
        <div className="flex flex-col bg-slate-100 p-4 shadow-sm rounded-lg ">
          <SelectInput
            label="File to you want to upload"
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
