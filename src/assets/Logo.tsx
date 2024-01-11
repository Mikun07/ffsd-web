import React from "react";
import LogoDP from "./Logo.png";

function Logo() {
  return (
    <>
      <div className="w-[50px] cursor-pointer">
        <img src={LogoDP} alt="" />
      </div>
      <p className="flex flex-col cursor-pointer font-bold leading-3 tracking-tight capitalize text-[12px] text-[#40B52D]">
        Document And Qualification Verification 
        <span className="text-[#D4973B]">LTD</span>
      </p>
    </>
  );
}

export default Logo;
