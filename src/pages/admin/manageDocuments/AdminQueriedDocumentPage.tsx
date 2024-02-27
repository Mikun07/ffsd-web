import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types/redux/root";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import SearchInput from "./shared/SearchInput";
import Loading from "../../../components/withStatus/loading/Loading";
import Table from "./shared/Table";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { adminFetchDocument } from "../../../redux/features/Admin/adminGetDocumentSlice";

const AdminQueriedDocumentPage = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // Select relevant data from Redux store
  const { data: getAllDocument, loading: documentLoading } = useSelector(
    (state: RootState) => state?.adminDocument
  );

  async function fetchAllDocument() {
    // @ts-ignore
    dispatch(adminFetchDocument());
  }

  useEffect(() => {
    fetchAllDocument();
  }, []);

  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Array of data to process
  const dataArray = (getAllDocument as Array<any>) || [];

  // Extract educational, financial, and professional documents with status "archived" from dataArray
  const allDocuments = dataArray.flatMap(({ documents, doc_owner }) => {
    // If documents exist, map and merge them into allDocuments
    if (documents) {
      return [
        ...documents.educationalDocuments
          .filter((doc) => doc.status === "queried")
          .map((doc) => ({
            ...doc,
            userInfo: doc_owner,
            tag: "Educational Document",
            status: doc.status, // Add status property here
          })),
        ...documents.financialDocuments
          .filter((doc) => doc.status === "queried")
          .map((doc) => ({
            ...doc,
            userInfo: doc_owner,
            tag: "Financial Document",
            status: doc.status, // Add status property here
          })),
        ...documents.professionalDocuments
          .filter((doc) => doc.status === "queried")
          .map((doc) => ({
            ...doc,
            userInfo: doc_owner,
            tag: "Professional Document",
            status: doc.status, // Add status property here
          })),
      ];
    }
    // Return an empty array if documents are undefined or null
    return [];
  });

  const reverseAllDocuments = allDocuments?.reverse();

  // Calculate pagination
  const documentsPerPage = 9;
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;

  // Slice documents for current page
  const currentDocuments = reverseAllDocuments.slice(
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
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex items-center gap-2 mt-3 text-gray-800 font-semibold capitalize">
          <Link to={"/admin/managedocument"}>
            <p className="cursor-pointer">Manage Documents</p>
          </Link>
          <div className="text-primary">
            <AiOutlineRight />
          </div>
          <p className="cursor-pointer">queried Documents</p>
        </div>

        <div className="flex flex-col mt-4 h-screen overflow-hidden">
          <div className="w-full h-screen overflow-hidden">
            <div className="h-16 w-full text-black rounded-t-lg flex justify-between items-center px-2">
              <h3 className="font-semibold capitalize leading-5 tracking-wide">
                queried Documents
              </h3>
              <div className="flex gap-2">
                <SearchInput
                  result={result}
                  setResult={setResult}
                  data={allDocuments}
                />
              </div>
            </div>

            <div className="flex w-full h-full overflow-hidden justify-center items-center">
              {documentLoading ? (
                <Loading className="" />
              ) : (
                <Table tableData={currentDocuments} />
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

export default AdminQueriedDocumentPage;
