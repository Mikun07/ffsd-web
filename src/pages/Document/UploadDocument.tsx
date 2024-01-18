import { useState } from "react";
import SelectInput from "../../components/input/SelectInput";
import EducationForm from "./shared/EducationForm";
import ProfessionalCertificateForm from "./shared/ProfessionalCertificateForm";
import FinancialRecord from "./shared/FinancialRecord";
import {
  DocumentCategories,
  DocumentCategoryMap,
  FileSection,
  getFormDataContent,
} from "../../types/global/verifydocuments/fileSections";
import { AiFillCloseCircle } from "react-icons/ai";

const UploadDocument = ({
  countryOptions,
  DocumentOptions,
  EducationOptions,
  financialRecordOptions,
  professionalCertificateOptions,
  setValue,
  errors,
  register,
  isValid,
  control,
}) => {
  const [fileSections, updateFileSection] = useState([
    {
      documentCategory: null,
      formDataContent: null,
    },
  ]);

  function handleDocumentCategorySelection(
    documentCategoryValue,
    fileSectionIndex
  ) {
    const newArray = [...fileSections];
    const documentCategory = documentCategoryValue?.value?.label || null;
    newArray[fileSectionIndex].documentCategory = documentCategory;

    const formContent = getFormDataContent(documentCategory);
    newArray[fileSectionIndex].formDataContent = formContent;
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
    Education: (index: number) => (
      <EducationForm
        setValue={setValue}
        errors={errors}
        register={register}
        EducationOptions={EducationOptions}
        countryOptions={countryOptions}
        control={control}
        index={index}
      />
    ),
    "Professional Certification": (index: number) => (
      <ProfessionalCertificateForm
        setValue={setValue}
        errors={errors}
        register={register}
        professionalCertificateOptions={professionalCertificateOptions}
        countryOptions={countryOptions}
        control={control}
        index={index}
      />
    ),
    "Financial Record": (index: number) => (
      <FinancialRecord
        setValue={setValue}
        errors={errors}
        register={register}
        financialRecordOptions={financialRecordOptions}
        countryOptions={countryOptions}
        control={control}
        index={index}
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
                {fileSections[index].documentCategory &&
                  DocumentUrl[fileSections[index]?.documentCategory](index)}
              </div>
            </div>
          );
        })}
        <span
          onClick={addNewFileSection}
          className="rounded-lg p-2 flex mt-3 lg:w-[8%] w-1/3 bg-transparent font-medium text-[12px] items-center justify-between"
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
