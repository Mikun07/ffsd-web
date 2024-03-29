import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from "react-hot-toast";
// import { BASE_URL } from "../../../../config/api";
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
import { ThunkDispatch } from "@reduxjs/toolkit";

function IndividualForm() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const IndividualSchema = z
    .object({
      firstname: z.string().min(2).max(30),
      lastname: z.string().min(2).max(30),
      email: z.string().email(),
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

  const allValues = watch();

  const formSteps = [
    <AccountInfo setValue={setValue} errors={errors} register={register} />,
    <ReviewDetails
      details={[
        {
          title: "Account Information",
          content: [
            { title: "Firstname", data: allValues.firstname },
            { title: "Lastname", data: allValues.lastname },
            { title: "Phone Number", data: allValues.phone },
            { title: "Email", data: allValues.email },
            // { title: "Country", data: country?.label },
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
      email: signUpValues?.email,
      phone: signUpValues?.phone,
      password: signUpValues?.password,
      password_confirmation: signUpValues?.confirmPassword,
      category: "indv",
      // country: signUpValues?.country?.value,
    };

    // @ts-ignore
    dispatch(postSignUp({ ...signUpData }))
      .then((result) => {
        const {
          payload: { data },
        } = result;
        const success: boolean = Boolean(data?.success);
        if (success === true) {
          navigate("/signup/otp");
        } else {
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
