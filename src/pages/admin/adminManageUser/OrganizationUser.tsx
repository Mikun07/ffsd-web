import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types/redux/root";
import { fetchOrganization } from "../../../redux/features/Admin/adminGetOrganizationSlice";
import Loading from "../../../components/withStatus/loading/Loading";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Table from "../../../components/table/adminMangeUserTable/OrgTable/Table";


const OrganizationUser = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data: organization, loading: loadingOrganization } = useSelector(
    (state: RootState) => state?.getOrganization
  );

  // State variables
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchOrganization());
  }, [dispatch]);

  const reverseOrganization = organization ? [...organization]?.reverse() : [];

  // Calculate pagination
  const documentsPerPage = 9;
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;

  // Slice documents for current page
  const currentDocuments = reverseOrganization
    ? reverseOrganization.slice(indexOfFirstDocument, indexOfLastDocument)
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
  const totalNumberOfPages = organization
    ? getTotalPages(organization.length, documentsPerPage)
    : 0;

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
          (doc.firstName &&
            doc.firstName
              .toLowerCase()
              .includes(normalizedSearchTerm.toLowerCase())) ||
          (doc.lastName &&
            doc.lastName
              .toLowerCase()
              .includes(normalizedSearchTerm.toLowerCase())) ||
          (doc.email &&
            doc.email
              .toLowerCase()
              .includes(normalizedSearchTerm.toLowerCase())) ||
          (doc.status &&
            doc.status.toLowerCase().includes(normalizedSearchTerm.toLowerCase()))
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
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex flex-col h-screen overflow-hidden">
          <div className="w-full h-screen overflow-hidden">
            {/* Header */}
            <div className="h-16 w-full text-black rounded-t-lg flex justify-between items-center px-2">
              <h3 className="font-semibold capitalize leading-5 tracking-wide lg:flex hidden">
                manage Organization
              </h3>
              <div className="flex gap-2">
                {/* Search Input */}
                {/* <SearchInput
                  result={result}
                  setResult={setResult}
                  data={organization}
                /> */}
              </div>
            </div>

            <div className="flex w-full h-full overflow-hidden justify-center items-center">
              {loadingOrganization ? (
                <Loading className="" />
              ) : currentDocuments.length > 0 ? (
                <Table tableData={currentDocuments} />
              ) : (
                <h1 className="flex items-center justify-center font-medium">
                  No Admins Available
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

export default OrganizationUser;
