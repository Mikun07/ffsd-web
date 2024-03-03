import { useEffect, useState } from "react";
import SearchInput from "./shared/SearchInput";
import { AiOutlinePlus } from "react-icons/ai";
import Loading from "../../../../components/withStatus/loading/Loading";
import Modal from "../../../../components/modal/Modal";
import CreateStaffForm from "./shared/CreateStaffForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../types/redux/root";
import { fetchStaff } from "../../../../redux/features/getStaffSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Table from "./shared/Table";

const OrgManageStaff = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // Fetch staff data from Redux store
  const { data: staff, loading: loadingStaff } = useSelector(
    (state: RootState) => state?.getStaff
  );

  // State variables
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Fetch all staff on component mount
  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  // Handle modal close
  const handleOnClose = () => setShowModal(false);

  // Reverse the staff array
  const staffArray = staff?.data || [];

  const reverseAllStaff = staffArray.slice().reverse();

  // Calculate pagination
  const documentsPerPage = 9;
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;

  // Slice documents for current page
  const currentStaffs = reverseAllStaff.slice(
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
    const numDocumentsOnPage = currentStaffs.length;
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
  const totalNumberOfPages = getTotalPages(staffArray.length, documentsPerPage);

  return (
    <div className="flex flex-col h-full py-2 px-4">
      <div className="flex items-center gap-2 mt-3 text-gray-800 font-semibold capitalize">
        <p className="">Manage Staff</p>
      </div>

      <div className="h-16 w-full mt-3 text-black flex justify-between items-center px-2">
        <SearchInput result={result} setResult={setResult} data={staff} />
        <button
          onClick={() => setShowModal(true)}
          className="bg-slate-200 text-black relative font-semibold rounded-lg h-12 p-4 gap-2 shadow-md flex items-center"
        >
          <AiOutlinePlus size={20} />
          <p className=" capitalize">Create Staff</p>
        </button>

        <Modal
          className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
          onClose={handleOnClose}
          visible={showModal}
          body={<CreateStaffForm />}
        />
      </div>

      <div className="flex w-full h-full overflow-hidden justify-center items-center">
        {loadingStaff ? (
          <Loading className="" />
        ) : currentStaffs.length > 0 ? (
          <Table tableData={currentStaffs} />
        ) : (
          <h1 className="flex items-center justify-center font-medium">
            No Staff Available
          </h1>
        )}
      </div>

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
  );
};

export default OrgManageStaff;
