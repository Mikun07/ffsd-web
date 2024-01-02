import React from "react";
import Logo from "../../../assets/Logo";

function ForgotPasswordPage() {
  return (
    <div className="bg-gray-300 relative flex justify-center items-center overflow-hidden w-full h-screen">
      <div className="top-0 right-0 left-0 bottom-0 z-10">
        <span className="rotate-45 absolute z-30 h-[520px] w-[520px] bg-white top-[-195px] lg:left-[-260px] left-[-400px] rounded-t-[22px]"></span>
        <span className="rotate-45 absolute z-20 h-[420px] w-[420px] bg-[#D4973B] top-[-390px] lg:right-5 right-[-140px] rounded-[52px]"></span>
        <span className="rotate-45 absolute z-20 h-[520px] w-[172px] bg-[#FFFFFF] rounded-[52px] lg:top-[-16px] top-[106px] right-[-20px]"></span>
        <span className="rotate-45 absolute z-20 h-[400px] w-[200px] bg-gradient-to-r from-[#D4973B] to-[#936013] rounded-[52px] lg:top-[420px] lg:right-[30px] top-[620px] right-[10px]"></span>
      </div>

      <div className="text-xl z-40 absolute lg:top-5 lg:left-5 top-10 left-2 flex gap-2 items-center justify-center">
        <Logo />
      </div>

      <div className="flex w-full h-screen justify-center items-center">
        <div className="bg-white absolute z-50 lg:p-10 p-6 flex flex-col items-center border-t-4 border-[#40B52D] rounded-lg shadow-2xl">
          <div className="flex gap-3 items-center">
            <div className="h-[60px] w-[60px] bg-transparent border-2 border-[#40B52D] flex items-center justify-center rounded-full font-bold text-2xl active:bg-[#40B52D]">
              1
            </div>
            <hr className="border-2 border-[#40B52D] w-24 flex rounded-md" />
            <div className="h-[60px] w-[60px] bg-transparent border-2 border-[#40B52D] flex items-center justify-center rounded-full font-bold text-2xl active:bg-[#40B52D]">
              2
            </div>
            <hr className="border-2 border-[#40B52D] w-24 flex rounded-md" />
            <div className="h-[60px] w-[60px] bg-transparent border-2 border-[#40B52D] flex items-center justify-center rounded-full font-bold text-2xl active:bg-[#40B52D]">
              3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
