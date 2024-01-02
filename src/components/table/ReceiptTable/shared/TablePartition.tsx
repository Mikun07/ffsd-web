import React from "react";
import TableColumn from "./TableColumn";

function TablePartition({ data }) {
  return (
    <div className="w-full h-auto">
      <div className="flex flex-col">
        {data?.map((prop, index) => (
          <TableColumn key={index} data={prop} />
        ))}
      </div>
    </div>
  );
}

export default TablePartition;
