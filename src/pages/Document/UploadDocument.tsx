import React, { useState } from "react";
import SelectInput from "../../components/input/SelectInput";
import EducationForm from "./shared/EducationForm";
import ProfessionalCertificateForm from "./shared/ProfessionalCertificateForm";
import FinancialRecord from "./shared/FinancialRecord";
import { FileSection } from "../../types/global/verifydocuments/fileSections";

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
  const [fileSections, updateFileSection] = useState<FileSection[]>([
    {
      documentCategory: null,
      formDataContent: null,
    },
  ]);

  console.log({ fileSections });

  function handleDocumentCategorySelection(x, fileSectionIndex) {
    console.log({ x, fileSectionIndex });
    const newArray = [...fileSections];
    newArray[fileSectionIndex].documentCategory = x?.value?.label || null;
    // set formDataContent to match the type of documentCategory
    updateFileSection(newArray);
  }

  function addNewFileSection() {
    const fileSection: FileSection = {
      documentCategory: null,
      formDataContent: null,
    };

    updateFileSection((prev) => [...prev, fileSection]);
  }

  function removeFileSection(fileSectionIndex) {
    const newArray = [...fileSections];
    newArray.splice(fileSectionIndex, 1);
    updateFileSection(newArray);
  }

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
        {fileSections.map((fileSection, index) => {
          return (
            <div
              key={index}
              className="flex flex-col m-3 bg-slate-100 p-4 shadow-sm rounded-lg "
            >
              {index !== 0 && (
                <span
                  className="flex justify-end text-[12px]"
                  onClick={() => removeFileSection(index)}
                >
                  {" "}
                  Delete{" "}
                </span>
              )}
              <SelectInput
                label="File to you want to upload"
                options={DocumentOptions}
                handleChange={(x) => handleDocumentCategorySelection(x, index)}
                value={fileSections[index]?.documentCategory}
              />

              <div>
                {fileSections[index].documentCategory &&
                  DocumentUrl[fileSections[index]?.documentCategory]}
              </div>
            </div>
          );
        })}
        <span
          onClick={addNewFileSection}
          className="rounded-lg p-2 flex justify-start mt-3 border-2 bg-transparent font-medium text-[12px] items-center"
        >
          <span className="flex gap-2">
            {" "}
            + <p>Add File</p>
          </span>
        </span>
      </div>
    </>
  );
};

export default UploadDocument;
