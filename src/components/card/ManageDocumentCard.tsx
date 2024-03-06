import React from "react";

function ManageDocumentCard({ header, headerNumber, titles }) {
  return (
    <>
      <div className="bg-slate-200 w-full md:w-[330px] p-2 rounded-lg">
        <div className="p-3 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] md:text-[24px] font-semibold capitalize">
              {header}
            </h1>
            {headerNumber && (
              <h1 className="font-bold text-primary">{headerNumber}</h1>
            )}
          </div>
          <div className="flex flex-col gap-2 font-medium text-[16px] md:text-[18px] text-gray-500 capitalize">
            {titles.map((titleObj, index) => (
              <div className="flex justify-between" key={index}>
                <p>{titleObj.title}</p>
                <p className="font-bold text-primary">{titleObj.number}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageDocumentCard;
