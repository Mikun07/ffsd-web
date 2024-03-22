import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocument } from "../../redux/features/documentSlice";
import ManageDocumentCard from "../../components/card/ManageDocumentCard";
import Loading from "../../components/withStatus/loading/Loading";
import SearchInput from "./shared/SearchInput";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RootState } from "../../types/redux/root";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Table from "./shared/Table";

function ManageDocumentPage() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // Select relevant data from Redux store
  const { data: upload, loading: documentLoading } = useSelector(
    (state: RootState) => state?.document
  );

  // State variables
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch documents when selected filter changes
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchDocument({ type: selectedFilter }));
  }, [dispatch, selectedFilter]);

  // Memoized calculation of total documents
  const totalDocuments = useMemo(() => {
    const dataArray = upload?.data?.data || [];
    let totalEducationalDocumentsLength = 0;
    let totalFinancialDocumentsLength = 0;
    let totalProfessionalDocumentsLength = 0;

    // Calculate total lengths for each document type
    dataArray.forEach((item) => {
      const {
        educationalDocuments,
        financialDocuments,
        professionalDocuments,
      } = item.user.documents;

      totalEducationalDocumentsLength += educationalDocuments.length;
      totalFinancialDocumentsLength += financialDocuments.length;
      totalProfessionalDocumentsLength += professionalDocuments.length;
    });

    // Return object containing total lengths
    return {
      totalAllDocumentsLength:
        totalEducationalDocumentsLength +
        totalFinancialDocumentsLength +
        totalProfessionalDocumentsLength,
      totalEducationalDocumentsLength,
      totalFinancialDocumentsLength,
      totalProfessionalDocumentsLength,
    };
  }, [upload]);

  // Combine all document types for each item
  const allDocuments = useMemo(() => {
    const dataArray = upload?.data?.data || [];
    let combinedDocuments = [];

    dataArray.forEach((item) => {
      const {
        educationalDocuments,
        financialDocuments,
        professionalDocuments,
      } = item.user.documents;

      // Map each document type and add additional properties
      const allItemDocuments = [
        ...educationalDocuments.map((doc) => ({
          ...doc,
          userInfo: item.user.info,
          status: doc.status,
          tag: "Educational",
        })),
        ...financialDocuments.map((doc) => ({
          ...doc,
          userInfo: item.user.info,
          status: doc.status,
          tag: "Financial",
        })),
        ...professionalDocuments.map((doc) => ({
          ...doc,
          userInfo: item.user.info,
          status: doc.status,
          tag: "Professional",
        })),
      ];

      // Concatenate documents for this item to the combined array
      combinedDocuments = [...combinedDocuments, ...allItemDocuments];
    });

    return combinedDocuments;
  }, [upload]);

  // Reverse the order of documents
  const reversedDocuments = useMemo(
    () => allDocuments?.reverse(),
    [allDocuments]
  );

  // Calculate pagination
  const documentsPerPage = 7;
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;

  // Slice documents for current page
  const currentDocuments = reversedDocuments.slice(
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
      <div className="flex flex-col h-full pt-2 overflow-y-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 md:gap-3 grid-cols-1 gap-4 w-full">
          {/* Display total documents card */}
          <ManageDocumentCard
            header="Total Documents uploaded"
            headerNumber={totalDocuments.totalAllDocumentsLength}
            titles={[
              {
                title: "Total Financial Document",
                number: totalDocuments.totalFinancialDocumentsLength,
              },
              {
                title: "Total Educational Document",
                number: totalDocuments.totalEducationalDocumentsLength,
              },
              {
                title: "Total Professional Document",
                number: totalDocuments.totalProfessionalDocumentsLength,
              },
            ]}
          />
        </div>
        <div className="flex flex-col mt-4 h-screen overflow-hidden">
          <div className="w-full h-screen overflow-y-auto custom__scrollbar">
            {/* Search and filter section */}
            <div className="h-16 w-full bg-white z-20 text-black rounded-t-lg flex justify-between items-center sticky top-0">
              <div className="flex gap-2">
                {/* Search input */}
                <SearchInput
                  result={result}
                  setResult={setResult}
                  data={allDocuments}
                />
              </div>
            </div>

            {/* Table displaying document data */}
            <div className="flex w-full h-full justify-center items-center">
              {documentLoading ? (
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
}

export default ManageDocumentPage;
