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

  const { watch, setValue } = useForm({ mode: "all" });

  const firstname = watch("firstname");
  const lastname = watch("lastname");
  const middlename = watch("middlename");
  const dob = watch("dob");
  const country = watch("country");
  const Document = watch("Document");
  const Education = watch("Education");
  const professionalCertificate = watch("professionalCertificate");
  const financialRecord = watch("financialRecord");
  const matricNumber = watch("matricNumber");
  const dateOfIssueEduc = watch("dateOfIssueEduc");
  const schoolCountryEduc = watch("schoolCountryEduc");
  const schoolNameEduc = watch("schoolNameEduc");
  const schoolCity = watch("schoolCity");
  const enrollmentYearEduc = watch("enrollmentYearEduc");
  const graduationYearEduc = watch("graduationYearEduc");
  const addInfo = watch("addInfo");
  const courseOrSubject = watch("courseOrSubject");
  const fileDocEduc = watch("fileDocEduc");
  const studentIdProf = watch("studentIdProf");
  const qualificationProf = watch("qualificationProf");
  const enrolmentStatusProf = watch("enrolmentStatusProf");
  const schoolNameProf = watch("schoolNameProf");
  const schoolCountryProf = watch("schoolCountryProf");
  const enrollmentYearProf = watch("enrollmentYearProf");
  const graduationYearProf = watch("graduationYearProf");
  // const schoolCountryEduc = watch("schoolCountryEduc");
  const addInfoProf = watch("addInfoProf");
  const profCourse = watch("profCourse");
  const finName = watch("finName");
  const finCountry = watch("finCountry");
  const finInfo = watch("finInfo");
  const finDocFile = watch("finDocFile");


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
      professionalCertificateOptions={professionalCertificateOptions}
      financialRecordOptions={financialRecordOptions}
      country={country}
      Document={Document}
      Education={Education}
      professionalCertificate={professionalCertificate}
      financialRecord={financialRecord}
      DocumentOptions={DocumentOptions}
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
      studentIdProf={studentIdProf}
      qualificationProf={qualificationProf}
      enrolmentStatusProf={enrolmentStatusProf}
      schoolNameProf={schoolNameProf}
      schoolCountryProf={schoolCountryProf}
      enrollmentYearProf={enrollmentYearProf}
      graduationYearProf={graduationYearProf}
      addInfoProf={addInfoProf}
      profCourse={profCourse}
      finName={finName}
      finCountry={finCountry}
      finInfo={finInfo}
      finDocFile={finDocFile}
    />,
    <ReviewDetails
      details={[
        {
          title: "Account Information",
          content: [
            { title: "Firstname", data: firstname },
            { title: "Lastname", data: lastname },
            { title: "Middlename", data: middlename },
            { title: "Date of birth", data: dob },
          ],
        },
        // {
        //   title: "Company Information",
        //   content: [
        //     { title: "Company Name", data: companyName },
        //     { title: "Email", data: companyEmail },
        //     { title: "Industry", data: industry?.label },
        //     { title: "Country", data: country?.label },
        //   ],
        // },
      ]}
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
              <div>
                <Button>{title.buttonText}</Button>
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
