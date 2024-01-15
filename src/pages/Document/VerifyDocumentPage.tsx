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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const DocumentSchema = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      middleName: z.string().min(2).max(30),
      dob: z.string(),
      matricNumber: z.string(),
      dateOfIssueEduc: z.string(),
      schoolCountryEduc: z.string(),
      schoolNameEduc: z.string(),
      schoolCity: z.string(),
      enrollmentYearEduc: z.string().min(4).max(4),
      graduationYearEduc: z.string().min(4).max(4),
      addInfo: z.string(),
      courseOrSubject: z.string(),
      studentIdProf: z.string(),
      qualificationProf: z.string(),
      enrolmentStatusProf: z.string(),
      schoolNameProf: z.string(),
      enrollmentYearProf: z.string().min(4).max(4),
      graduationYearProf: z.string().min(4).max(4),
      addInfoProf: z.string(),
      profCourse: z.string(),
      finName: z.string(),
      finInfo: z.string(),
      // finDocFile: z.string(),
      // fileDocProf: z.string(),
      // fileDocEduc: z.string(),
    })
    // .refine(
    //   (value) => {
    //     // Ensure the person is at least 15 years old
    //     const currentDate = new Date();
    //     const minimumAllowedDate = new Date(
    //       currentDate.getFullYear() - 15,
    //       currentDate.getMonth(),
    //       currentDate.getDate()
    //     );
    //     return value <= minimumAllowedDate;
    //   },
    //   {
    //     message: "Must be at least 15 years old.",
    //     path: ["dob"]
    //   }
    // );

  const {
    watch,
    setValue,
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(DocumentSchema), mode: "all" });

  const allValues = watch();
  console.log({ allValues, isValid });

  const formSteps = [
    <DocumentDetails setValue={setValue} errors={errors} register={register} />,
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
                <Button onClick={next}>
                  {title.buttonText}
                </Button>
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
