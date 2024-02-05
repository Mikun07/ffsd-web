import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocument } from "../../redux/features/documentSlice";
import Table from "./Table";
import ManageDocumentCard from "../../components/card/ManageDocumentCard";
import Loading from "../../components/withStatus/loading/Loading";
import SearchInput from "./shared/SearchInput";
import FilterModel from "../../components/modal/FilterModel";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RootState } from "../../types/redux/root";
import { ThunkDispatch } from "@reduxjs/toolkit";

function ManageDocumentPage() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const upload = useSelector(
    (state: RootState) => state?.document?.data
  ) as any;
  const documentLoading = useSelector(
    (state: RootState) => state?.document?.loading
  );
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [result, setResult] = useState([]);

  // Function to fetch documents
  async function getDocuments() {
    // @ts-ignore
    dispatch(fetchDocument({ type: selectedFilter }));
  }

  // Function to update filter
  function updateFilter(newFilter) {
    setSelectedFilter(newFilter);
  }

  useEffect(() => {
    getDocuments();
  }, [selectedFilter]);

  // Array of data to process
  const dataArray = (upload?.data?.data as Array<any>) || [];

  // Combined array to store all documents
  let allDocuments = [];
  let totalEducationalDocumentsLength = 0;
  let totalFinancialDocumentsLength = 0;
  let totalProfessionalDocumentsLength = 0;
  let totalAllDocumentsLength = 0; // Total length of all documents combined

  // Loop through each item in dataArray
  dataArray.forEach((item, index) => {
    // Educational documents for the current item
    const educationalDocuments = item.user.documents.educationalDocuments || [];
    // Financial documents for the current item
    const financialDocuments = item.user.documents.financialDocuments || [];
    // Professional documents for the current item
    const professionalDocuments =
      item.user.documents.professionalDocuments || [];

    // Update total lengths
    totalEducationalDocumentsLength += educationalDocuments.length;
    totalFinancialDocumentsLength += financialDocuments.length;
    totalProfessionalDocumentsLength += professionalDocuments.length;

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

  // Calculate total length of all documents combined
  totalAllDocumentsLength =
    totalEducationalDocumentsLength +
    totalFinancialDocumentsLength +
    totalProfessionalDocumentsLength;

  const reversedDocuments = allDocuments?.reverse();

  return (
    <>
      <div className="flex flex-col h-full py-2 px-4  overflow-y-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 md:gap-3 grid-cols-1 gap-4 w-full">
          <ManageDocumentCard
            header="Total Documents uploaded"
            headerNumber={totalAllDocumentsLength}
            titles={[
              {
                title: "Total Financial Document",
                number: totalFinancialDocumentsLength,
              },
              {
                title: "Total Educational Document",
                number: totalEducationalDocumentsLength,
              },
              {
                title: "Total Professional Document",
                number: totalProfessionalDocumentsLength,
              },
            ]}
          />
        </div>
        <div className="flex flex-col mt-4 h-screen overflow-hidden">
          <div className="w-full h-screen overflow-hidden">
            <div className="h-16 w-full bg-slate-200 text-primary rounded-t-lg flex justify-between items-center px-2">
              <div>
                <h3 className="font-bold">Verification History</h3>
              </div>
              <div className="flex gap-2">
                <SearchInput
                  result={result}
                  setResult={setResult}
                  data={allDocuments}
                />
                {/* <FilterModel setSelectedFilter={updateFilter} /> */}
              </div>
            </div>

            <div className="flex w-full h-full overflow-hidden justify-center border-l-2 border-r-2 border-slate-200 items-center">
              {documentLoading ? (
                <Loading className="" />
              ) : (
                <Table tableData={reversedDocuments} />
              )}
            </div>
          </div>
          <div className="h-24 w-full bg-slate-200 text-primary rounded-b-lg flex justify-end items-center px-2">
            <div className="flex gap-1">
              <div className="h-8 w-8 border-2 border-primary bg-transparent rounded-lg flex items-center justify-center text-black">
                <BiLeftArrow />
              </div>
              <div className="h-8 w-8 border-2 border-primary bg-transparent rounded-lg flex items-center justify-center text-black"></div>
              <div className="h-8 w-8 border-2 border-primary bg-transparent rounded-lg flex items-center justify-center text-black">
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
