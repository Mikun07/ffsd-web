import React, { useState } from "react";
import AddIcon from "../../../assets/icons/AddIcon";
import ManageUserTable from "../../../components/table/ManageUserTable";

function ManageUserPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="px-3 flex flex-col h-full">
        <div className="mt-3 w-full flex items-center justify-between">
          <div>
            <b className="lg:text-xl capitalize">user history</b>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              className="bg-transparent relative flex gap-2 items-center justify-center p-2"
            >
              <AddIcon />
              <b className=" capitalize">Add new user</b>
            </button>
            {open && (
              <div className="absolute z-20 overflow-y-auto custom__scrollbar rounded-lg bg-white"></div>
            )}
          </div>
        </div>

        <div className="mt-5 pb-[100px] h-full overflow-y-auto custom__scrollbar">
          <ManageUserTable />
        </div>
      </div>
    </>
  );
}

export default ManageUserPage;
