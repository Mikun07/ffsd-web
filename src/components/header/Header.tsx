import React, { useEffect, useState } from "react";
import BellIcon from "../../assets/icons/BellIcon";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/features/userSlice";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.data ?? state?.login?.data);
  const userLoading = useSelector((state) => state?.user?.loading);

  async function getUser() {
    dispatch(fetchUser());
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="flex h-14 px-4 py-2 bg-gray-200 w-full sticky z-20 top-0 shadow-sm justify-between">
        <div className="flex items-center gap-3">
          {userLoading ? (
            <div className="flex w-[350px] animate-pulse">
              <div className=" h-4  bg-[#D4973B] rounded-lg p-2 w-full"></div>
            </div>
          ) : (
            <p className="lg:flex hidden font-bold capitalize text-[15px] gap-1">
              Hi
              <span className="text-[#D4973B]">
                {user?.lastName} {user?.firstName}
              </span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-transparent px-1 relative">
            <BellIcon width="25" height="25" />
            <div className="absolute top-[-5px] left-[1px] h-4 w-4 items-center justify-center bg-[#D4973B] rounded-full">
              <p className="text-white text-[9px] font-medium">5</p>
            </div>
          </button>
          <div>
            {userLoading ? (
              <div className="h-[35px] w-[35px] animate-pulse bg-[#D4973B] rounded-full"></div>
            ) : (
              <div className="h-[35px] w-[35px] text-xl rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
                <p className="font-semibold text-[18px]">
                  {user?.firstName[0]}
                  {user?.lastName[0]}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
