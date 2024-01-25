import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TableColumnProps {
  data: any; // You should replace 'any' with the actual type of your 'data' prop
}

function TableColumn({ data, info }: TableColumnProps): JSX.Element {
  const navigate = useNavigate();

  function formatCreatedAtDate(createdAt: string): string {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const formattedDate = new Date(createdAt).toLocaleDateString(
      "en-GB",
      options
    );
    const [day, month, year] = formattedDate.split(" ");
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    const formattedWithHyphen = `${day}-${capitalizedMonth}-${year}`;

    return formattedWithHyphen;
  }


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
        {JSON.stringify(info)}
        <div className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
            <p className="font-semibold">
              {/* {data?.user?.info?.docOwnerLastName &&
                data?.user?.info?.docOwnerLastName[0]}
              {data?.user?.info?.docOwnerFirstName &&
                data?.user?.info?.docOwnerFirstName[0]} */}
            </p>
          </div>
          <div className="font-medium">
            <h5 className="text-[16px] font-bold text-black capitalize">
              {/* {data?.user?.info?.docOwnerLastName}{" "}
              {data?.user?.info?.docOwnerFirstName} */}
            </h5>
            <div className="flex items-center gap-1">
              <p className="flex items-center text-[12px] text-gray-400 uppercase">
                <span className="text-black">#</span>{data?.ref_id?.split("/")[1]}
              </p>
              <span className="w-1 h-1 rounded-full text-[14px] bg-black"></span>
              <p className="flex items-center text-[12px] text-gray-400 gap-2">
                {formatCreatedAtDate(data?.created_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col font-medium">
          <div className="flex items-center gap-1">
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
            {/* {currency} {amount} */}
            <p className="flex justify-end items-center text-[12px] text-black font-semibold capitalize gap-2">
              {/* {totalDocumentsLength} uploaded documents */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableColumn;
