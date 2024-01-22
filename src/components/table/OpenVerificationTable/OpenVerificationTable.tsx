import React from "react";
import VerificationTablePartition from "./shared/VerificationTablePartition";

function OpenVerificationTable({ tableData }) {
  return (
    <>
      <div className="w-full px-1 py-1">
        <VerificationTablePartition data={tableData} />
      </div>
    </>
  );
}

export default OpenVerificationTable;
