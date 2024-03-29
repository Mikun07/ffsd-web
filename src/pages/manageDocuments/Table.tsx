import React from "react";
import TablePartition from "./shared/TablePartition";

function Table({ tableData }) {
  return (
    <>
      <div className="w-full h-full pt-2 pb-16 px-4 overflow-y-scroll custom__scrollbar">
        <TablePartition data={tableData} />
      </div>
    </>
  );
}

export default Table;