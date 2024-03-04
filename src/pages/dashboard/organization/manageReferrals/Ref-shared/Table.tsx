import React from "react";
import TablePartition from "./TablePartition";

function Table({ tableData }) {
  return (
    <>
      <div className="w-full h-full pt-2 pb-16 px-4">
        <TablePartition data={tableData} />
      </div>
    </>
  );
}

export default Table;