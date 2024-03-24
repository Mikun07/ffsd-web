import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RootState } from "../../../types/redux/root";
import { adminFetchDocument } from "../../../redux/features/Admin/adminGetDocumentSlice";
import Loading from "../../../components/withStatus/loading/Loading";
import Table from "../../../components/table/adminManageDocumentTable/Table";
import { ThunkDispatch } from "@reduxjs/toolkit";
import SearchInput from "../../../components/input/SearchInput";

function AdminManageDocumentPage() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // Select relevant data from Redux store
  const { data: getAllDocument, loading: documentLoading } = useSelector(
    (state: RootState) => state?.adminDocument
  );

  // State variables
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch documents when selectedFilter changes
  useEffect(() => {
    dispatch(adminFetchDocument());
  }, []);

  // Process data
  const dataArray = (getAllDocument as Array<any>) || [];
  let allDocuments = dataArray.flatMap(({ documents, doc_owner }) => {
    if (documents) {
      return [
        ...documents.educationalDocuments.map((doc) => ({
          ...doc,
          userInfo: doc_owner,
          tag: "Educational",
        })),
        ...documents.financialDocuments.map((doc) => ({
          ...doc,
          userInfo: doc_owner,
          tag: "Financial",
        })),
        ...documents.professionalDocuments.map((doc) => ({
          ...doc,
          userInfo: doc_owner,
          tag: "Professional",
        })),
      ];
    }
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

  const handleChange = (e: any) => {
    const searchTerm = e.target.value;
    const normalizedSearchTerm =
      typeof searchTerm === "string" ? searchTerm : "";

    setInput(normalizedSearchTerm);
    if (!currentDocuments) {
      setFilteredData([]);
      return;
    }

    const filtered = currentDocuments.filter((doc) => {
      return (
        doc.application_id
          .toLowerCase()
          .includes(normalizedSearchTerm.toLowerCase()) ||
        doc.ref_id.toLowerCase().includes(normalizedSearchTerm.toLowerCase()) ||
        doc.status.toLowerCase().includes(normalizedSearchTerm.toLowerCase()) ||
        (doc.userInfo &&
          (doc.userInfo.docOwnerFirstName
            .toLowerCase()
            .includes(normalizedSearchTerm.toLowerCase()) ||
            doc.userInfo.docOwnerMiddleName
              .toLowerCase()
              .includes(normalizedSearchTerm.toLowerCase()) ||
            doc.userInfo.docOwnerLastName
              .toLowerCase()
              .includes(normalizedSearchTerm.toLowerCase()))) ||
        doc.tag.toLowerCase().includes(normalizedSearchTerm.toLowerCase())
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
    <>
      <div className="flex flex-col h-full">
        <div className="w-full h-screen overflow-y-auto custom__scrollbar">
          <div className="h-16 w-full bg-white z-20 text-black rounded-t-lg flex justify-between items-center sticky top-0">
            <div className="flex gap-2">
              <SearchInput
                clearSearch={() => clearSearch()}
                handleChange={(e) => handleChange(e)}
                input={input}
              />
            </div>
          </div>

          <div className="flex w-full h-full justify-center items-center">
            {documentLoading ? (
              <Loading className="" />
            ) : filteredData.length > 0 ? (
              <Table tableData={filteredData} />
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
    </>
  );
}

export default AdminManageDocumentPage;
