import { useState } from "react";
import Modal from "../../../../components/modal/Modal";
import PreviewData from "./PreviewData";

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
        <div className="flex items-center">
          <div className="font-medium gap-[0.5rem]">
            <h5 className="lg:text-[12px] text-[9px] font-bold text-black uppercase">
              {data?.company_name}
            </h5>
            <div className="flex items-center gap-2">
              <p className="flex items-center lg:text-[12px] text-[9px] text-gray-400 font-medium capitalize gap-2">
                {data?.lastName} {data?.firstName}
              </p>
              <span className="w-1 h-1 lg:flex hidden rounded-full text-[14px] bg-black"></span>
              <p className="lg:flex hidden items-center lg:text-[12px] text-[9px] text-gray-400 font-medium lowercase gap-2">
                {data?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col font-medium items-end">
          <p className="flex justify-end items-center lg:text-[12px] text-[9px] text-black font-semibold capitalize gap-2">
            {data?.CountryName}
          </p>
          <div className="flex items-center justify-end gap-2 text-gray-400">
            <p className="flex items-center lg:text-[12px] text-[9px] uppercase">
              {data?.company_ref}
            </p>
            <span className="w-1 h-1 rounded-full bg-black"></span>
            <p className="flex items-center lg:text-[12px] text-[9px] gap-2">
              {new Date(data?.dateOfCompanyUpdate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <Modal
        className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
        onClose={handleOnClose}
        visible={showModal}
        body={<PreviewData data={data} />}
      />
    </>
  );
}

export default TableColumn;