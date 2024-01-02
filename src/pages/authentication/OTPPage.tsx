import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";
import Logo from "../../assets/Logo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DisplayIMG from "../../assets/DisplayIMG";
import axios from "axios";
import toast from "react-hot-toast";

function OTPPage() {
  const navigate = useNavigate;
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const email = useSelector((state) => state?.signUp?.data?.email || null);

  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(minutes * 60);

  const restartTimer = () => {
    setSeconds(minutes * 60);
  };

  async function resendOtp() {
    restartTimer();
    try {
      let OTPResend = await axios.post(
        `${BASE_URL}/otp/regenerate`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (OTPResend.success) {
        navigate("/login");
        toast.success(success.message);
      } else {
        toast.alert(message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return false;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const nextInput = e.target.nextSibling;
    if (nextInput && value !== "") {
      nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      const previousInput = e.target.previousSibling;
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  async function OTP() {
    try {
      console.log({ otp: otp.join("") });
      let OTPResult = await axios.post(
        `${BASE_URL}/confirm_otp`,
        {
          email,
          otp: otp.join(""),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (OTPResult.success.success) {
        navigate("/");
        toast.success(success.message);
      } else {
        toast.alert(message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <div className="bg-white flex h-screen">
        <div className="z-10 absolute lg:top-5 lg:left-[50px] top-6 left-4 flex gap-2 items-center justify-center">
          <Logo />
        </div>

        <div className="lg:flex w-[40%] ml-12 hidden items-center justify-center">
          <DisplayIMG width="400" />
        </div>

        <div className="lg:w-[60%] w-full h-screen flex flex-col items-center justify-center gap-y-3">
          <h2 className=" font-semibold text-primary capitalize">
            Verify Email
          </h2>

          <p className="font-medium flex text-sm items-center">
           Enter OTP sent to {` ${email}`}
          </p>

          <div className="flex justify-center gap-3">
            {otp.map((data, i) => {
              return (
                <input
                  key={i}
                  name="otp"
                  type="text"
                  value={data}
                  className="rounded-lg bg-gray-200 text-lg ring-2 ring-primary focus:ring-[#D4973B] outline-none flex m-auto text-center font-bold h-8 w-8"
                  maxLength={1}
                  onChange={(e) => handleChange(e, i)}
                  onFocus={(e) => e.target.select()}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                />
              );
            })}
          </div>

          <p className=" flex items-center my-3 text-[15px] leading-4 tracking-wide">
            Didn't receive OTP?{" "}
            <span>
              {seconds !== 0 ? (
                <p className="bg-transparent cursor-pointer p-2 text-[#D4973B]">
                  {formatTime(seconds)}
                </p>
              ) : (
                <button
                  onClick={resendOtp}
                  disabled={seconds !== 0}
                  className="bg-transparent p-2 font-bold text-[#D4973B]"
                >
                  Resend
                </button>
              )}
            </span>
          </p>

          <div className="flex justify-center">
            <button
              onClick={OTP}
              type="submit"
              className="flex capitalize text-base text-[#40B52D] font-semibold items-center justify-center rounded-xl px-10 py-2 border-2 border-[#40B52D] bg-transparent hover:text-white hover:bg-[#D4973B] hover:bg-opacity-85 hover:border-[#D4973B] hover:border-opacity-85"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OTPPage;
