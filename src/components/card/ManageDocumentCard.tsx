import React from "react";

function ManageDocumentCard({
  header,
  headerNumber,
  titleOne,
  titleTwo,
  titleThree,
  titleOneNumber,
  titleTwoNumber,
  titleThreeNumber,
}) {
  return (
    <>
      <div className="bg-slate-200 w-[330px] h-[180px] p-2 rounded-lg">
        <div className="p-3 flex flex-col gap-3">
          <div className=" flex justify-between items-center">
            <h1 className="text-[20px] font-semibold capitalize">{header}</h1>
            <h1 className="font-bold text-primary">{headerNumber}</h1>
          </div>
          <div className="flex flex-col gap-2 font-medium text-[16px] text-gray-500 capitalize">
            <div className="flex justify-between">
              <p>{titleTwo}</p>
              <p className="font-bold text-primary">{titleTwoNumber}</p>
            </div>
            <div className="flex justify-between">
              <p>{titleThree}</p>
              <p className="font-bold text-primary">{titleThreeNumber}</p>
            </div>
            <div className="flex justify-between">
              <p>{titleOne}</p>
              <p className="font-bold text-primary">{titleOneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageDocumentCard;
