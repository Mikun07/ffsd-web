import React from "react";
import TablePartition from "./shared/TablePartition";

function ReceiptsTable({ tableData }) {
  return (
    <>
      <div className="w-full h-full pr-6 overflow-y-scroll custom__scrollbar">
        <TablePartition data={tableData} />
      </div>
    </>
  );
}

export default ReceiptsTable;
