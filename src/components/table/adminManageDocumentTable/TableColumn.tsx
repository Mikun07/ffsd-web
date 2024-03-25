import { useNavigate } from "react-router-dom";

interface TableColumnProps {
  data: any; // You should replace 'any' with the actual type of your 'data' prop
}

function TableColumn({ data }: TableColumnProps): JSX.Element {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "#46A437";
      case "submitted":
        return "#D4973B";
      case "archived":
        return "#D1D43B";
      case "queried":
        return "#D43B3B";
      default:
        return "";
    }
  };

  function viewContent(data): void {
    const {doc_type, id, doc_owner_id} = data; 
    navigate(`/admin/document/document/${doc_type}/${id}/${doc_owner_id}`)
  }
  

  return (
    <>
      <div
      onClick={() => viewContent(data)}
        className="flex hover:bg-gray-100 px-3 rounded-lg h-[60px] items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="lg:h-[40px] lg:w-[40px] w-[30px] h-[30px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
            <p className="font-semibold capitalize lg:text-base text-xs">
              {data?.userInfo?.docOwnerFirstName &&
                data?.userInfo?.docOwnerFirstName[0]}
              {data?.userInfo?.docOwnerLastName &&
                data?.userInfo?.docOwnerLastName[0]}
            </p>
          </div>
          <div className="font-medium gap-[0.5rem]">
            <h5 className="lg:lg:text-[12px] text-[9px] text-[9px] font-bold text-black capitalize">
              {data?.userInfo?.docOwnerFirstName}{" "}
              {data?.userInfo?.docOwnerLastName}
            </h5>
            <div className="flex items-center gap-2">
              <p className="flex justify-end items-center lg:text-[12px] text-[9px] text-gray-400 font-semibold capitalize gap-2">
                {data?.tag}
              </p>
              <span className="w-1 h-1 rounded-full text-[14px] bg-black"></span>
              <p
                className="flex justify-end items-center lg:text-[12px] text-[9px] gap-2 capitalize"
                style={{
                  color: getStatusColor(data?.status),
                  opacity: "0.95",
                }}
              >
                {data?.status}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col font-medium items-end">
          <p className="flex items-center lg:text-[12px] text-[9px] text-black gap-2">
            {new Date(data?.created_at).toLocaleDateString()}
          </p>
          <div className="flex items-center justify-end gap-1">
            <p className="flex items-center lg:text-[12px] text-[9px] text-black uppercase">
              {data?.ref_id}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableColumn;
