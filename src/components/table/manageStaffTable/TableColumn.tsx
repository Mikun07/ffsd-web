import { useState } from "react";
import { FaEdit, FaRegFolderOpen, FaTrash } from "react-icons/fa";
import EditStaffForm from "./EditStaffForm";
import PreviewData from "./PreviewData";
import DeleteStaffForm from "./DeleteStaffForm";
import Modal from "../../modal/Modal";
import DeleteModal from "../../modal/DeleteModal";

interface TableColumnProps {
  data: any; // You should replace 'any' with the actual type of your 'data' prop
}

function TableColumn({ data }: TableColumnProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleOnClose = () => [
    setShowModal(false),
    setEditModal(false),
    setDeleteModal(false),
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#46A437";
      case "inactive":
        return "#D43B3B";
      default:
        return "";
    }
  };
  return (
    <>
      <div className="flex hover:bg-gray-100 px-3 rounded-lg h-[60px] items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="lg:h-[40px] lg:w-[40px] h-[25px] w-[25px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
            <p className="font-semibold uppercase lg:text-base text-xs">
              {data?.firstName && data?.firstName[0]}
              {data?.lastName && data?.lastName[0]}
            </p>
          </div>
          <div className="font-medium gap-[0.5rem]">
            <h5 className="text-[16px] font-bold text-black capitalize">
              {data?.firstName} {data?.lastName}
            </h5>
            <div className="flex items-center gap-2">
              <p className="flex justify-end items-center lg:text-[12px] text-[9px] text-gray-400 font-semibold capitalize gap-2">
                {new Date(data?.created_at).toLocaleDateString()}
              </p>
              <span className="w-1 h-1 rounded-full text-[14px] bg-black"></span>
              <p
                className="flex justify-end items-center  lg:text-[12px] text-[9px] gap-2 capitalize"
                style={{
                  color: getStatusColor(data?.status),
                  opacity: "0.95",
                }}
              >
                {data?.status}
              </p>
            </div>
          </div>
        </div>

        <div className="flex font-medium items-end justify-end gap-5">
          <div className="flex items-center">
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-600 hover:text-blue-900"
            >
              <FaRegFolderOpen size={35} />
            </button>

            <Modal
              className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
              onClose={handleOnClose}
              visible={showModal}
              // Pass data to PreviewData component
              body={<PreviewData onClose={handleOnClose} data={data} />}
            />
          </div>

          <div className="flex items-center">
            {data?.created_by_user_id === null ||
              ("N/A" && (
                <button
                  onClick={() => setEditModal(data)} // Pass the data to the edit click handler
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  <FaEdit size={30} />
                </button>
              ))}
            <Modal
              className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
              onClose={handleOnClose}
              visible={editModal === data}
              body={<EditStaffForm onClose={handleOnClose} data={data} />} // Pass selected data to EditStaffForm
            />
          </div>

          <div className="flex items-center">
            {data?.created_by_user_id === null ||
              ("N/A" && (
                <button
                  onClick={() => setDeleteModal(data)} // Pass the data to the edit click handler
                  className="text-red-600 hover:text-red-900 mr-2"
                >
                  <FaTrash size={30} />
                </button>
              ))}

            <DeleteModal
              className="bg-white overflow-hidden rounded-lg p-3"
              visible={deleteModal === data}
              body={<DeleteStaffForm onClose={handleOnClose} data={data} />} // Pass selected data to EditStaffForm
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TableColumn;
