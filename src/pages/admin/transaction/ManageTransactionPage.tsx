import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Table from "./shared/Table";
import SearchInput from "./shared/SearchInput";
import { adminFetchTransaction } from "../../../redux/features/Admin/adminGetTransactionSlice";
import { RootState } from "../../../types/redux/root";
import Loading from "../../../components/withStatus/loading/Loading";

const ManageTransactionPage = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // Fetch staff data from Redux store
  const { data: transactions, loading: loadingTransactions } = useSelector(
    (state: RootState) => state?.adminGetTransaction
  );

  useEffect(() => {
    dispatch(adminFetchTransaction());
  }, [dispatch]);

  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const TransactionData = transactions?.data || [];
  const reverseTransaction = TransactionData?.slice()?.reverse();

  // Calculate pagination
  const documentsPerPage = 9;
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;

  // Slice documents for current page
  const currentTransactions = reverseTransaction.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  // Function to handle page change
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const numDocumentsOnPage = currentTransactions.length;
    if (numDocumentsOnPage === documentsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to calculate total number of pages
  function getTotalPages(
    totalDocuments: number,
    documentsPerPage: number
  ): number {
    return Math.ceil(totalDocuments / documentsPerPage);
  }

  // Calculate total number of pages
  const totalNumberOfPages = getTotalPages(
    TransactionData.length,
    documentsPerPage
  );

  return (
    <div className="flex flex-col h-full py-2 px-4">
      <div className="flex items-center gap-2 mt-3 text-gray-800 font-semibold capitalize">
        <p className="">Manage Transaction</p>
      </div>

      <div className="h-16 w-full mt-3 text-black flex justify-between items-center px-2">
        <SearchInput result={result} setResult={setResult} data={transactions} />
      </div>

      <div className="flex w-full h-full overflow-hidden justify-center items-center">
        {loadingTransactions ? (
          <Loading className="" />
        ) : (
          <Table tableData={currentTransactions} />
        )}
      </div>

      <div className="h-16 w-full text-primary rounded-b-lg flex justify-between items-center px-2">
        <div className="flex gap-2 items-center capitalize font-bold text-black">
          <p className="flex items-center capitalize font-bold">page</p>
          <p className="text-primary">{currentPage}</p>/{" "}
          <span>{totalNumberOfPages}</span>
        </div>
        <div className="flex gap-1">
          <div
            className="h-8 w-8 border-2 border-slate-400 bg-transparent rounded-lg flex items-center justify-center text-primary font-bold"
            onClick={handlePrevPage}
          >
            <BiLeftArrow />
          </div>
          <div className="h-8 w-8 border-2 border-slate-400 bg-transparent rounded-lg flex items-center justify-center text-primary font-bold">
            {currentPage}
          </div>
          <div
            className="h-8 w-8 border-2 border-slate-400 bg-transparent rounded-lg flex items-center justify-center text-primary font-bold"
            onClick={handleNextPage}
          >
            <BiRightArrow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTransactionPage;
