import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import LeftView from "./LeftView";
import { RootState } from "../../types/redux/root";
import Logo from "../../assets/Logo";

const OTPPage = () => {
  const navigate = useNavigate();
  const email = useSelector(
    (state: RootState) => state?.signUp?.data?.email || null
  ) as any;

  // State for OTP input and timer
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(120); // 2 minutes

  // Timer effect to decrement the timer every second
  useEffect(() => {
    if (timer === 0) return;
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  // Function to format time in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Function to handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      const nextInput = e.target.nextSibling;
      if (nextInput && value !== "") {
        nextInput.focus();
      }
    }
  };

  // Function to handle Backspace key press
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

  // Function to verify OTP
  const OTP = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/confirm_otp`,
        { email, otp: otp.join("") },
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

  // Function to resend OTP
  const resendOtp = async () => {
    setTimer(120); // Reset timer
    try {
      const response = await axios.post(
        `${BASE_URL}/otp/regenerate`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.data?.success === true) {
        toast.success(response.data?.message);
        toast.success("OTP has been resent");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="bg-white flex h-screen">
        <div className="z-10 absolute lg:top-5 lg:left-[50px] top-6 left-4 flex gap-2 items-center justify-center">
          <Logo />
        </div>

        <LeftView />

        <div className="lg:w-[60%] w-full h-screen flex flex-col items-center justify-center gap-y-3">
          <h2 className="font-semibold text-primary capitalize">
            Verify Email
          </h2>

          <p className="font-medium flex text-sm items-center">
            Enter OTP sent to {email}
          </p>

          <div className="flex justify-center gap-3">
            {otp.map((data, i) => (
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
            ))}
          </div>

          <p className="flex items-center my-3 text-[15px] leading-4 tracking-wide">
            Didn't receive OTP?{" "}
            {timer !== 0 ? (
              <p className="bg-transparent cursor-pointer p-2 text-[#D4973B]">
                {formatTime(timer)}
              </p>
            ) : (
              <button
                onClick={resendOtp}
                disabled={timer !== 0}
                className="bg-transparent p-2 font-bold text-[#D4973B]"
              >
                Resend
              </button>
            )}
          </p>

          <div className="flex justify-center">
            <button
              onClick={OTP}
              type="submit"
              className="flex capitalize text-base text-[#40B52D] font-semibold items-center justify-center rounded-xl px-10 py-2 border-2 border-[#40B52D] bg-transparent hover:text-white hover:bg-[#D4973B] hover:bg-opacity-85 hover:border-none"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPPage;
