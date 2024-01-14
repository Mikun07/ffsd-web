import { useState } from "react";
import SelectInput from "../../components/input/SelectInput";
import EducationForm from "./shared/EducationForm";
import ProfessionalCertificateForm from "./shared/ProfessionalCertificateForm";
import FinancialRecord from "./shared/FinancialRecord";
import {
  DocumentCategories,
  DocumentCategoryMap,
  FileSection,
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
}) => {
  const [fileSections, updateFileSection] = useState([
    {
      documentCategory: null,
      formDataContent: null,
    },
  ]);

  console.log({ fileSections });
  function handleDocumentCategorySelection(
    documentCategoryValue,
    fileSectionIndex
  ) {
    console.log({ documentCategoryValue, fileSectionIndex });
    const newArray = [...fileSections];
    const documentCategory = documentCategoryValue?.value?.label || null;
    newArray[fileSectionIndex].documentCategory = documentCategory;

    const formContent = getFormDataContent(documentCategory);
    newArray[fileSectionIndex].formDataContent = formContent;
    updateFileSection(newArray);
  }
  
  function getFormDataContent(documentCategory) {
    const values = {
      Education: {
        fileType: null,
        matricNumber: null,
        schoolNameEduc: null,
        schoolCountryEduc: null,
        schoolCity: null,
        enrollmentYearEduc: null,
        graduationYearEduc: null,
        addInfo: null,
        courseOrSubject: null,
        fileDocEduc: null,
      },
      "Professional Certification": {
        schoolNameProf: null,
        studentIdProf: null,
        qualificationProf: null,
        schoolCountryProf: null,
        enrolmentStatusProf: null,
        enrollmentYearProf: null,
        graduationYearProf: null,
        profCourse: null,
        addInfoProf: null,
        fileDocProf: null,
      },
      "Financial Record": {
        financialRecord: null,
        finName: null,
        finCountry: null,
        finInfo: null,
        finDocFile: null,
      },
    };

    return values[documentCategory];
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

  // const DocumentUrl = {
  //   Education: (
  //     <EducationForm
  //       setValue={setValue}
  //       errors={errors}
  //       register={register}
  //   ),
  //   "Professional Certification": (
  //     <ProfessionalCertificateForm
  //       setValue={setValue}
  //       errors={errors}
  //       register={register}
  //     />
  //   ),
  //   "Financial Record": (
  //     <FinancialRecord
  //       setValue={setValue}
  //       errors={errors}
  //       register={register}
  //     />
  //   ),
  // };

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
                label="File to you want to upload"
                options={DocumentOptions}
                handleChange={(documentCategoryValue) =>
                  handleDocumentCategorySelection(documentCategoryValue, index)
                }
                value={fileSections[index]?.documentCategory}
              />

              <div>
                {/* {fileSections[index].documentCategory &&
                  DocumentUrl[fileSections[index]?.documentCategory]} */}
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
