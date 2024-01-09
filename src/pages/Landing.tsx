import React from "react";
import ErrorIMG from "../assets/ErrorIMG";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-2 flex-col w-full h-screen justify-center items-center">
        <div className="w-[540px]">
          <ErrorIMG />
        </div>
        <div>
          <h1 className=" capitalize font-medium text-[20px]">
            page not available...
            <button className="text-primary" onClick={() => navigate("/login")}>Go to Login</button>
          </h1>
        </div>
      </div>
    </>
  );
}

export default Landing;
