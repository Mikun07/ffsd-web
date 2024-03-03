import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PreviewData from "./PreviewData";
import Modal from "../../../../components/modal/Modal";

interface TableColumnProps {
  data: any; // You should replace 'any' with the actual type of your 'data' prop
}

function TableColumn({ data }: TableColumnProps): JSX.Element {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "#46A437";
      case "submitted":
        return "#D4973B";
      case "archived":
        return "#D1D43B";
      case "queried":
        return "#D43B3B";
      default:
        return "";
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleOnClose = () => [setShowModal(false)];


  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="flex hover:bg-gray-100 px-3 rounded-lg h-[72px] items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
            <p className="font-semibold">
              {data?.userInfo?.docOwnerFirstName &&
                data?.userInfo?.docOwnerFirstName[0]}
              {data?.userInfo?.docOwnerLastName &&
                data?.userInfo?.docOwnerLastName[0]}
            </p>
          </div>
          <div className="font-medium gap-[0.5rem]">
            <h5 className="text-[16px] font-bold text-black capitalize">
              {data?.userInfo?.docOwnerFirstName}{" "}
              {data?.userInfo?.docOwnerLastName}
            </h5>
            <div className="flex items-center gap-2">
              <p className="flex justify-end items-center text-[12px] text-gray-400 font-semibold capitalize gap-2">
                {data?.tag}
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
          </div>
        </div>

        <div className="flex flex-col font-medium">
          <p className="flex items-center text-[12px] text-black gap-2">
            {new Date(data?.created_at).toLocaleDateString()}
          </p>
          <div className="flex items-center justify-end gap-1">
            <p className="flex items-center text-[12px] text-black uppercase">
              <span className="text-black">#</span>
              {data?.ref_id?.split("/")[1]}
            </p>
          </div>
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
