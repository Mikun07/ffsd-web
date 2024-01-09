import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../../assets/Logo";
import TextInput from "../../components/input/TextInput";
import PasswordInput from "../../components/input/PasswordInput";
import Button from "../../components/button/Button";
import { postLogin } from "../../redux/features/loginSlice";
import LeftView from "./LeftView";
import { useDispatch } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectUrl = {
    org: "/org/dashboard",
    admin: "/admin/dashboard",
    indv: "/org/dashboard",
  };

  function login() {
    const loginData = { email, password };
    dispatch(postLogin({ ...loginData }))
      .then((result) => {
        const {
          payload: { data },
        } = result;
        if (data?.token) {
          localStorage.setItem("authToken", JSON.stringify(data.token));
          if (data?.user?.category) {
            navigate(redirectUrl[data?.user?.category]);
            toast.success(data?.message);
          } else {
            toast.error(result?.data?.error);
          }
        }
      })
      .finally();
  }


  return (
    <>
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
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
              className="flex flex-col px-8 gap-6 mt-5 w-full"
            >
              <TextInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex flex-col gap-2">
                <Button type="submit">Login</Button>
                <div className="flex justify-end">
                  <p
                    onClick={() => navigate("/forgotpassword")}
                    className="text-xs cursor-pointer"
                  >
                    Forgot password?
                  </p>
                </div>
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
    </>
  );
}

export default LoginPage;
