import React, { useState } from "react";
import CloseIcon from "../../../../assets/icons/CloseIcon";


function TableColumn({ data }) {
  const { transactionId, date, time, amount, phoneNumber, description, currency, customerName, status } =
    data;

  const getStatusColor = (status) => {
    switch (status) {
      case "Successful":
        return "#46A437";
      case "Pending":
        return "#D4973B";
      case "Failed":
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
      <div onClick={toggleModal} className="flex hover:bg-gray-100 px-3 rounded-lg h-[72px] items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
            <p className="font-semibold">
              {customerName.split(" ")[0][0]}
              {customerName.split(" ")[1][0]}
            </p>
          </div>
          <div>
            <h5 className="text-[16px] text-black capitalize font-semibold">
              {customerName}
            </h5>
            <p className="flex items-center text-[12px] font-medium text-gray-400 gap-2">
              {time}
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              {date}
            </p>
          </div>
        </div>

        <div className="flex flex-col font-medium">
          <p className="flex justify-end items-center text-[12px] text-black gap-2">
            {amount}
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            {currency}
          </p>
          <h5
            className="flex justify-end items-center text-[12px] gap-2"
            style={{
              color: getStatusColor(status),
              opacity: "0.95",
            }}
          >
            {status}
          </h5>
        </div>
      </div>

      {modal && (
            <div>
              <div className="bg-black/70 fixed top-0 left-0 w-full h-full z-20"></div>
              <div className="bg-white fixed px-2 top-0 right-0 lg:w-[400px] w-full z-20 h-screen">
                <div className="flex py-1 justify-between w-full items-center">
                  <h1 className="font-semibold">Transaction Details</h1>

                  <button onClick={toggleModal} className="bg-transparent">
                    <CloseIcon />
                  </button>
                </div>

                <div className="capitalize gap-y-6 flex flex-col h-full px-4 mt-10 overflow-y-auto">
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium">Transaction ID</label>
                    <input type="text" className="h-8 text-sm font-medium px-2 bg-transparent border-b-2 text-black" disabled placeholder={transactionId}/>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium">Customer Name</label>
                    <input type="text" className="h-8 text-sm font-medium px-2 bg-transparent border-b-2 text-black" disabled placeholder={customerName}/>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium">Phone Number</label>
                    <input type="number" className="h-8 text-sm font-medium px-2 bg-transparent border-b-2 text-black" disabled placeholder={phoneNumber}/>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium">Amount{" "}<span className="text-gray-400">{currency}</span></label>
                    <input type="number" className="h-8 text-sm font-medium px-2 bg-transparent border-b-2 text-black" disabled placeholder={amount}/>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium">Status</label>
                    <input type="text" className="h-8 text-sm font-medium px-2 bg-transparent border-b-2 text-black" disabled placeholder={status}/>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium">Description</label>
                    <input type="text" className="h-8 text-sm font-medium px-2 bg-transparent border-b-2 text-black" disabled placeholder={description}/>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium">Date</label>
                    <input type="text" className="h-8 text-sm font-medium px-2 bg-transparent border-b-2 text-black" disabled placeholder={date}/>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium">Time</label>
                    <input type="text" className="h-8 text-sm font-medium px-2 bg-transparent border-b-2 text-black" disabled placeholder={time}/>
                  </div>
                </div>
              </div>
            </div>
          )}
    </>
  );
}

export default TableColumn;
