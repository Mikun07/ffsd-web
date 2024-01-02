import React, { useState } from "react";
import CloseIcon from "../../../../assets/icons/CloseIcon";
import DownloadIcon from "../../../../assets/icons/DownloadIcon";

function VerificationTableColumn({ data }) {
  const {
    applicationId,
    date,
    time,
    amount,
    currency,
    phoneNumber,
    description,
    documentImage,
    applicantName,
    status,
  } = data;

  const getStatusColor = (status) => {
    switch (status) {
      case "In review":
        return "#46A437";
      case "Pending":
        return "#D4973B";
      case "Archived":
        return "#D1D43B";
      case "Queried":
        return "#D43B3B";
      default:
        return "";
    }
  };

  const [modal, openModel] = useState(false);

  const toggleModal = () => {
    openModel(!modal);
  };
  return (
    <>
      <div
        onClick={toggleModal}
        className="flex hover:bg-gray-100 px-3 rounded-lg h-[72px] items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
            <p className="font-semibold">
              {applicantName.split(" ")[0][0]}
              {applicantName.split(" ")[1][0]}
            </p>
          </div>
          <div className="font-medium">
            <h5 className="text-[16px] font-semibold text-black capitalize">
              {applicantName}
            </h5>
            <p className="flex items-center text-[12px] text-gray-400 gap-2">
              {applicationId}
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              {date}
            </p>
          </div>
        </div>

        <div className="flex flex-col font-medium">
          <p className="flex justify-end items-center text-[12px] text-black font-semibold gap-2">
            {description}
          </p>
          <p
            className="flex justify-end items-center text-[12px] gap-2"
            style={{
              color: getStatusColor(status),
            //   opacity: "0.95",
            }}
          >
            {status}
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            {currency} {amount}
          </p>
        </div>
      </div>

      {modal && (
        <div>
          <div className="bg-black/70 fixed top-0 left-0 w-full h-full z-20"></div>
          <div className="bg-white fixed px-2 top-0 right-0 lg:w-[400px] w-full z-20 h-screen overflow-y-auto custom__scrollbar">
            <div className="flex py-1 justify-between bg-white sticky top-0  z-20 w-full items-center">
              <h1 className="font-semibold">Transaction Details</h1>

              <button onClick={toggleModal} className="bg-transparent">
                <CloseIcon />
              </button>
            </div>

            <div className="capitalize gap-y-6 flex flex-col h-full px-4 mt-5">
              <div className="w-[150px] h-[200px] relative overflow-hidden group mb-2 rounded-t-lg cursor-pointer bg-gray-300">
                <img
                  src={documentImage}
                  alt=""
                  className="w-[150px] h-[200px] rounded-t-lg cursor-pointer"
                />
                <div className=" absolute w-[150px] h-[200px] bg-black/75 rounded-t-lg flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="text-white text-3xl">
                    <DownloadIcon />
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Application ID
                </label>
                <input
                  type="text"
                  className="h-7 text-sm font-medium px-2 bg-transparent border-b-2 text-black"
                  disabled
                  placeholder={applicationId}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Applicant Name
                </label>
                <input
                  type="text"
                  className="h-7 text-sm font-medium px-2 bg-transparent border-b-2 text-black"
                  disabled
                  placeholder={applicantName}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="h-7 text-sm font-medium px-2 bg-transparent border-b-2 text-black"
                  disabled
                  placeholder={phoneNumber}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Amount <span className="text-gray-400">{currency}</span>
                </label>
                <input
                  type="number"
                  className="h-7 text-sm font-medium px-2 bg-transparent border-b-2 text-black"
                  disabled
                  placeholder={amount}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Description
                </label>
                <input
                  type="text"
                  className="h-7 text-sm font-medium px-2 bg-transparent border-b-2 text-black"
                  disabled
                  placeholder={description}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Date
                </label>
                <input
                  type="text"
                  className="h-7 text-sm font-medium px-2 bg-transparent border-b-2 text-black"
                  disabled
                  placeholder={date}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Time
                </label>
                <input
                  type="text"
                  className="h-7 text-sm font-medium px-2 bg-transparent border-b-2 text-black"
                  disabled
                  placeholder={time}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VerificationTableColumn;
