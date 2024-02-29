import React from "react";
import { BsPersonFill } from "react-icons/bs";

const ManageDocumentCardWithImage = ({ header, number, icon: Icon }) => {
  return (
    <>
      <div className="bg-slate-200 w-[330px] p-2 rounded-lg">
        <div className="p-3 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-semibold capitalize">{header}</h1>
          </div>

          <div className="flex items-center justify-between w-full h-full">
            <div>
              <h1 className="font-bold text-8xl text-primary">{number}</h1>
            </div>
            <div className="flex items-center ">
              {Icon && <Icon size={100} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageDocumentCardWithImage;
