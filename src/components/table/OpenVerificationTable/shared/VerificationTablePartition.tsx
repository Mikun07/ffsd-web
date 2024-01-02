import React from "react";
import VerificationTableColumn from "../shared/VerificationTableColumn";

function VerificationTablePartition({ data }) {
  return (
    <div className="w-full h-auto">
      <div className="flex flex-col">
        {data?.map((prop, index) => (
          <VerificationTableColumn key={index} data={prop} />
        ))}
      </div>
    </div>
  );
}

export default VerificationTablePartition;
