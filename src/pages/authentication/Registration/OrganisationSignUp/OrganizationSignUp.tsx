import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../../../../components/button/Button";
import ProgressBar from "../../../../components/progressBar/ProgressBar";
import { useMultiStepForm } from "../../../../hooks/useMultiTabForm";
import AccountInfo from "./shared/AccountInfo";
import CompanyInfo from "./shared/CompanyInfo";
import ReviewDetails from "./shared/ReviewDetails";
import { industries } from "../../../../data/data";
import { useForm } from "react-hook-form";
import { postSignUp } from "../../../../redux/features/signupSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ThunkDispatch } from "@reduxjs/toolkit";

function OrganizationForm() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);

  const countryOptions =
    countryData?.map((country) => ({
      label: country?.name,
      value: country?.id,
    })) || [];

  const industryOptions =
    industries?.map((industry) => ({
      label: industry?.type,
      value: industry?.type,
    })) || [];

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

  const OrganizationSchema = z
    .object({
      firstname: z.string().min(2).max(30),
      lastname: z.string().min(2).max(30),
      companyEmail: z.string().email(),
      phone: z.string().min(5).max(15),
      password: z
        .string()
        .min(7, { message: "Password must be at least 7 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
          {
            message:
              "Password must contain at least one lowercase letter(a-z), one uppercase letter(A-Z), one number(0-9), and one special character(@$!%*#?&)",
          }
        ),
      confirmPassword: z
        .string()
        .min(7, { message: "Password must be at least 7 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),
      companyName: z.string().min(2).max(150),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }
    );

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    control,
  } = useForm({ resolver: zodResolver(OrganizationSchema), mode: "all" });

  const formTitles = [
    {
      title: "Account Information",
      info: "Enter your personal details",
      buttonText: "Proceed to Company Information",
    },
    {
      title: "Company Information",
      info: "Create your company Profile",
      buttonText: "Review and Submit Details",
    },
    {
      title: "Review and Save",
      info: "Review details",
      buttonText: "Submit Details",
    },
  ];

  const allValues = watch();
  const industry = watch("industry");
  const country = watch("country");

  const formSteps = [
    <AccountInfo setValue={setValue} errors={errors} register={register} />,
    <CompanyInfo
      setValue={setValue}
      errors={errors}
      register={register}
      industryOptions={industryOptions}
      countryOptions={countryOptions}
      industry={industry}
      country={country}
      control={control}
    />,
    <ReviewDetails
      details={[
        {
          title: "Account Information",
          content: [
            { title: "Firstname", data: allValues.firstname },
            { title: "Lastname", data: allValues.lastname },
            { title: "Phone Number", data: allValues.phone },
          ],
        },
        {
          title: "Company Information",
          content: [
            { title: "Company Name", data: allValues.companyName },
            { title: "Email", data: allValues.companyEmail },
            { title: "Industry", data: industry?.label },
            { title: "Country", data: country?.label },
          ],
        },
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

  function signUp(signUpValues) {
    const signUpData = {
      firstName: signUpValues?.firstname,
      lastName: signUpValues?.lastname,
      email: signUpValues?.companyEmail,
      phone: signUpValues?.phone,
      password: signUpValues?.password,
      password_confirmation: signUpValues?.confirmPassword,
      category: "org",
      country: country?.value,
      company_name: signUpValues?.companyName,
      industry: industry?.value,
    };

    // @ts-ignore
    dispatch(postSignUp({ ...signUpData }))
      .then((result) => {
        const {
          payload: { data },
        } = result;
        const success = Boolean(data?.success);
        if (success === true) {
          navigate("/signup/otp");
        } else {
          toast.error("Invalid OTP");
        }
      })
      .finally();
  }
  return (
    <>
      <div className="flex flex-col mt-1 w-full gap-6">
        <div className="flex gap-[6rem] pt-[2rem] pb-[4rem]">
          <div className="lg:flex md:flex sm:flex hidden ">
            <ProgressBar
              progressSteps={formTitles}
              currentStepIndex={currentStepIndex}
              goTo={goTo}
              vertical
              showStepTitle
            />
          </div>

          <div className="flex flex-col justify-between w-full">
            <form className="flex flex-col gap-[4rem] w-full h-full">
              {step}
            </form>
            <div className="flex flex-col mt-4">
              {!isLastStep ? (
                <Button onClick={next}>{title.buttonText}</Button>
              ) : (
                <Button onClick={handleSubmit(signUp)}>
                  {title.buttonText}
                </Button>
              )}

              {currentStepIndex > 0 ? (
                <button
                  className="text-[12px] mt-2 font-medium p-1 self-end"
                  onClick={back}
                >
                  {" <   "}Go back to {titles[currentStepIndex - 1].title}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrganizationForm;
