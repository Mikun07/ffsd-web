import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Table from "../../components/table/adminMangeTransactionTable/Table";
import { adminFetchTransaction } from "../../redux/features/Admin/adminGetTransactionSlice";
import { RootState } from "../../types/redux/root";
import Loading from "../../components/withStatus/loading/Loading";
import SearchInput from "../../components/input/SearchInput";

const ManageTransactionPage = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // Fetch staff data from Redux store
  const { data: transactions, loading: loadingTransactions } = useSelector(
    (state: RootState) => state?.adminGetTransaction
  );

  useEffect(() => {
    dispatch(adminFetchTransaction());
  }, [dispatch]);

  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
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

  const handleChange = (e: any) => {
    const searchTerm = e.target.value;
    const normalizedSearchTerm =
      typeof searchTerm === "string" ? searchTerm : "";

    setInput(normalizedSearchTerm);
    if (!currentTransactions) {
      setFilteredData([]);
      return;
    }

    const filtered = currentTransactions.filter((doc) => {
      return (
        doc.ref_id.toLowerCase().includes(normalizedSearchTerm.toLowerCase()) ||
        (doc.docOwnerFirstName &&
          doc.docOwnerFirstName
            .toLowerCase()
            .includes(normalizedSearchTerm.toLowerCase())) ||
        (doc.docOwnerLastName &&
          doc.docOwnerLastName
            .toLowerCase()
            .includes(normalizedSearchTerm.toLowerCase()))
      );
    });
    setFilteredData(filtered);
    setInput(searchTerm);
  };

  const clearSearch = () => {
    setInput("");
    setFilteredData([]);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-2 mt-3 text-gray-800 font-semibold capitalize">
        <p className="">Manage Transaction</p>
      </div>
      <div className="w-full h-screen overflow-y-auto custom__scrollbar">
        <div className="h-16 w-full mt-3 text-black flex justify-between items-center px-2 sticky top-0 z-20 bg-white">
          <SearchInput
            clearSearch={() => clearSearch()}
            handleChange={(e) => handleChange(e)}
            input={input}
          />
        </div>

        <div className="flex w-full h-full justify-center items-center">
          {loadingTransactions ? (
            <Loading className="" />
          ) : filteredData.length > 0 ? (
            <Table tableData={filteredData} />
          ) : currentTransactions.length > 0 ? (
            <Table tableData={currentTransactions} />
          ) : (
            <h1 className="flex items-center justify-center font-medium">
              No Transaction Available
            </h1>
          )}
        </div>
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
