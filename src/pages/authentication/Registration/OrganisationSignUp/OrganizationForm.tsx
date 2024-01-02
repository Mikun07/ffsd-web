import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config/api";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../../../../components/button/Button";
import ProgressBar from "../../../../components/progressBar/ProgressBar";
import { useMultiStepForm } from "../../../../hooks/useMultiTabForm";
import AccountInfo from "./shared/AccountInfo";
import CompanyInfo from "./shared/CompanyInfo";
import ReviewDetails from "./shared/ReviewDetails";
import { industries } from "../../../../data/industries";
import { useForm } from "react-hook-form";
import { postSignUp } from "../../../../redux/features/signupSlice";

function OrganizationForm() {
  const dispatch = useDispatch();
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
      value: industry?.id,
    })) || [];

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

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({ mode: "all" });

  const firstname = watch("firstname");
  const lastname = watch("lastname");
  const password = watch("password");
  const phone = watch("phone");
  const confirmPassword = watch("confirmPassword");
  const companyName = watch("companyName");
  const companyEmail = watch("companyEmail");
  const industry = watch("industry");
  const country = watch("country");

  const formSteps = [
    <AccountInfo
      setValue={setValue}
      firstname={firstname}
      lastname={lastname}
      password={password}
      phone={phone}
      confirmPassword={confirmPassword}
    />,
    <CompanyInfo
      setValue={setValue}
      industryOptions={industryOptions}
      countryOptions={countryOptions}
      companyName={companyName}
      companyEmail={companyEmail}
      industry={industry}
      country={country}
    />,
    <ReviewDetails
      details={[
        {
          title: "Account Information",
          content: [
            { title: "Firstname", data: firstname },
            { title: "Lastname", data: lastname },
            { title: "Phone Number", data: phone },
            // { title: "Password", data: lastName },
            // { title: "Confirm Password", data: lastName },
          ],
        },
        {
          title: "Company Information",
          content: [
            { title: "Company Name", data: companyName },
            { title: "Email", data: companyEmail },
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
      country: signUpValues?.country?.value,
      company_name: signUpValues?.companyName,
      industry: signUpValues?.industry?.value
    };

    dispatch(postSignUp({ ...signUpData }))
      .then((result) => {
        const {
          payload: { data },
        } = result;
        const success = Boolean(data?.success);
        if (success === true) {
          navigate("/signup/otp");
        } else {
          
          console.log(result)
          // toast.error(result?.payload?.response?.data?.errors);
        }
      })
      .finally();
  }
  return (
    <>
      <div className="flex flex-col mt-1 w-full gap-6">
        <div className="flex gap-[6rem] pt-[2rem] pb-[4rem] px-10">
          <div className="lg:flex md:flex sm:flex hidden">
            <ProgressBar
              progressSteps={formTitles}
              currentStepIndex={currentStepIndex}
              goTo={goTo}
              vertical
              showStepTitle
            />
          </div>

          <div className="flex flex-col justify-between w-full">
            <form className="flex flex-col gap-[4rem]">{step}</form>
            <div className="flex flex-col">
              {!isLastStep ? (
                <Button disabled={!isValid} onClick={next}>
                  {title.buttonText}
                </Button>
              ) : (
                <Button disabled={!isValid} onClick={handleSubmit(signUp)}>
                  {title.buttonText}
                </Button>
              )}

              {currentStepIndex > 0 ? (
                <button className="text-[12px] self-end mt-3" onClick={back}>
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
