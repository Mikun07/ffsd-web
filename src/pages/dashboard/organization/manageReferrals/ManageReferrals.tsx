import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../types/redux/root";
import { monitorReferrals } from "../../../../redux/features/getReferralsSlice";
import Loading from "../../../../components/withStatus/loading/Loading";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Table from "./Ref-shared/Table";

const ManageReferrals = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { data: referrals, loading: loadingReferrals } = useSelector(
    (state: RootState) => state?.monitorReferrals
  );

  useEffect(() => {
    dispatch(monitorReferrals());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);

  const allDocuments = useMemo(() => {
    const referralArray = referrals?.data || [];
    let combinedDocuments = [];

    referralArray.forEach((item) => {
      const docOwner = item.doc_owner;

      const educationalDocuments = item.educational_documents || [];
      const financialDocuments = item.financial_documents || [];
      const professionalDocuments = item.professional_documents || [];

      // Map each document type and add additional properties
      const allItemDocuments = [
        ...educationalDocuments.map((doc) => ({
          ...doc,
          ReferralInfo: docOwner,
          tag: "Educational Document",
        })),
        ...financialDocuments.map((doc) => ({
          ...doc,
          ReferralInfo: docOwner,
          tag: "Financial Document",
        })),
        ...professionalDocuments.map((doc) => ({
          ...doc,
          ReferralInfo: docOwner,
          tag: "Professional Document",
        })),
      ];

      combinedDocuments = [...combinedDocuments, ...allItemDocuments];
    });

    return combinedDocuments;
  }, [referrals]);

  const reversedDocuments = useMemo(
    () => allDocuments?.reverse(),
    [allDocuments]
  );

  const documentsPerPage = 7;
  const indexOfFirstDocument =
    allDocuments.length - currentPage * documentsPerPage;
  const indexOfLastDocument = indexOfFirstDocument + documentsPerPage;

  const currentDocuments = reversedDocuments.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

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
  const totalNumberOfPages = getTotalPages(
    allDocuments.length,
    documentsPerPage
  );  

  return (
    <>
      <div className="flex flex-col h-full py-2 px-4 overflow-y-auto">
        <div className="flex flex-col mt-4 h-screen overflow-hidden">
          <div className="w-full h-screen overflow-hidden">
            {/* Search and filter section */}
            <div className="h-16 w-full text-black rounded-t-lg flex justify-between items-center px-2">
              <h3 className="font-semibold capitalize leading-5 tracking-wide">
                referral Documents
              </h3>
              <div className="flex gap-2">
                {/* Search input */}
                {/* <SearchInput
                  result={result}
                  setResult={setResult}
                  data={allDocuments}
                /> */}
              </div>
            </div>

            {/* Table displaying document data */}
            <div className="flex w-full h-full overflow-hidden justify-center items-center">
              {loadingReferrals ? (
                <Loading className="" />
              ) : currentDocuments.length > 0 ? (
                <Table tableData={currentDocuments} />
              ) : (
                <h1 className="flex items-center justify-center font-medium">
                  No Documents Available
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
              {/* <div className="h-8 w-8 border-2 border-slate-400 bg-transparent rounded-lg flex items-center justify-center text-primary font-bold"></div> */}
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

export default ManageReferrals;
