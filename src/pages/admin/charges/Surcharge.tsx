import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../types/redux/root";
import { fetchSurCharge } from "../../../redux/features/Admin/surChargeSlice";
import Loading from "../../../components/withStatus/loading/Loading";
import CreateSurChargeForm from "./CreateSurChargeForm";
import { FaChevronLeft, FaChevronRight, FaEdit } from "react-icons/fa";
import { fetchInstitution } from "../../../redux/features/institutionSlice";
import EditSurChargeForm from "./EditSurChargeForm";
import { fetchUser } from "../../../redux/features/userSlice";

const Surcharge = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // State variables
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const { data: surCharge, loading: loadingSurCharge } = useSelector(
    (state: RootState) => state?.getSurCharge
  );
  const { data: institutions } = useSelector(
    (state: RootState) => state?.institution
  );

  const { data: user } = useSelector((state: RootState) => state?.user) as any;

  // Close modal handler
  const handleOnClose = () => [setShowModal(false), setEditModal(false)];

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchInstitution());
    // @ts-ignore
    dispatch(fetchSurCharge({ getter_type: "all" }));
  }, [dispatch]);

  // Generate institution options for select dropdown
  const InstitutionOptions =
    institutions?.map((institution) => ({
      label: institution?.name,
      value: institution?.id,
    })) || [];

  const reverseSurCharge = surCharge ? [...surCharge].reverse() : [];

  // Pagination Handlers
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Function to calculate total number of pages
  const getTotalPages = (totalItems, itemsPerPage) => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  // Determine total number of pages
  const totalPages = getTotalPages(reverseSurCharge.length, 13);

  // Render the table of charges
  const renderChargeTable = (charges, currentPage) => {
    if (!charges) return null;

    // Calculate starting and ending index for the current page
    const startIndex = (currentPage - 1) * 13;
    const endIndex = Math.min(startIndex + 13, charges.length);

    const currentPageCharges = charges.slice(startIndex, endIndex);

    return (
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-slate-200">
            <tr>
              <th className="px-4 py-2 text-sm lg:text-base lg:px-6 lg:py-3">
                Institution
              </th>
              <th className="px-4 py-2 text-sm lg:text-base lg:px-6 lg:py-3">
                Institution Charge
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageCharges.map((charge, index) => (
              <tr
                key={charge?.instId}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border px-4 py-2 text-sm lg:text-base lg:border lg:px-6 lg:py-3">
                  {charge?.instName}
                </td>
                <td className="border px-4 py-2 text-sm lg:text-base lg:border lg:px-6 lg:py-3">
                  <div className="flex items-center justify-between">
                    <span>
                      {" "}
                      <span>&#36;</span> {charge?.institution_charge}
                    </span>
                    {(user?.is_system_admin === "1" ||
                      user?.system_admin_type === "1") && (
                      <div className="flex items-center">
                        <button
                          onClick={() => setEditModal(charge)}
                          className="text-blue-600 hover:text-blue-900 ml-2"
                        >
                          <FaEdit size={20} />
                        </button>
                        {/* Edit Modal */}
                        <Modal
                          className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
                          onClose={handleOnClose}
                          visible={editModal === charge}
                          body={
                            <EditSurChargeForm
                              onClose={handleOnClose}
                              instId={charge.instId}
                              instName={charge?.instName}
                              institution_charge={charge?.institution_charge}
                            />
                          }
                        />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // JSX
  return (
    <>
      {loadingSurCharge ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div>
              <h3 className="font-bold capitalize leading-5 tracking-wide mt-5">
                Sur-Charge
              </h3>
            </div>

            {/* Conditionally render Create Charge Button */}
            {(user?.is_system_admin === "1" ||
              user?.system_admin_type === "1") && (
              <div className="mt-5 ml-5">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-slate-200 text-black relative font-semibold rounded-lg h-12 p-4 gap-2 shadow-md flex items-center"
                >
                  <AiOutlinePlus size={20} />
                  <p className="capitalize">Create charge</p>
                </button>

                {/* Create Charge Modal */}
                <Modal
                  className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
                  onClose={handleOnClose}
                  visible={showModal}
                  body={
                    <CreateSurChargeForm
                      onClose={handleOnClose}
                      institutionOptions={InstitutionOptions}
                    />
                  }
                />
              </div>
            )}

            {/* Charge Table */}
            <div className=" mt-4 h-full">
              <div className="">
                {renderChargeTable(reverseSurCharge, currentPage)}
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="mr-2"
              >
                <FaChevronLeft />
              </button>
              <span className="mr-2">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Surcharge;
