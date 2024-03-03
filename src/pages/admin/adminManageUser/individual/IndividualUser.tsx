import React, { useEffect, useState } from "react";
import { RootState } from "../../../../types/redux/root";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getAllIndividuals } from "../../../../redux/features/Admin/getAllIndividualsSlice";
import Loading from "../../../../components/withStatus/loading/Loading";
import Table from "./Table";
import SearchInput from "./SearchInput";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const IndividualUser = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data: individual, loading: loadingIndividual } = useSelector(
    (state: RootState) => state?.allIndividual
  );

  // State variables
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllIndividuals());
  }, []);

  const reverseIndividual = individual?.data
    ? [...individual?.data].reverse()
    : [];

  // Calculate pagination
  const documentsPerPage = 8;
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;

  // Slice documents for current page
  const currentDocuments = reverseIndividual
    ? reverseIndividual.slice(indexOfFirstDocument, indexOfLastDocument)
    : [];

  // Function to handle page change
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const numDocumentsOnPage = currentDocuments.length;
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
  const totalNumberOfPages = individual?.data
    ? getTotalPages(individual?.data.length, documentsPerPage)
    : 0;
  return (
    <>
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex flex-col h-screen overflow-hidden">
          <div>
            <h3 className="font-bold capitalize leading-5 tracking-wide mt-5">
              Manage individuals
            </h3>
          </div>

          <div className="w-full h-screen overflow-hidden">
            <div className="h-16 w-full text-black rounded-t-lg flex justify-between items-center px-2">
              <h3 className="font-semibold capitalize leading-5 tracking-wide lg:flex hidden">
                individuals
              </h3>
              <div className="flex gap-2">
                {/* Search Input */}
                <SearchInput
                  result={result}
                  setResult={setResult}
                  data={individual}
                />
              </div>
            </div>

            <div className="flex w-full h-full overflow-hidden justify-center items-center">
              {loadingIndividual ? (
                <Loading className="" />
              ) : currentDocuments.length > 0 ? (
                <Table tableData={currentDocuments} />
              ) : (
                <h1 className="flex items-center justify-center font-medium">
                  No Individuals Available
                </h1>
              )}
            </div>
          </div>

          {/* Pagination */}
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
      </div>
    </>
  );
};

export default IndividualUser;
