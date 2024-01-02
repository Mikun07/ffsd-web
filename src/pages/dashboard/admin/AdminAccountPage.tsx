import React from "react";
import Avatar from "../../../components/avatar/Avatar";
import EditIcon from "../../../assets/icons/EditIcon";
import AdminAccountForm from "../../../components/form/AdminAccountForm";

function AdminAccountPage() {
  return (
    <>
      <div className="px-1 py-3 flex w-full max-h-screen items-center ">
        <div className="flex lg:py-0 py-[50px] lg:gap-y-11 flex-col w-full h-full items-center lg:justify-center overflow-y-auto">
          <div className="relative">
            <Avatar />
            <button className="bg-white absolute z-10 bottom-0 right-0 h-[35px] rounded-full flex items-center justify-center w-[35px] border-2 border-[#d4973b]">
              <EditIcon />
            </button>
          </div>

          <div className="flex w-full justify-center items-center">
            <AdminAccountForm />
          </div>

          <div>
            <button className="flex mt-6 capitalize text-base text-[#40B52D] font-semibold items-center justify-center rounded-xl px-10 py-2 border-2 border-[#40B52D] bg-transparent hover:text-white hover:bg-[#D4973B] hover:bg-opacity-85 hover:border-[#D4973B] hover:border-opacity-85">
              Edit
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminAccountPage;
