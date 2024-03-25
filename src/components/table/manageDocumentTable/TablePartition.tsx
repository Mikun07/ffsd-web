import TableColumn from "./TableColumn";

function TablePartition({ data }) {
  return (
    <div className="w-full h-auto">
      <div className="flex flex-col gap-2">
        {data?.map((document, index) => (
          <TableColumn key={index} data={document} />
        ))}
      </div>
    </div>
  );
}

export default TablePartition;
