import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../../config/api";
import { postSignUp } from "../../../../redux/features/signupSlice";
import { useDispatch } from "react-redux";
import Button from "../../../../components/button/Button";
import { useForm } from "react-hook-form";
import AccountInfo from "./shared/AccountInfo";
import ReviewDetails from "./shared/ReviewDetails";
import ProgressBar from "../../../../components/progressBar/ProgressBar";
import { useMultiStepForm } from "../../../../hooks/useMultiTabForm";

function IndividualForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);

  const countryOptions =
    countryData?.map((country) => ({
      label: country?.name,
      value: country?.id,
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

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({ mode: "all" });

  const formTitles = [
    {
      title: "Account Information",
      info: "Enter your personal details",
      buttonText: "Review and Submit Details",
    },
    {
      title: "Review and Save",
      info: "Review details",
      buttonText: "Submit Details",
    },
  ];

  const firstname = watch("firstname");
  const lastname = watch("lastname");
  const password = watch("password");
  const phone = watch("phone");
  const email = watch("email");
  const confirmPassword = watch("confirmPassword");
  const country = watch("country");

  const formSteps = [
    <AccountInfo
      setValue={setValue}
      firstname={firstname}
      lastname={lastname}
      password={password}
      phone={phone}
      email={email}
      confirmPassword={confirmPassword}
      countryOptions={countryOptions}
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
            { title: "Email", data: email },
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

  function setCountry(item) {
    setValue(item?.label, item?.value);
  }

  function signUp(signUpValues) {
    const signUpData = {
      firstName: signUpValues?.firstname,
      lastName: signUpValues?.lastname,
      email: signUpValues?.email,
      phone: signUpValues?.phone,
      password: signUpValues?.password,
      password_confirmation: signUpValues?.confirmPassword,
      category: "indv",
      country: signUpValues?.country?.value,
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
          // console.log(result?.payload?.response?.data?.errors);
          toast.error(result?.payload?.response?.data?.errors);
        }
      })
      .finally();
  }

  return (
    <>
      <div className="flex flex-col mt-1 w-full gap-6">
        <div className="flex gap-[6rem] pt-[2rem] pb-[4rem]">
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
            <form className="flex flex-col gap-[4rem] w-full h-full">{step}</form>
            <div className="flex mt-4 flex-col">
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
                <button className="text-[15px] font-medium p-2 self-end" onClick={back}>
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

export default IndividualForm;
