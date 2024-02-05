import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RootState } from "../../../types/redux/root";
import { adminFetchDocument } from "../../../redux/features/Admin/adminGetDocument";
import Loading from "../../../components/withStatus/loading/Loading";
import Table from "./Table";
import SearchInput from "./shared/SearchInput";
import FilterModel from "../../../components/modal/FilterModel";
import { ThunkDispatch } from "@reduxjs/toolkit";

function AdminManageDocumentPage() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const getAllDocument = useSelector(
    (state: RootState) => state?.adminDocument?.data
  );
  const documentLoading = useSelector(
    (state: RootState) => state?.document?.loading
  );
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [result, setResult] = useState([]);

  async function fetchAllDocument() {
    // @ts-ignore
    dispatch(adminFetchDocument({ type: selectedFilter }));
  }

  // Function to update filter
  function updateFilter(newFilter) {
    setSelectedFilter(newFilter);
  }

  useEffect(() => {
    fetchAllDocument();
  }, [selectedFilter]);

  // Array of data to process
  const dataArray = (getAllDocument as Array<any>) || [];

  // Combined array to store all documents
  let allDocuments = [];

  // Loop through each item in dataArray
  dataArray?.forEach((item, index) => {
    // Educational documents for the current item
    const educationalDocuments = item.user.documents.educationalDocuments || [];
    // Financial documents for the current item
    const financialDocuments = item.user.documents.financialDocuments || [];
    // Professional documents for the current item
    const professionalDocuments =
      item.user.documents.professionalDocuments || [];

    // Concatenate all document types for the current item
    const allItemDocuments = [
      ...educationalDocuments.map((doc) => ({
        ...doc,
        userInfo: item.user.info,
        status: doc.status,
        tag: "Educational Document",
      })),
      ...financialDocuments.map((doc) => ({
        ...doc,
        userInfo: item.user.info,
        status: doc.status,
        tag: "Financial Document",
      })),
      ...professionalDocuments.map((doc) => ({
        ...doc,
        userInfo: item.user.info,
        status: doc.status,
        tag: "Professional Document",
      })),
    ];

    // Add the documents for the current item to the combined array
    allDocuments = [...allDocuments, ...allItemDocuments];
  });

  const reversedDocuments = allDocuments?.reverse();

  return (
    <>
      <div className="flex flex-col h-full py-2 px-4  overflow-y-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 md:gap-3 grid-cols-1 gap-4 w-full"></div>
        <div className="flex flex-col mt-4 h-screen overflow-hidden">
          <div className="w-full h-screen overflow-hidden">
            <div className="h-16 w-full text-primary rounded-t-lg flex justify-between items-center px-2">
              <h3 className="font-semibold capitalize leading-5 tracking-wide">
                verification history
              </h3>
              <div className="flex gap-2">
                <SearchInput
                  result={result}
                  setResult={setResult}
                  data={allDocuments}
                />
                <FilterModel setSelectedFilter={updateFilter} />
              </div>
            </div>

            <div className="flex w-full h-full overflow-hidden justify-center items-center">
              {documentLoading ? (
                <Loading className="" />
              ) : (
                <Table tableData={reversedDocuments} />
              )}
            </div>
          </div>
          <div className="h-16 w-full text-primary rounded-b-lg flex justify-end items-center px-2">
            <div className="flex gap-1">
              <div className="h-8 w-8 border-2 border-slate-400 bg-transparent rounded-lg flex items-center justify-center text-primary">
                <BiLeftArrow />
              </div>
              <div className="h-8 w-8 border-2 border-slate-400 bg-transparent rounded-lg flex items-center justify-center text-primary"></div>
              <div className="h-8 w-8 border-2 border-slate-400 bg-transparent rounded-lg flex items-center justify-center text-primary">
                <BiRightArrow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminManageDocumentPage;
