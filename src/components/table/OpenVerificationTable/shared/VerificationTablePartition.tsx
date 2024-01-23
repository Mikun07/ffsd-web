import React from "react";
import VerificationTableColumn from "../shared/VerificationTableColumn";

function VerificationTablePartition({ data }) {
  const reverseData = data ? [...data].reverse() : [];
  return (
    <div className="w-full h-auto">
      <div className="flex flex-col">
        {reverseData.map((prop, index) => (
          <VerificationTableColumn key={index} data={prop} />
        ))}
      </div>
    </div>
  );
}

export default VerificationTablePartition;
