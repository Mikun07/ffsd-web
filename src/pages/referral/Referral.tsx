import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchReferral } from "../../redux/features/referralSlice";
import { RootState } from "../../types/redux/root";
import Loading from "../../components/withStatus/loading/Loading";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AccountInfo from "./AccountInfo";
import ReviewDetails from "./ReviewDetails";
import OTPPage from "./OTPPage";
import { useMultiStepForm } from "../../hooks/useMultiTabForm";
import Button from "../../components/button/Button";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config/api";
import axios from "axios";
import Logo from "../../assets/Logo";
import LeftView from "./LeftView";
import { postSignUp } from "../../redux/features/signupSlice";
import ProgressBar from "../../components/progressBar/ProgressBar";

const Referral = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { referral } = useParams();
  const navigate = useNavigate();

  const { data: referralData, loading: loadingReferral } = useSelector(
    (state: RootState) => state?.getReferral
  );
  const email = useSelector(
    (state: RootState) => state?.signUp?.data?.email || null
  ) as any;
  const loadingPage = useSelector((state: RootState) => state?.signUp?.loading);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    dispatch(fetchReferral({ referral }));
  }, [referral]);

  const ReferralSchema = z
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
  } = useForm({ resolver: zodResolver(ReferralSchema), mode: "all" });

  const formTitles = [
    {
      title: "Account Information",
      info: "Enter your personal details",
      buttonText: "Review",
    },
    {
      title: "Review and Submit",
      info: "Review your information",
      buttonText: "Submit Details",
    },
    {
      title: "Enter OTP",
      info: "Enter your OTP",
      buttonText: "Verify",
    },
  ];
  const allValues = watch();

  const getOTPValue = (otp) => {
    setOtp(otp)
  }

  const OTP = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/confirm_otp`,
        { email, otp: otp },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.data[0]?.success === true) {
        navigate("/login");
        toast.success(response.data[0]?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

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
          ],
        },
      ]}
    />,
    <OTPPage onComplete={(data) => getOTPValue(data)} />,
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

  function referralSignUp(signUpValues) {
    const signUpData = {
      firstName: signUpValues?.firstname,
      lastName: signUpValues?.lastname,
      email: signUpValues?.email,
      phone: signUpValues?.phone,
      password: signUpValues?.password,
      password_confirmation: signUpValues?.confirmPassword,
      category: "student",
      referral: referral,
    };
    // @ts-ignore
    dispatch(postSignUp({ ...signUpData })).then((result) => {
      const { payload } = result;
      const success: boolean = Boolean(payload?.data?.success);
      if (success === true) {
        next();
        toast.success(payload?.data?.message);
      } else {
        // toast.error(result?.payload?.response?.data?.errors);
      }
    });
  }

  return (
    <>
      {loadingReferral ? (
        <Loading />
      ) : (
        <>
          {loadingPage ? (
            <Loading />
          ) : (
            <>
              <div className="z-10 absolute lg:top-5 lg:left-[50px] top-6 left-4 flex gap-2 items-center justify-center">
                <Logo />
              </div>
              <div className="flex h-screen justify-between">
                <LeftView />

                <div className="w-full lg:w-[50%] h-screen flex flex-col items-center justify-center">
                  <h4 className="text-[#40B52D] font-bold self-center mb-6 capitalize">
                    Create Account under{" "}
                    <span className="uppercase">
                      {referralData?.company_name}
                    </span>
                  </h4>

                  <div className="flex flex-col mt-1 w-full gap-6">
                    <div className="flex gap-[6rem] px-4 pt-[2rem] pb-[4rem]">
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
                        <div className="flex w-full mt-6 flex-col">
                          {currentStepIndex == 1 ? (
                            <>
                              <Button onClick={handleSubmit(referralSignUp)}>
                                {title.buttonText}{" "}
                              </Button>
                            </>
                          ) : !isLastStep ? (
                            <>
                              <Button disabled={!isValid} onClick={next}>
                                {title.buttonText}
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button onClick={OTP}>{title.buttonText}</Button>
                            </>
                          )}
                          {currentStepIndex > 0 ? (
                            <div className="w-full py-2 flex justify-end">
                              <button
                                className="text-[12px] self-end"
                                onClick={back}
                              >
                                {" <   "}Go back to{" "}
                                {titles[currentStepIndex - 1].title}
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Referral;
