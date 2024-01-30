import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useMultiStepForm } from "../../../hooks/useMultiTabForm";
import { postAdminSignUp } from "../../../redux/features/Admin/adminSignUpSlice";
import ProgressBar from "../../../components/progressBar/ProgressBar";
import Button from "../../../components/button/Button";
import AccountInfo from "./shared/AccountInfo";
import ReviewDetails from "./shared/ReviewDetails";
import AdminLeftView from "./shared/AdminLeftView";
import LogoDP from "../../../assets/Logo.png";

const AdminSignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AdminSchema = z
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
  } = useForm({ resolver: zodResolver(AdminSchema), mode: "all" });

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

  function adminSignUp(signUpValues) {
    const signUpData = {
      firstName: signUpValues?.firstname,
      lastName: signUpValues?.lastname,
      email: signUpValues?.email,
      phone: signUpValues?.phone,
      password: signUpValues?.password,
      password_confirmation: signUpValues?.confirmPassword,
    };

    dispatch(postAdminSignUp({ ...signUpData }))
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
      <div className="bg-white flex h-screen">
        <div className="z-10 absolute lg:top-5 lg:left-[50px] top-6 left-4 flex gap-2 items-center justify-center">
          <div className="w-[50px] cursor-pointer">
            <img src={LogoDP} alt="" />
          </div>
          <p className="flex flex-col cursor-pointer font-bold lg:leading-5 leading-3 tracking-tight capitalize lg:text-[15px] text-[12px] text-[#40B52D]">
            Document And Qualification Verification LTD
            <span className="text-[#D4973B]">Admin</span>
          </p>
        </div>

        <AdminLeftView />

        <div className="lg:w-[60%] w-full h-screen flex flex-col items-center justify-center lg:gap-y-3">
          <h4 className="text-[#40B52D] mt-10 font-semibold self-center">
            Admin Sign Up
          </h4>

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
              <form>{step}</form>
              <div className="flex mt-4 flex-col">
                {!isLastStep ? (
                  <Button disabled={!isValid} onClick={next}>
                    {title.buttonText}
                  </Button>
                ) : (
                  <Button onClick={handleSubmit(adminSignUp)}>
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

          <p className="text-[15px] font-semibold capitalize self-center">
            I'm already an admin{" "}
            <span
              onClick={() => navigate("/admin/login")}
              className="text-[#40B52D] cursor-pointer hover:text-[#D4973B] hover:text-opacity-85"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminSignUpPage;
