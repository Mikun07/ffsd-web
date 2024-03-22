import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types/redux/root";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchUser } from "../../../redux/features/userSlice";

const GetCost = ({ data }) => {
  
  const PaymentData = data?.data || [];


  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Receipt</h1>
          <div className="grid grid-cols-1 gap-4">
            {PaymentData?.data?.educational && (
              <div className="border-b-2 border-gray-200 pb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Educational Documents
                </h2>
                <p>
                  <span className="font-semibold">School:</span>{" "}
                  {PaymentData?.data?.educational.documents[0].school}
                </p>
                <p>
                  <span className="font-semibold">Surcharge:</span>{" "}
                  <span>&#8358;</span>{" "}{PaymentData?.data?.educational.documents[0].surcharge}
                </p>
                <p>
                  <span className="font-semibold">Number of Documents:</span>{" "}
                  {PaymentData?.data?.educational?.number_docs}
                </p>
                <p>
                  <span className="font-semibold">Charge Per Document:</span>{" "}
                  <span>&#8358;</span>{" "}{PaymentData?.data?.educational.documents[0].charge_per_one}
                </p>
                <p>
                  <span className="font-semibold">Charge Total:</span>{" "}
                  <span>&#8358;</span>{" "}{PaymentData?.data?.educational.documents[0].charge_total}
                </p>
              </div>
            )}
            {PaymentData?.data?.financial && (
              <div className="border-b-2 border-gray-200 pb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Financial Documents
                </h2>
                <p>
                  <span className="font-semibold">Number of Documents:</span>{" "}
                  {PaymentData?.data?.financial.number_docs}
                </p>
                <p>
                  <span className="font-semibold">Charge Per Document:</span>{" "}
                  <span>&#8358;</span>{" "}{PaymentData?.data?.financial?.charge_per_one}
                </p>
                <p>
                  <span className="font-semibold">Charge Total:</span>{" "}
                  <span>&#8358;</span>{" "}{PaymentData?.data?.financial?.charge_total}
                </p>
              </div>
            )}
            {PaymentData?.data?.professional && (
              <div className="border-b-2 border-gray-200 pb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Professional Documents
                </h2>
                <p>
                  <span className="font-semibold">Number of Documents:</span>{" "}
                  {PaymentData?.data?.professional.number_docs}
                </p>
                <p>
                  <span className="font-semibold">Charge Per Document:</span>{" "}
                  <span>&#8358;</span>{" "}{PaymentData?.data?.professional.charge_per_one}
                </p>
                <p>
                  <span className="font-semibold">Charge Total:</span>{" "}
                  <span>&#8358;</span>{" "}{PaymentData?.data?.professional.charge_total}
                </p>
              </div>
            )}
          </div>
          <div className="mt-8">
            <h1 className="text-3xl font-bold mb-6">User Details</h1>
            <div className=" rounded-lg overflow-hidden shadow-md p-6">
              <p className="mb-2 capitalize">
                <span className="font-semibold">Name:</span>{" "}
                {`${PaymentData.firstName} ${PaymentData.lastName}`}
              </p>
              <p className="mb-2 lowercase">
                <span className="font-semibold capitalize">Email:</span>{" "}
                {PaymentData.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Total Amount:</span>{" "}
                <span>&#8358;</span>{" "}{PaymentData.total_amount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetCost;
