import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocument } from "../../redux/features/documentSlice";
import Table from "./Table";
import ManageDocumentCard from "../../components/card/ManageDocumentCard";
import Loading from "../../components/withStatus/loading/Loading";
import SearchInput from "../../components/search/SearchInput";
import FilterModel from "../../components/modal/FilterModel";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

function ManageDocumentPage() {
  const dispatch = useDispatch();
  const upload = useSelector((state) => state?.document?.data);
  const documentLoading = useSelector((state) => state?.document?.loading);
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Function to fetch documents
  async function getDocuments() {
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
  const dataArray = upload?.data?.data || [];
// console.log(dataArray)

// Total length of all documents combined
let totalAllDocumentsLength = 0;
// Total length of financial documents
let totalFinancialDocumentsLength = 0;
// Total length of educational documents
let totalEducationalDocumentsLength = 0;
// Total length of professional documents
let totalProfessionalDocumentsLength = 0;

// Loop through each item in dataArray
dataArray.forEach((item, index) => {
  // Financial documents for the current item
  const financialDocuments =
    item.user.documents.financialDocuments?.map((doc) => doc) || [];
  // Educational documents for the current item
  const educationalDocuments =
    item.user.documents.educationalDocuments?.map((doc) => doc) || [];
  // Professional documents for the current item
  const professionalDocuments =
    item.user.documents.professionalDocuments?.map((doc) => doc) || [];

  // Length of financial documents
  const financialDocumentsLength = financialDocuments.length;
  // Length of educational documents
  const educationalDocumentsLength = educationalDocuments.length;
  // Length of professional documents
  const professionalDocumentsLength = professionalDocuments.length;

  // Total length of all documents for the current item
  const totalDocumentsLength =
    financialDocumentsLength +
    educationalDocumentsLength +
    professionalDocumentsLength;

  // Accumulate total lengths
  totalAllDocumentsLength += totalDocumentsLength;
  totalEducationalDocumentsLength += educationalDocumentsLength;
  totalFinancialDocumentsLength += financialDocumentsLength;
  totalProfessionalDocumentsLength += professionalDocumentsLength;
});


  return (
    <>
      <div className="flex flex-col h-full py-2 px-4  overflow-y-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 md:gap-3 grid-cols-1 gap-4 w-full">
          <ManageDocumentCard
            header="Total Documents uploaded"
            headerNumber={totalAllDocumentsLength}
            titleOne="Total Professional Document"
            titleTwo="Total Financial Document"
            titleThree="Total Educational Document"
            // titleFour="Total Documents uploaded"
            titleOneNumber={totalProfessionalDocumentsLength}
            titleTwoNumber={totalFinancialDocumentsLength}
            titleThreeNumber={totalEducationalDocumentsLength}
            // titleFourNumber={totalAllDocumentsLength}
            // titles={[
            //   { title: "Total Professional Document", number: {totalProfessionalDocumentsLength} },
            //   { title: "Total Financial Document", number: {totalFinancialDocumentsLength} },
            //   { title: "Total Educational Document", number: {totalEducationalDocumentsLength} },
            // ]}
          />
        </div>
        <div className="flex flex-col mt-4 h-screen overflow-hidden">
          <div className="w-full h-screen overflow-hidden">
            <div className="h-16 w-full bg-slate-200 text-primary rounded-t-lg flex justify-between items-center px-2">
              <h3 className="font-bold">Verification History</h3>
              <div className="flex gap-2">
                <SearchInput />
                <FilterModel setSelectedFilter={updateFilter}/>
              </div>
            </div>

            <div className="flex w-full h-full overflow-hidden justify-center border-l-2 border-r-2 border-slate-200 items-center">
              {documentLoading ? (
                <Loading className="" />
              ) : (
                <Table tableData={upload?.data?.data} />
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
