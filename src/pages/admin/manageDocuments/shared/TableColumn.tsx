import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TableColumnProps {
  data: any; // You should replace 'any' with the actual type of your 'data' prop
}

function TableColumn({ data }: TableColumnProps): JSX.Element {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "#46A437";
      case "pending":
        return "#D4973B";
      case "archived":
        return "#D1D43B";
      case "querried":
        return "#D43B3B";
      default:
        return "";
    }
  };

  // function viewContent(): void {
  //   navigate("/");
  // }

  return (
    <>
      <div
        // onClick={viewContent}
        className="flex hover:bg-gray-100 px-3 rounded-lg h-[72px] items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
            <p className="font-semibold">
              {data?.userInfo?.docOwnerLastName &&
                data?.userInfo?.docOwnerLastName[0]}
              {data?.userInfo?.docOwnerFirstName &&
                data?.userInfo?.docOwnerFirstName[0]}
            </p>
          </div>
          <div className="font-medium gap-[0.5rem]">
            <h5 className="text-[16px] font-bold text-black capitalize">
              {data?.userInfo?.docOwnerLastName}{" "}
              {data?.userInfo?.docOwnerFirstName}
            </h5>
            <div className="flex items-center gap-1">
              <p className="flex items-center text-[12px] text-gray-400 uppercase">
                <span className="text-black">#</span>
                {data?.ref_id?.split("/")[1]}
              </p>
              <span className="w-1 h-1 rounded-full text-[14px] bg-black"></span>
              <p className="flex items-center text-[12px] text-gray-400 gap-2">
                {new Date(data?.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col font-medium">
          <p className="flex justify-end items-center text-[12px] text-black font-semibold capitalize gap-2">
            {data?.tag}
          </p>
          <div className="flex items-center justify-end gap-1">
            <p
              className="flex justify-end items-center text-[12px] gap-2 capitalize"
              style={{
                color: getStatusColor(data?.status),
                opacity: "0.95",
              }}
            >
              {data?.status}
            </p>
            {/* <span className="w-1 h-1 rounded-full bg-black"></span> */}
            {/* <p className="flex justify-end items-center text-[12px] text-black font-semibold capitalize gap-2">
              {data?.Tag}
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default TableColumn;
