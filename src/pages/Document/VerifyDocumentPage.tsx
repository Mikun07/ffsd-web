import React, { useEffect, useState } from "react";
import UploadDocument from "./UploadDocument";
import ReviewDetails from "./shared/ReviewDetails";
import ProgressBar from "../../components/progressBar/ProgressBar";
import { useMultiStepForm } from "../../hooks/useMultiTabForm";
import Button from "../../components/button/Button";
import { useForm } from "react-hook-form";
import DocumentDetails from "./shared/DocumentDetails";
import { DocumentCategory, EducationDocType, ProfessionalCertificateDocType, FinancialDocType} from "../../data/document";
import axios from "axios";
import { BASE_URL } from "../../config/api";

function VerifyDocumentPage() {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    axios
      .post(`${BASE_URL}/countries`)
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

  const formTitles = [
    {
      title: "Applicants Information",
      // info: "Enter Applicant Details",
      buttonText: "Enter Upload Document",
    },
    {
      title: "Upload Document",
      // info: "Enter your document details",
      buttonText: "Review and Submit Details",
    },
    {
      title: "Review and Save",
      // info: "Review details",
      buttonText: "Submit Details",
    },
  ];

  const { watch, setValue } = useForm({ mode: "all" });

  const firstname = watch("firstname");
  const lastname = watch("lastname");
  const middlename = watch("middlename");
  const dob = watch("dob");
  const country = watch("country");
  const Document = watch("Document");
  const Education = watch("Education");

  const formSteps = [
    <DocumentDetails
      setValue={setValue}
      firstname={firstname}
      lastname={lastname}
      middlename={middlename}
      dob={dob}
    />,
    <UploadDocument
      setValue={setValue}
      countryOptions={countryOptions}
      EducationOptions={EducationOptions}
      country={country}
      Document={Document}
      Education={Education}
      DocumentOptions={DocumentOptions}
    />,
    <ReviewDetails
    // details={[
    //   // {
    //   //   title: "Account Information",
    //   //   content: [
    //   //     { title: "Firstname", data: firstname },
    //   //     { title: "Lastname", data: lastname },
    //   //     { title: "Phone Number", data: phone },
    //   //     // { title: "Password", data: lastName },
    //   //     // { title: "Confirm Password", data: lastName },
    //   //   ],
    //   // },
    //   // {
    //   //   title: "Company Information",
    //   //   content: [
    //   //     { title: "Company Name", data: companyName },
    //   //     { title: "Email", data: companyEmail },
    //   //     { title: "Industry", data: industry?.label },
    //   //     { title: "Country", data: country?.label },
    //   //   ],
    //   // },
    // ]}
    />,
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
      <div className="flex flex-col gap-4 h-full overflow-y-auto px-4">
        <div className="bg-slate-100 p-4 sticky top-0 rounded-lg">
          <ProgressBar
            progressSteps={formTitles}
            currentStepIndex={currentStepIndex}
            goTo={goTo}
          />
        </div>

        <div className=" mt-10">
          <form className="flex flex-col gap-[4rem]">{step}</form>
          <div className="flex flex-col mt-4">
            {!isLastStep ? (
              <div className="flex lg:justify-end justify-center">
                <Button onClick={next}>{title.buttonText}</Button>
              </div>
            ) : (
              <div>
                <Button onClick={handleSubmit(signUp)}>
                  {title.buttonText}
                </Button>
              </div>
            )}

            {currentStepIndex > 0 ? (
              <button className="text-[12px] self-end" onClick={back}>
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
