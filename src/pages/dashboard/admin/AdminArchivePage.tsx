import React, { useState } from "react";
import FilterIcon from "../../../assets/icons/FilterIcon";
import ArchivedTable from "../../../components/table/ArchivedTable";
import OpenVerificationTable from "../../../components/table/OpenVerificationTable/OpenVerificationTable";

function AdminArchivePage() {
  const [open, setOpen] = useState(false);

  const status = [
    { name: "By Archived" },
    { name: "by Review" },
    { name: "by Pending" },
    { name: "by Queried" },
  ];

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
    // Add more entries here...
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

  return (
    <>
      <div className="mt-3 w-full flex items-center justify-between px-3">
        <div>
          <b className="lg:text-xl">Verification History</b>
        </div>

        <div className="flex items-center gap-2">
          <b className=" capitalize">filter</b>
          <button
            onClick={() => setOpen(!open)}
            className="bg-transparent shadow-md rounded-lg relative flex items-center justify-center border-2 border-[#40B52D] p-1"
          >
            <FilterIcon />
          </button>
          {open && (
            <div className="absolute z-20 sm:bottom-[250px] top-[100px] right-[20px] overflow-y-auto custom__scrollbar border-2 rounded-lg bg-white w-[200px] h-[120px]">
              {status.map(({ name }, index) => (
                <button
                  key={index}
                  onClick={() => setOpen(!open)}
                  className="flex flex-col pl-2 py-2 w-full text-black hover:bg-[#40B52D] hover:text-white"
                >
                  <p className="font-semibold capitalize">{name}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-1 h-full overflow-y-auto custom__scrollbar mt-5 pb-[120px]">
        <OpenVerificationTable tableData={tableData} />
      </div>
    </>
  );
}

export default AdminArchivePage;
