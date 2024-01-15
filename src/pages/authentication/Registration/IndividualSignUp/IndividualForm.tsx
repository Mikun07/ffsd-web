import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from "react-hot-toast";
import { BASE_URL } from "../../../../config/api";
import { postSignUp } from "../../../../redux/features/signupSlice";
import { useDispatch } from "react-redux";
import Button from "../../../../components/button/Button";
import { useForm } from "react-hook-form";
import AccountInfo from "./shared/AccountInfo";
import ReviewDetails from "./shared/ReviewDetails";
import ProgressBar from "../../../../components/progressBar/ProgressBar";
import { useMultiStepForm } from "../../../../hooks/useMultiTabForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const IndividualSchema = z
    .object({
      firstname: z.string().min(2).max(30),
      lastname: z.string().min(2).max(30),
      email: z.string().email(),
      phone: z.string().min(5).max(15),
      password: z.string().min(7).max(20),
      confirmPassword: z.string().min(7).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({ resolver: zodResolver(IndividualSchema), mode: "all" });

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

  const country = watch("country");

  const allValues = watch();
  console.log({ allValues });

  const formSteps = [
    <AccountInfo
      setValue={setValue}
      errors={errors}
      register={register}
      countryOptions={countryOptions}
      country={country}
    />,
    <ReviewDetails
      details={[
        {
          title: "Account Information",
          content: [
            { title: "Firstname", data: allValues.firstname },
            { title: "Lastname", data: allValues.lastname },
            { title: "Phone Number", data: allValues.phone },
            { title: "Email", data: allValues.email },
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

  // function setCountry(item) {
  //   setValue(item?.label, item?.value);
  // }

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
      const success: boolean = Boolean(data?.success);
      if (success === true) {
        navigate("/signup/otp");
      } else {
        // console.log(result?.payload?.response?.data?.errors);
        // toast.error(result?.payload?.response?.data?.errors);
      }
    })
    .finally(); // Remove this line if you don't need a finally block
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
            <form className="flex flex-col gap-[4rem] w-full h-full">
              {step}
            </form>
            <div className="flex mt-4 flex-col">
              {!isLastStep ? (
                <Button disabled={!isValid} onClick={next}>
                  {title.buttonText}
                </Button>
              ) : (
                <Button onClick={handleSubmit(signUp)}>
                  {title.buttonText}
                </Button>
              )}

              {currentStepIndex > 0 ? (
                <button
                  className="text-[15px] font-medium p-2 self-end"
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

export default IndividualForm;
