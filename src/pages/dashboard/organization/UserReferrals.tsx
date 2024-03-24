import React, { useEffect, useMemo, useState } from "react";
import { monitorReferrals } from "../../../redux/features/getReferralsSlice";
import { RootState } from "../../../types/redux/root";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Loading from "../../../components/withStatus/loading/Loading";
import Table from "../../../components/table/mangeReferralTable/User-Shared/Table";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import SearchInput from "../../../components/input/SearchInput";

const UserReferrals = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { data: referrals, loading: loadingReferrals } = useSelector(
    (state: RootState) => state?.monitorReferrals
  );

  useEffect(() => {
    dispatch(monitorReferrals());
  }, [dispatch]);

  const referralArray = referrals?.data || [];

  const ReferralInfo = referralArray.map((referral) => referral.doc_owner);

  const reversedReferral = useMemo(
    () => ReferralInfo?.reverse(),
    [ReferralInfo]
  );

  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const documentsPerPage = 7;
  const indexOfFirstDocument =
    ReferralInfo.length - currentPage * documentsPerPage;
  const indexOfLastDocument = indexOfFirstDocument + documentsPerPage;

  const currentDocuments = reversedReferral.slice(
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
    ReferralInfo.length,
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
      <div className="flex flex-col h-full py-2 px-4 overflow-y-auto">
        <div className="flex flex-col mt-4 h-screen overflow-hidden">
          <div className="w-full h-screen overflow-hidden">
            {/* Search and filter section */}
            <div className="h-16 w-full text-black rounded-t-lg flex justify-between items-center px-2">
              <h3 className="font-semibold capitalize leading-5 tracking-wide">
                Referrals
              </h3>
              <div className="flex gap-2">
                <SearchInput
                  clearSearch={() => clearSearch()}
                  handleChange={(e) => handleChange(e)}
                  input={input}
                />
              </div>
            </div>

            <div className="flex w-full h-full justify-center items-center">
              {loadingReferrals ? (
                <Loading className="" />
              ) : filteredData.length > 0 ? (
                <Table tableData={filteredData} />
              ) : currentDocuments.length > 0 ? (
                <Table tableData={currentDocuments} />
              ) : (
                <h1 className="flex items-center justify-center font-medium">
                   No Referral Available
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

export default UserReferrals;