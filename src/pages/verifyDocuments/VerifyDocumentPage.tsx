// @ts-ignore
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
import { startCase } from "lodash";
import {
  getFormDataContent,
  getFormDataLabels,
  FileSection,
} from "../../types/global/verifydocuments/fileSections";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstitution } from "../../redux/features/institutionSlice";
import { postDocument } from "../../redux/features/verifyDocumentSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RootState } from "../../types/redux/root";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchCost } from "../../redux/features/getCostSlice";
import GetCost from "./shared/GetCost";
import { fetchUser } from "../../redux/features/userSlice";
import { initiatePayment } from "../../redux/features/initiatePayment";
import Loading from "../../components/withStatus/loading/Loading";

function VerifyDocumentPage() {
  const [countryData, setCountryData] = useState([]);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const { data: institutions } = useSelector(
    (state: RootState) => state?.institution
  ) as any;

  const { data: cost, loading: loadingCost } = useSelector(
    (state: RootState) => state?.cost
  );
  const { data: payment, loading: loadingPayment } = useSelector(
    (state: RootState) => state?.startPayment
  );

  useEffect(() => {
    dispatch(fetchInstitution());
  }, [dispatch]);

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

  const InstitutionOptions =
    institutions?.map((institution) => ({
      label: institution?.name,
      value: institution?.name,
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
      buttonText: "Proceed to Upload Documents",
    },
    {
      title: "Upload Document",
      buttonText: "Review",
    },
    {
      title: "Review",
      buttonText: "Get cost",
    },
    {
      title: "Get Cost",
      buttonText: "Make Payment",
    },
  ];

  const AccountSchema = z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    middleName: z.string().min(2).max(30),
    dob: z.string(),
  });

  const DocumentSchema = z.object({
    fileTypeEduc: z.string(),
    fileDocEduc: z.string(),
    matricNumber: z.string(),
    schoolCountryEduc: z.string(),
    schoolNameEduc: z.string(),
    schoolCity: z.string(),
    enrollmentYearEduc: z.string().min(4).max(4),
    graduationYearEduc: z.string().min(4).max(4),
    addInfo: z.string(),
    examBoard: z.string(),
    courseOrSubject: z.string(),

    studentIdProf: z.string(),
    qualificationProf: z.string(),
    enrolmentStatusProf: z.string(),
    schoolNameProf: z.string(),
    enrollmentYearProf: z.string().min(4).max(4),
    graduationYearProf: z.string().min(4).max(4),
    addInfoProf: z.string(),
    profCourse: z.string(),
    fileDocProf: z.string(),
    schoolCountryProf: z.string(),

    finName: z.string(),
    finInfo: z.string(),
    fileDocFin: z.string(),
    fileTypeFin: z.string(),
    finCountry: z.string(),
  });

  const {
    watch,
    setValue,
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(AccountSchema), mode: "all" });

  const {
    getValues: docUploadGetValues,
    watch: docUploadWatch,
    setValue: docUploadSetValue,
    formState: { errors: docUploadErrors, isValid: docUploadIsValid },
    register: docUploadRegister,
    control: docUploadControl,
  } = useForm({
    resolver: zodResolver(DocumentSchema),
    mode: "all",
  });

  const docUploadValueObj = docUploadWatch();
  const documentDetailsValues = watch();

  const docUploadValues =
    docUploadValueObj["documentCategory"]?.map((item, index) => ({
      title: item?.label,
      content: Object.keys(docUploadValueObj)
        ?.filter((i) => i != "documentCategory")
        ?.map((contentItem) => ({
          title: contentItem,
          data:
            docUploadValueObj[contentItem][index]?.label ||
            docUploadValueObj[contentItem][index],
        })),
    })) || [];

  let formattedReviewValues = docUploadValues
    ?.map((x) => {
      const expectedKeys = Object.keys(getFormDataContent(x?.title) ?? []);
      const providedContent = x?.content || [];

      const keyLabels = getFormDataLabels(x?.title);

      const filteredContent = providedContent
        .filter((contentItem) => expectedKeys.includes(contentItem?.title))
        .map((contentItem) => ({
          title: keyLabels[contentItem?.title] || contentItem?.title,
          data: Array.isArray(contentItem?.data)
            ? contentItem?.data?.map((fileItem) => fileItem?.name).join("\n")
            : contentItem?.data,
        }));

      return {
        title: x?.title,
        content: filteredContent,
      };
    })
    ?.filter((t) => Boolean(t?.title));

  const reviewValues = [
    {
      title: "Applicant Information",
      content: [
        ...Object.entries(documentDetailsValues)?.map(
          ([itemKey, itemValue], index) => {
            return {
              title: startCase(itemKey),
              data: itemValue,
            };
          }
        ),
      ],
    },
    ...formattedReviewValues,
  ];

  const formSteps = [
    <DocumentDetails
      setValue={setValue}
      isValid={isValid}
      errors={errors}
      register={register}
    />,
    <UploadDocument
      defaultFileSections={docUploadValueObj.documentCategory}
      setValue={docUploadSetValue}
      countryOptions={countryOptions}
      EducationOptions={EducationOptions}
      professionalCertificateOptions={professionalCertificateOptions}
      DocumentOptions={DocumentOptions}
      financialRecordOptions={financialRecordOptions}
      errors={docUploadErrors}
      register={docUploadRegister}
      isValid={docUploadIsValid}
      control={docUploadControl}
      InstitutionOptions={InstitutionOptions}
    />,

    <ReviewDetails details={reviewValues} />,

    <GetCost data={cost} />,
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

  function getDocumentCost() {
    const verifyDocumentData = {
      firstName: documentDetailsValues?.firstName,
      lastName: documentDetailsValues?.lastName,
      middleName: documentDetailsValues?.middleName,
      dob: documentDetailsValues?.dob,
      // education
      fileDocEduc: docUploadValueObj?.fileDocEduc?.map((doc) => doc[0]),
      fileTypeEduc: docUploadValueObj?.fileTypeEduc?.map((type) => type?.value),
      matricNumber: docUploadValueObj?.matricNumber,
      schoolCountryEduc: docUploadValueObj?.schoolCountryEduc?.map(
        (type) => type?.value
      ),
      schoolNameEduc: docUploadValueObj?.schoolNameEduc?.map(
        (type) => type?.value
      ),
      schoolCity: docUploadValueObj?.schoolCity,
      enrollmentYearEduc: docUploadValueObj?.enrollmentYearEduc,
      graduationYearEduc: docUploadValueObj?.graduationYearEduc,
      addInfo: docUploadValueObj?.addInfo,
      examBoard: docUploadValueObj?.examBoard,
      courseOrSubject: docUploadValueObj?.courseOrSubject,

      // Professional Certification
      fileDocProf: docUploadValueObj?.fileDocProf?.map((doc) => doc[0]),
      schoolNameProf: docUploadValueObj?.schoolNameProf?.map(
        (type) => type?.value
      ),
      studentIdProf: docUploadValueObj?.studentIdProf,
      qualificationProf: docUploadValueObj?.qualificationProf,
      enrolmentStatusProf: docUploadValueObj?.enrolmentStatusProf,
      enrollmentYearProf: docUploadValueObj?.enrollmentYearProf,
      graduationYearProf: docUploadValueObj?.graduationYearProf,
      addInfoProf: docUploadValueObj?.addInfoProf,
      profCourse: docUploadValueObj?.profCourse,
      schoolCountryProf: docUploadValueObj?.schoolCountryProf?.map(
        (type) => type?.value
      ),

      // Financial records
      fileTypeFin: docUploadValueObj?.fileTypeFin?.map((type) => type?.value),
      finName: docUploadValueObj?.finName,
      finInfo: docUploadValueObj?.finInfo,
      finCountry: docUploadValueObj?.finCountry?.map((type) => type?.value),
      fileDocFin: docUploadValueObj?.fileDocFin?.map((doc) => doc[0]),
    };
    const formData = new FormData();

    for (let key of Object.keys(verifyDocumentData)) {
      formData.append(key, verifyDocumentData[key]);
    }
    // @ts-ignore
    dispatch(fetchCost({ ...verifyDocumentData })).then((result) => {
      const { payload } = result;
      const success = Boolean(payload?.success);
      if (success === true) {
        toast.success(payload?.message || "Upload Successful");
        next();
      } else {
        toast.error(payload.error || "Upload Failed");
      }
    });
  }

  function makePayment() {
    const initiatePaymentData = {
      email: cost?.data?.email,
      amount: cost?.data?.total_amount,
    };

    // @ts-ignore
    dispatch(initiatePayment({ ...initiatePaymentData })).then((result) => {
      const { payload } = result;
      const success = Boolean(payload?.success);
      if (success === true) {
        toast.success(payload?.message || "Upload Successful");
        const data = JSON.parse(payload.data);
        window.location.assign(data?.data.authorization_url);
      } else {
        toast.error(payload.errors || "Upload Failed");
      }
    });
  }

  return (
    <>
      <div className="flex flex-col gap-4 h-full mt-2">
        <div className="bg-slate-100 px-4 py-2 z-10 sticky top-4 rounded-lg">
          <ProgressBar
            /* eslint-disable */
            progressSteps={formTitles}
            currentStepIndex={currentStepIndex}
            goTo={goTo}
          />
        </div>

        <div className="mb-16 py-2 px-1 z-20 overflow-y-auto custom__scrollbar">
          <form className="flex flex-col gap-[4rem]">{step}</form>
          <div className="flex flex-col">
            {currentStepIndex == 2 ? (
              <>
                <div className="w-full py-2 justify-end flex">
                  <Button loading={loadingCost} onClick={getDocumentCost}>
                    {title.buttonText}{" "}
                  </Button>
                </div>
              </>
            ) : !isLastStep ? (
              <div className="w-full py-2 justify-end flex">
                <Button
                  disabled={!isValid}
                  // disabled={docUploadIsValid}
                  onClick={next}
                >
                  {title.buttonText}
                </Button>
              </div>
            ) : (
              <div className="w-full py-2 justify-end flex">
                <Button loading={loadingPayment} onClick={makePayment}>
                  {title.buttonText}
                </Button>
              </div>
            )}
            {currentStepIndex > 0 ? (
              <div className="w-full py-2 justify-end flex">
                <button className="text-[12px] self-end" onClick={back}>
                  {" <   "}Go back to {titles[currentStepIndex - 1].title}
                </button>
              </div>
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
