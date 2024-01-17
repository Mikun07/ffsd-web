import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/loginSlice";

function ManageAccountPage() {
  const navigate = useNavigate();
  const dispatch =  useDispatch();

  function signOut() {
    dispatch(logout())  
  }
  return (
    <>
      <div className="mt-3 mx-3 lg:px-2">
        <div>
          <h1 className="font-semibold capitalize py-2">
            Personal information
          </h1>

          <div className="flex lg:flex-row flex-col gap-6 mt-3 w-full">
            <div className="px-4 py-2 flex flex-col gap-2 justify-center items-center border-2 rounded-lg">
              <div className="w-[150px] h-[150px] bg-primary rounded-full ">
                {/* lastname.split(" ")[0] */}
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="flex gap-2 capitalize font-semibold text-[15px]">
                  <p>Lastname</p>
                  <p>Firstname</p>
                </div>

                <p className="text-[12px] font-medium text-gray-700">Email</p>
              </div>
            </div>
            <div className="bg-slate-100 w-full px-4 py-2 rounded-lg"></div>
          </div>

          <div className="flex w-full justify-center mt-5 font-medium">
            <button
              onClick={signOut}
              className="p-3 bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageAccountPage;
