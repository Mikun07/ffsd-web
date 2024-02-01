import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/loginSlice";
import { fetchUser } from "../redux/features/userSlice";
import Loading from "../components/withStatus/loading/Loading";
import AccountCard from "../components/card/AccountCard";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { RootState } from "../types/redux/root";
import { ThunkDispatch } from "@reduxjs/toolkit";

function ManageAccountPage() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const user = useSelector((state : RootState) => state?.user?.data) as any;
  const userLoading = useSelector((state: RootState) => state?.user?.loading);

  async function getUser() {
    dispatch(fetchUser());
  }
  useEffect(() => {
    getUser();
  }, []);

  function signOut() {
    dispatch(logout());
  }
  return (
    <>
      <div className="mt-3 mx-3 lg:px-2">
        <div>
          {userLoading ? (
            <Loading />
          ) : (
            <>
              <div className="flex lg:flex-row flex-col gap-6 mt-3 w-full">

                <div className="px-4 py-2 flex flex-col gap-2 justify-center items-center rounded-lg lg:w-1/3 w-full">
                  <div className="h-[100px] w-[100px] text-xl rounded-full bg-[#40B52D] flex items-center justify-center text-white">
                    <p className="font-semibold text-[35px]">
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="flex gap-2 capitalize font-semibold text-[15px] ">
                      <p>
                        {user?.lastName} {user?.firstName}
                      </p>
                    </div>

                    <p className="text-[12px] font-medium text-gray-700">
                      {user?.email}
                    </p>
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

                <div className="h-full flex flex-col justify-between w-full">

                  <h1 className="font-semibold capitalize py-2">
                    Personal information
                  </h1>

                  <div className="bg-slate-100 w-full px-4 py-2 rounded-lg">
                    <div className="px-2 py-6 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                      <AccountCard
                        title="Name"
                        data={user?.firstName}
                        icon={<AiOutlineUser size={70} />}
                      />
                      <AccountCard
                        title="Email"
                        data={user?.email}
                        icon={<AiOutlineMail size={70} />}
                      />
                      <AccountCard
                        title="Phone"
                        data={user?.phone}
                        icon={<BsPhone size={70} />}
                      />
                      {/* <AccountCard
                        title="Country"
                        data={user?.country?.id}
                        icon={<BiWorld size={70} />}
                      /> */}
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageAccountPage;
