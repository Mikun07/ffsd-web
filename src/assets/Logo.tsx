import React from "react";
import LogoDP from "./Logo.png"

function Logo() {
  return (
    <>
      <div className="w-[50px] cursor-pointer">
        <img src={LogoDP} alt="" />
      </div>
      <b className="flex flex-col cursor-pointer leading-4 tracking-wider capitalize text-[15px] text-[#40B52D]">
        Documents <span className="text-[#D4973B]">Verification</span>
      </b>
    </>
  );
}

export default Logo;
