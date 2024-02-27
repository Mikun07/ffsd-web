import { useState } from "react";
import Modal from "../../../../components/modal/Modal";
import PreviewData from "./PreviewData";
import { FaEdit, FaRegFolderOpen } from "react-icons/fa";
import EditAdminForm from "./EditAdminForm";

interface TableColumnProps {
  data: any; // You should replace 'any' with the actual type of your 'data' prop
}

function TableColumn({ data }: TableColumnProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const handleOnClose = () => [setShowModal(false), setEditModal(false)];

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
      <div className="flex hover:bg-gray-100 px-3 rounded-lg h-[72px] items-center justify-between">
        {/* Render row data */}

        <div className="flex items-center gap-2">
          {/* Render profile avatar */}
          <div className="h-[40px] w-[40px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
            <p className="font-semibold uppercase">
              {data?.firstName && data?.firstName[0]}
              {data?.lastName && data?.lastName[0]}
            </p>
          </div>
          <div className="font-medium gap-[0.5rem]">
            {/* Render first and last name */}
            <div className="flex items-center gap-2">
              <p className="flex justify-start items-center text-[14px] text-black  font-semibold capitalize gap-2">
                {data?.firstName} {data?.lastName}
              </p>
              <span className="w-1 h-1 rounded-full text-[14px] bg-black"></span>
              <p
                className="flex justify-end items-center text-[12px] gap-2 capitalize"
                style={{
                  color: getStatusColor(data?.status),
                  opacity: "0.95",
                }}
              >
                {data?.status}
              </p>
            </div>
            {/* Render email */}
            <p className="text-[12px] font-medium text-gray-400 capitalize">
              admin status {data?.system_admin_type}
            </p>
          </div>
        </div>

        <div className="flex font-medium items-end gap-10">
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
              body={<PreviewData data={data} />}
            />
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setEditModal(data)}
              className="text-blue-600 hover:text-blue-900"
            >
              <FaEdit size={35} />
            </button>

            <Modal
              className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
              onClose={handleOnClose}
              visible={editModal === data}
              body={<EditAdminForm onClose={handleOnClose} data={data} />}
            />
          </div>
          
        </div>
      </div>

      {/* Render modal with PreviewData component */}
    </>
  );
}

export default TableColumn;
