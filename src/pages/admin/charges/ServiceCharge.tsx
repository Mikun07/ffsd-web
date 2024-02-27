import { useEffect, useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types/redux/root";
import { fetchServiceCharge } from "../../../redux/features/Admin/serviceChargeSlice";
import Loading from "../../../components/withStatus/loading/Loading";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../../components/modal/Modal";
import CreateServiceChargeform from "./CreateServiceChargeForm";
import { FaEdit } from "react-icons/fa";
import EditServiceChargeForm from "./EditServiceChargeForm";

const ServiceCharge = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data: serviceCharge, loading: loadingServiceCharge } = useSelector(
    (state: RootState) => state?.getServiceCharge
  );

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const handleOnClose = () => [setShowModal(false), setEditModal(false)];

  useEffect(() => {
    dispatch(fetchServiceCharge());
  }, []);

  // Function to render charge table
  const renderChargeTable = (charges) => {
    if (!charges) return null; // Check if charges is null or undefined

    return (
      <table className="lg:ml-4 min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Document Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Document Charge
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {charges.map((charge) => (
            <tr key={charge.id}>
              <td className="px-6 py-4 whitespace-nowrap capitalize">
                {charge.doc_cat}
              </td>
              <td className="px-6 py-4 whitespace-nowrap slashed-zero">
                <div className="flex items-center justify-between">
                  <p>
                    <span>&#36;</span> {charge.doc_charge}
                  </p>
                  <button
                    onClick={() => setEditModal(charge)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    <FaEdit size={25} />
                  </button>

                  <Modal
                    className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
                    onClose={handleOnClose}
                    visible={editModal === charge}
                    body={
                      <EditServiceChargeForm
                        chargeId={charge.id}
                        categoryUser={charge.category_user}
                        category={charge.doc_cat}
                        onClose={handleOnClose}
                      />
                    }
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Separate arrays based on category_user_id
  const individualServiceCharge = serviceCharge
    ? serviceCharge.filter((charge) => charge.category_user === "indv")
    : [];
  const organizationServiceCharge = serviceCharge
    ? serviceCharge.filter((charge) => charge.category_user === "org")
    : [];

  return (
    <>
      {loadingServiceCharge ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col h-full overflow-y-auto">
            <div>
              <h3 className="font-bold capitalize leading-5 tracking-wide mt-5">
                Service Charge
              </h3>
            </div>

            <div className="mt-5 ml-5">
              <button
                onClick={() => setShowModal(true)}
                className="bg-slate-200 text-black relative font-semibold rounded-lg h-12 p-4 gap-2 shadow-md flex items-center"
              >
                <AiOutlinePlus size={20} />
                <p className=" capitalize">Create charge</p>
              </button>

              <Modal
                className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
                onClose={handleOnClose}
                visible={showModal}
                body={<CreateServiceChargeform onClose={handleOnClose} />}
              />
            </div>

            <div className="lg:px-10 mt-4">
              <div className="mx-3 mt-3">
                <h2 className="capitalize text-lg font-semibold mb-4">
                  organization
                </h2>
                {renderChargeTable(organizationServiceCharge)}
              </div>

              <div className="mx-3 mt-3">
                <h2 className="capitalize text-lg font-semibold mt-8 mb-4">
                  Individual
                </h2>
                {renderChargeTable(individualServiceCharge)}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ServiceCharge;
