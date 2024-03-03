import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/modal/Modal";
import SearchInput from "./SearchInput";
import { RootState } from "../../../../types/redux/root";
import { getAllAdmins } from "../../../../redux/features/Admin/getAllAdminSlice";
import Loading from "../../../../components/withStatus/loading/Loading";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Table from "./Table";
import CreateAdminForm from "./CreateAdminForm";

const AdminUser = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data: admin, loading: loadingAdmin } = useSelector(
    (state: RootState) => state?.allAdmin
  );

  // State variables
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const handleOnClose = () => setShowModal(false);

  async function fetchAdmins() {
    dispatch(getAllAdmins());
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  const reverseAdmin = admin ? [...admin].reverse() : [];

  // Calculate pagination
  const documentsPerPage = 8;
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;

  // Slice documents for current page
  const currentDocuments = reverseAdmin
    ? reverseAdmin.slice(indexOfFirstDocument, indexOfLastDocument)
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
  const totalNumberOfPages = admin
    ? getTotalPages(admin.length, documentsPerPage)
    : 0;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex flex-col h-screen overflow-hidden">
        <div>
          <h3 className="font-bold capitalize leading-5 tracking-wide mt-5">
            Manage Admins
          </h3>
        </div>

        <div className="mt-5 ml-5">
          <button
            onClick={() => setShowModal(true)}
            className="bg-slate-200 text-black relative font-semibold rounded-lg h-12 p-4 gap-2 shadow-md flex items-center"
          >
            <AiOutlinePlus size={20} />
            <p className=" capitalize">Create Admin</p>
          </button>

          <Modal
            className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
            onClose={handleOnClose}
            visible={showModal}
            body={<CreateAdminForm onClose={handleOnClose} />}
          />
        </div>

        <div className="w-full h-screen overflow-hidden lg:mt-0 mt-4">
          <div className="h-16 w-full text-black rounded-t-lg flex justify-between items-center px-2">
            <h3 className="font-semibold capitalize leading-5 tracking-wide lg:flex hidden">
              Admin
            </h3>
            <div className="flex gap-2">
              {/* Search Input */}
              <SearchInput result={result} setResult={setResult} data={admin} />
            </div>
          </div>

          <div className="flex w-full h-full overflow-hidden justify-center items-center">
            {loadingAdmin ? (
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
  );
};

export default AdminUser;
