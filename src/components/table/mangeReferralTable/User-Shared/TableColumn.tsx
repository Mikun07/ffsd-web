import { useState } from "react";
import PreviewData from "./PreviewData";
import Modal from "../../../modal/Modal";

interface TableColumnProps {
  data: any; // You should replace 'any' with the actual type of your 'data' prop
}

function TableColumn({ data }: TableColumnProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const handleOnClose = () => [setShowModal(false), setEditModal(false)];

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="flex hover:bg-gray-100 px-3 rounded-lg h-[60px] items-center justify-between"
      >
        {/* Render row data */}

        <div className="flex items-center gap-2">
          {/* Render profile avatar */}
          <div className="lg:h-[40px] lg:w-[40px] w-[30px] h-[30px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
            <p className="font-semibold uppercase lg:text-base text-xs">
              {data?.docOwnerFirstName && data?.docOwnerFirstName[0]}
              {data?.docOwnerLastName && data?.docOwnerLastName[0]}
            </p>
          </div>
          <div className="font-medium gap-[0.5rem]">
            {/* Render first and last name */}
            <p className="flex justify-start items-center lg:text-[12px] text-[9px] text-black  font-semibold capitalize gap-2">
              {data?.docOwnerFirstName} {data?.docOwnerLastName}
            </p>
            {/* Render email */}
            <div className="flex items-center gap-2">
              <p className="lg:text-[12px] text-[9px] font-medium text-gray-400 lowercase">
                {data?.docOwnerDOB}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col font-medium items-end">
          <p className="text-[14px] font-medium text-black lowercase">
            {new Date(data?.created_at).toLocaleDateString()}
          </p>
          <p className="text-[14px] font-medium text-black uppercase">
            {data?.application_id}
          </p>
        </div>
      </div>

      <Modal
        className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
        onClose={handleOnClose}
        visible={showModal}
        // Pass data to PreviewData component
        body={<PreviewData data={data} />}
      />
    </>
  );
}

export default TableColumn;
