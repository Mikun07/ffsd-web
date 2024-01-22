import React, { useState } from "react";
import LogoDP from "../../../assets/Logo.png";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "../../../assets/icons/DashboardIcon";
import SchoolIcon from "../../../assets/icons/SchoolIcon";
import ArchiveIcon from "../../../assets/icons/ArchiveIcon";
import ReceiptIcon from "../../../assets/icons/ReceiptIcon";
import AccountIcon from "../../../assets/icons/AccountIcon";
import { logout } from "../../../redux/features/loginSlice";
import LogoutIcon from "../../../assets/icons/LogoutIcon";

function UserSidebar() {
//   const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();


  const menu = [
    {
      name: "dashboard",
      url: "/dashboard",
      icon: <DashboardIcon width="25" height="25" />,
    },
    {
      name: "verify Documents",
      url: "/dashboard/verifydocument",
      icon: <SchoolIcon width="25" height="25" />,
    },

    {
      name: "Manage Documents",
      url: "/dashboard/document",
      icon: <ArchiveIcon width="25" height="25" />,
    },
    {
      name: "Manage Receipts",
      url: "",
      icon: <ReceiptIcon width="25" height="25" />,
    },
    {
      name: " Manage account",
      url: "/dashboard/account",
      icon: <AccountIcon width="25" height="25" />,
    },
  ];

  function signOut() {
    dispatch(logout());
  }
  return (
    <>
      <div
        className={`lg:w-64 md:w-64 w-16 relative h-screen flex flex-col justify-between bg-gray-200 z-30 shadow-md py-2`}
      >
        <div className={`flex items-center gap-2 mx-4 p-1`}>
          <img src={LogoDP} alt="" className={`w-[70px]`} />
          <p
            className={`lg:flex md:flex hidden flex-col leading-4 font-semibold tracking-wider capitalize text-[15px] text-[#40B52D]`}
          >
            Documents
            <span className={`text-[#D4973B] `}>
              Verification
            </span>
          </p>
        </div>

        <div className={` flex flex-col gap-1`}>
          {menu.map(({ url, name, icon }, index) => (
            <div
              key={index}
              className={`flex items-center justify-between text-primary`}
            >
              <Link
                to={url}
                className={
                  pathname === url
                    ? "w-full mx-4 p-1 rounded-lg bg-white text-primary"
                    : "w-full mx-4 p-1 rounded-lg hover:bg-gray-300"
                }
              >
                <div
                  className={` flex gap-2 items-center `}
                >
                  {icon}
                  <p
                    className={`lg:flex md:flex hidden font-semibold capitalize text-sm`}
                  >
                    {name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={signOut}
          className={`flex items-center w-full px-4 pt-2 border-t-2 border-gray-300 p-1 gap-2 text-[#D43B3B]`}
        >
          <LogoutIcon />
          <p className={`lg:flex md:flex hidden font-bold`}>
            Logout
          </p>
        </button>
      </div>
    </>
  );
}

export default UserSidebar;
