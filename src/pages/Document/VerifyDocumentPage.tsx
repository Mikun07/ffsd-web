import { useEffect, useState } from "react";
import UploadDocument from "./UploadDocument";
import ReviewDetails from "./shared/ReviewDetails";
import ProgressBar from "../../components/progressBar/ProgressBar";
import { useMultiStepForm } from "../../hooks/useMultiTabForm";
import Button from "../../components/button/Button";
import { useForm } from "react-hook-form";
import DocumentDetails from "./shared/DocumentDetails";
import {
  DocumentCategory,
  EducationDocType,
  ProfessionalCertificateDocType,
  FinancialDocType,
} from "../../data/data";
import axios from "axios";
import { BASE_URL } from "../../config/api";

function VerifyDocumentPage() {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    axios
      .post(`${BASE_URL}/countries`, {
        access: "docs_verify_frontend",
      })
      .then((response) => {
        const data = response.data?.data;
        setCountryData(data);
      })
      .catch((error) => {
        error("Error fetching data:", error);
      });
  }, []);

  const countryOptions =
    countryData?.map((country) => ({
      label: country?.name,
      value: country?.id,
    })) || [];

  const DocumentOptions =
    DocumentCategory?.map((Document) => ({
      label: Document?.type,
      value: Document?.id,
    })) || [];

  const EducationOptions =
    EducationDocType?.map((Education) => ({
      label: Education?.type,
      value: Education?.type,
    })) || [];

  const professionalCertificateOptions =
    ProfessionalCertificateDocType?.map((professionalCertificate) => ({
      label: professionalCertificate?.type,
      value: professionalCertificate?.type,
    })) || [];

  const financialRecordOptions =
    FinancialDocType?.map((financialRecord) => ({
      label: financialRecord?.type,
      value: financialRecord?.type,
    })) || [];

  const formTitles = [
    {
      title: "Applicants Information",
      buttonText: "Enter Upload Document",
    },
    {
      title: "Upload Document",
      buttonText: "Review and Submit Details",
    },
    {
      title: "Review and Save",
      buttonText: "Submit Details",
    },
  ];

  const {
    watch,
    setValue,
    formState: { errors, isValid },
    register,
    handleSubmit
  } = useForm({ mode: "all" });

  const allValues = watch();
  console.log({allValues, isValid})

  const formSteps = [
    <DocumentDetails
      setValue={setValue}
      errors={errors}
      register={register}
    />,
    <UploadDocument
      setValue={setValue}
      countryOptions={countryOptions}
      EducationOptions={EducationOptions}
      professionalCertificateOptions={professionalCertificateOptions}
      DocumentOptions={DocumentOptions}
      financialRecordOptions={financialRecordOptions}
      errors={errors}
      register={register}
    />,
    // <ReviewDetails
    //   details={[
    //     {
    //       title: "Account Information",
    //       content: [
    //         { title: "Firstname", data: firstName },
    //         { title: "Lastname", data: lastName },
    //         { title: "Middlename", data: middleName },
    //         { title: "Date of birth", data: dob },
    //       ],
    //     },
    //     {
    //       title: "Document Uploaded",
    //       content: [
    //         // { title: "Type of File you uploaded", data: document?.label },
    //       ],
    //     },
    //   ]}
    // />,
  ];

  const {
    currentStepIndex,
    step,
    title,
    titles,
    next,
    back,
    goTo,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm(formSteps, formTitles);

  return (
    <>
      <div className="flex flex-col mb-16 gap-4 h-full lg:px-4">
        <div className="bg-slate-100 p-3 z-10 sticky top-4 rounded-lg">
          <ProgressBar
            progressSteps={formTitles}
            currentStepIndex={currentStepIndex}
            goTo={goTo}
          />
        </div>

        <div className="mb-16 p-2 overflow-y-auto custom__scrollbar">
          <form className="flex flex-col gap-[4rem]">{step}</form>
          <div className="flex py-2 mt-2 flex-col">
            {!isLastStep ? (
              <div className="flex justify-end">
                <Button onClick={next}>{title.buttonText}</Button>
              </div>
            ) : (
              <div className="flex justify-end">
                <Button disabled={!isValid}>{title.buttonText}</Button>
              </div>
            )}

            {currentStepIndex > 0 ? (
              <button className="text-[12px] mt-2 self-end" onClick={back}>
                {" <   "}Go back to {titles[currentStepIndex - 1].title}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyDocumentPage;
