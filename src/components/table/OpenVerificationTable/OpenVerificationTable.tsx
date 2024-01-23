import React from "react";
import VerificationTablePartition from "./shared/VerificationTablePartition";

function OpenVerificationTable({ tableData }) {
  return (
    <>
      <div className="w-full h-full pt-2 pb-16 pr-6 overflow-y-scroll custom__scrollbar">
        <VerificationTablePartition data={tableData} />
      </div>
    </>
  );
}

export default OpenVerificationTable;