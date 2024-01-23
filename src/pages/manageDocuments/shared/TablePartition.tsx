import React from "react";
import TableColumn from "./tableColumn"

function TablePartition({ data }) {
  const reverseData = data ? [...data].reverse() : [];
  return (
    <div className="w-full h-auto">
      <div className="flex flex-col">
        {reverseData.map((prop, index) => (
          <TableColumn key={index} data={prop} />
        ))}
      </div>
    </div>
  );
}

export default TablePartition;
