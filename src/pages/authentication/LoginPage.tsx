import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../../assets/Logo";
import Button from "../../components/button/Button";
import { postLogin } from "../../redux/features/loginSlice";
import LeftView from "./LeftView";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormTextInput from "../../components/input/Form/FormTextInput";
import FormPasswordInput from "../../components/input/Form/FormPasswordInput";
import Loading from "../../components/withStatus/loading/Loading";
import { RootState } from "../../types/redux/root";
import { ThunkDispatch } from "@reduxjs/toolkit";

function LoginPage() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const { loading: loginLoading, error: loginError } = useSelector(
    (state: RootState) => state?.login
  );

  const redirectUrl = {
    org: "/org/dashboard",
    indv: "/dashboard",
    staff: "/org/dashboard",
  };

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({ mode: "all" });

  function login(data) {
    // @ts-ignore
    dispatch(postLogin({ ...data })).then((result) => {
      const { payload } = result;
      if (payload?.token) {
        if (payload?.user?.category) {
          navigate(redirectUrl[payload?.user?.category]);
          toast.success(payload?.message);
        } else {
          toast.error(loginError);
        }
      } else {
        toast.error("Invalid Email or Password");
      }
    });
  }

  return (
    <>
      {loginLoading ? (
        <Loading />
      ) : (
        <div className="bg-white flex h-screen">
          <div className="z-10 absolute lg:top-5 lg:left-[50px] top-6 left-4 flex gap-2 items-center justify-center">
            <Logo />
          </div>

          <LeftView />

          <div className="lg:w-[60%] w-full h-screen flex flex-col items-center justify-center lg:gap-y-3">
            <div className="flex flex-col justify-center lg:w-[50%] w-full items-center gap-y-6">
              <h4 className="text-[#40B52D] mt-10 font-semibold self-center">
                Login to account
              </h4>

              <form
                onSubmit={handleSubmit(login)}
                className="flex flex-col px-8 gap-6 mt-5 w-full"
              >
                <FormTextInput
                  label="email"
                  errors={errors}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                  onChange={(e) => setValue("email", e.target.value)}
                  disabled={loginLoading}
                />
                <FormPasswordInput
                  label="password"
                  errors={errors}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                  onChange={(e) => setValue("password", e.target.value)}
                  disabled={loginLoading}
                />

                <div className="flex flex-col gap-2">
                  <Button type="submit" disabled={!isValid || loginLoading}>
                    Login
                  </Button>
                  {/* <div className="flex justify-end">
                    <p
                      onClick={() => navigate("/forgotpassword")}
                      className="text-xs cursor-pointer"
                    >
                      Forgot password?
                    </p>
                  </div> */}
                </div>
              </form>
              <p className="text-[15px] font-semibold capitalize self-center">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-[#40B52D] cursor-pointer hover:text-[#D4973B] hover:text-opacity-85"
                >
                  Sign up
                </span>
              </p>

              <div className="mt-8"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
