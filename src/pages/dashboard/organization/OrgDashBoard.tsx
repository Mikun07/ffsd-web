import React, { useState } from "react";
import SchoolIcon from "../../../assets/icons/DocumentIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";

// import OpenVerificationTable from "../../../components/table/OpenVerificationTable/OpenVerificationTable";

function OrgDashBoard() {
  const mockData = [
    {
      applicationId: "JD123456",
      date: "15-Dec-23",
      time: "09:30 AM",
      amount: 50,
      currency: "USD",
      phoneNumber: "+1 123-456-7890",
      description: "Passport Renewal",
      applicantName: "John Doe",
      status: "In review",
      documentImage: "https://example.com/document1.jpg",
    },
    {
      applicationId: "JS987654",
      date: "14-Dec-23",
      time: "11:45 AM",
      amount: 300,
      currency: "NGN",
      phoneNumber: "+234 801-234-5678",
      description: "Visa Application",
      applicantName: "Jane Smith",
      status: "Pending",
      documentImage: "https://example.com/document2.jpg",
    },
    {
      applicationId: "AT234567",
      date: "13-Dec-23",
      time: "10:00 AM",
      amount: 75,
      currency: "NGN",
      phoneNumber: "+234 802-345-6789",
      description: "Work Permit",
      applicantName: "Alice Thompson",
      status: "Archived",
      documentImage: "https://example.com/document3.jpg",
    },
    {
      applicationId: "CN654321",
      date: "12-Dec-23",
      time: "02:15 PM",
      amount: 120,
      currency: "EUR",
      phoneNumber: "+86 123-4567-8901",
      description: "Student Visa",
      applicantName: "Chen Nai",
      status: "Queried",
      documentImage: "https://example.com/document4.jpg",
    },
    {
      applicationId: "MM111222",
      date: "11-Dec-23",
      time: "08:00 AM",
      amount: 85,
      currency: "NGN",
      phoneNumber: "+234 803-456-7890",
      description: "Residence Permit",
      applicantName: "Mary Miller",
      status: "In review",
      documentImage: "https://example.com/document5.jpg",
    },
    {
      applicationId: "DL777888",
      date: "10-Dec-23",
      time: "01:30 PM",
      amount: 200,
      currency: "NGN",
      phoneNumber: "+234 904-567-1234",
      description: "Work Visa",
      applicantName: "David Lee",
      status: "Pending",
      documentImage: "https://example.com/document6.jpg",
    },
    {
      applicationId: "SS555444",
      date: "09-Dec-23",
      time: "03:45 PM",
      amount: 90,
      currency: "GBP",
      phoneNumber: "+44 7700-123456",
      description: "Immigration Documents",
      applicantName: "Sarah Simpson",
      status: "Archived",
      documentImage: "https://example.com/document7.jpg",
    },
    {
      applicationId: "EO333222",
      date: "08-Dec-23",
      time: "11:00 AM",
      amount: 110,
      currency: "NGN",
      phoneNumber: "+234 705-678-9012",
      description: "Citizenship Application",
      applicantName: "Emma Olson",
      status: "Queried",
      documentImage: "https://example.com/document8.jpg",
    },
    {
      applicationId: "AB999888",
      date: "07-Dec-23",
      time: "10:20 AM",
      amount: 65,
      currency: "NGN",
      phoneNumber: "+234 806-789-2345",
      description: "Permanent Residency",
      applicantName: "Alex Brooks",
      status: "In review",
      documentImage: "https://example.com/document9.jpg",
    },
    {
      applicationId: "RV444333",
      date: "06-Dec-23",
      time: "12:00 PM",
      amount: 150,
      currency: "USD",
      phoneNumber: "+1 987-654-3210",
      description: "Green Card Renewal",
      applicantName: "Rachel Vaughn",
      status: "Pending",
      documentImage: "https://example.com/document10.jpg",
    },
    {
      applicationId: "FG777666",
      date: "05-Dec-23",
      time: "09:00 AM",
      amount: 80,
      currency: "NGN",
      phoneNumber: "+234 809-876-5432",
      description: "Visa Extension",
      applicantName: "Frank Garcia",
      status: "Archived",
      documentImage: "https://example.com/document11.jpg",
    },
    {
      applicationId: "KH222111",
      date: "04-Dec-23",
      time: "04:30 PM",
      amount: 95,
      currency: "EUR",
      phoneNumber: "+49 170-1234-5678",
      description: "Work Permit Extension",
      applicantName: "Kimberly Hughes",
      status: "Queried",
      documentImage: "https://example.com/document12.jpg",
    },
  ];

  const [tableData, setTableData] = useState(mockData);

  const [modal, openModel] = useState(false);

  const toggleModal = () => {
    openModel(!modal);
  };

  return (
    <>
      <div className="flex flex-col w-full max-h-full">
        {/* <div className="w-full mt-2 flex items-center px-3">
          <div
            onClick={toggleModal}
            className="bg-gray-400 cursor-pointer text-white flex w-[350px] rounded-xl p-3 shadow-sm shadow-gray-400 h-40"
          >
            <div>
              <SchoolIcon width="150" height="" />
            </div>
            <p className="w-full pt-3 font-medium">Verify Document</p>
          </div>

          {modal && (
            <div>
              <div className="bg-black/70 fixed top-0 left-0 w-full h-full z-20"></div>
              <div className="bg-white fixed flex flex-col z-20 top-0 left-0 w-full h-screen overflow-y-auto custom__scrollbar">
                <div className="flex py-1 justify-between bg-white sticky top-0 z-20 w-full items-center">
                  <h1 className="font-semibold text-[25px]">Verify Documents</h1>

                  <button onClick={toggleModal} className="bg-transparent">
                    <CloseIcon />
                  </button>
                </div>

                <div>
                  <div className="flex py-2 justify-center">
                    <p className="text-[12px]">Give us information about the document you want to verify</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div> */}

        <div className="mt-4 mb-14 w-full overflow-y-auto custom__scrollbar">
          <div className="w-full h-12 flex items-center px-4 pt-2 bg-white justify-between z-10 sticky top-0">
            <h3 className="font-bold">Verification History</h3>
            <button className="font-medium text-sm text-gray-700">
              See More
            </button>
          </div>
          {/* <OpenVerificationTable tableData={tableData} /> */}
        </div>
      </div>
    </>
  );
}

export default OrgDashBoard;
