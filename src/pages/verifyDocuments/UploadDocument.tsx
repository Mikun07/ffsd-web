import { useState } from "react";
import SelectInput from "../../components/input/SelectInput";
import EducationForm from "./shared/EducationForm";
import ProfessionalCertificateForm from "./shared/ProfessionalCertificateForm";
import FinancialRecord from "./shared/FinancialRecord";
import { FileSection } from "../../types/global/verifydocuments/fileSections";
import { AiFillCloseCircle } from "react-icons/ai";

const UploadDocument = ({
  countryOptions,
  DocumentOptions,
  EducationOptions,
  financialRecordOptions,
  professionalCertificateOptions,
  InstitutionOptions,
  setValue,
  errors,
  register,
  isValid,
  control,
  defaultFileSections,
}) => {
  const [fileSections, updateFileSection] = useState<FileSection[]>(
    defaultFileSections || [{ label: null, value: null }]
  );

  function handleDocumentCategorySelection(
    documentCategoryValue,
    fileSectionIndex
  ) {
    const newArray = [...fileSections];
    newArray[fileSectionIndex] = documentCategoryValue;

    updateFileSection(newArray);
    setValue(`documentCategory`, newArray);
  }

  function addNewFileSection() {
    const fileSection: FileSection = {
      label: null,
      value: null,
    };
    updateFileSection((prev) => [...prev, fileSection]);
  }

  function removeFileSection(fileSectionIndex) {
    const newArray = [...fileSections];
    newArray.splice(fileSectionIndex, 1);
    updateFileSection(newArray);
    setValue("documentCategory", newArray);
  }

  const DocumentUrl = {
    Education: (index: number) =>
      (
        <EducationForm
          setValue={setValue}
          errors={errors}
          register={register}
          EducationOptions={EducationOptions}
          countryOptions={countryOptions}
          InstitutionOptions={InstitutionOptions}
          control={control}
          index={index}
        />
      ) || null,
    "Professional Certification": (index: number) =>
      (
        <ProfessionalCertificateForm
          setValue={setValue}
          errors={errors}
          register={register}
          professionalCertificateOptions={professionalCertificateOptions}
          countryOptions={countryOptions}
          control={control}
          index={index}
        />
      ) || null,
    "Financial Record": (index: number) =>
      (
        <FinancialRecord
          setValue={setValue}
          errors={errors}
          register={register}
          financialRecordOptions={financialRecordOptions}
          countryOptions={countryOptions}
          control={control}
          index={index}
        />
      ) || null,
  };
  return (
    <>
      <div>
        {fileSections?.map((fileSection, index) => {
          return (
            <div
              key={index}
              className="flex flex-col mt-3 bg-slate-100 p-4 shadow-sm rounded-lg "
            >
              {index !== 0 && (
                <span
                  className="flex justify-end text-[12px]"
                  onClick={() => removeFileSection(index)}
                >
                  {" "}
                  <AiFillCloseCircle size={15} />{" "}
                </span>
              )}
              <SelectInput
                title="Document category"
                label={`documentCategory.${index}`}
                options={DocumentOptions}
                control={control}
                handleChange={(documentCategoryValue) => {
                  handleDocumentCategorySelection(documentCategoryValue, index);
                }}
              />
              <div>
                {fileSections[index]?.label &&
                  DocumentUrl[fileSections[index]?.label](index)}
              </div>
            </div>
          );
        })}
        <div className="mt-1">
          <span
            onClick={addNewFileSection}
            className="rounded-lg p-2 flex bg-transparent font-medium text-[12px] items-center justify-between"
          >
            <span className="flex gap-2">
              {" "}
              + <p>Add File</p>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default UploadDocument;
