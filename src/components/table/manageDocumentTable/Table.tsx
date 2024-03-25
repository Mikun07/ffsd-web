import React from "react";
import TablePartition from "./TablePartition";

function Table({ tableData }) {
  return (
    <>
      <div className="w-full h-full px-2 py-2">
        <TablePartition data={tableData} />
      </div>
    </>
  );
}

export default Table;