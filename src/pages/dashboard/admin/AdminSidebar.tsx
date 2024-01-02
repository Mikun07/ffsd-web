import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import AccountIcon from "../../../assets/icons/AccountIcon";
import DashboardIcon from "../../../assets/icons/DashboardIcon";
import ArchiveIcon from "../../../assets/icons/ArchiveIcon";
import ManageUserIcon from "../../../assets/icons/ManageUserIcon";
import ReceiptIcon from "../../../assets/icons/ReceiptIcon";
import Logo from "../../../assets/Logo.png";

function AdminSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menu = [
    {
      name: "dashboard",
      url: "/admin/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "account",
      url: "/admin/account",
      icon: <AccountIcon />,
    },
    {
      name: "Manage Verification",
      url: "/admin/manageverification",
      icon: <ArchiveIcon width={30} height={30} />,
    },
    {
      name: "manage users",
      url: "/admin/manageuser",
      icon: <ManageUserIcon />,
    },
    {
      name: "Receipts",
      url: "/admin/receipts",
      icon: <ReceiptIcon />,
    },
  ];

  function logout() {
    localStorage.setItem("authToken", null);
    navigate("/login");
  }
  return (
    <>
      <div className="w-56 h-screen overflow-hidden bg-black py-3 lg:flex hidden justify-center">
        <div className="flex flex-col w-full justify-between">
          <div className="text-lg flex gap-2 items-center justify-center">
            <div className="w-[70px]">
              <img src={Logo} alt="" />
            </div>
            <b className="flex flex-col gap-0 capitalize text-[#40B52D]">
              Documents <span className="text-[#D4973B]">Verification</span>
            </b>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            {menu.map(({ url, name, icon }, index) => (
              <button className="flex flex-row justify-center w-full">
                <Link
                  key={index}
                  to={url}
                  className={
                    pathname === url
                      ? "bg-white w-full py-1 text-sm item-center justify-center text-[#40B52D]"
                      : "flex items-center py-1 text-sm justify-center text-[#40B52D] hover:bg-gray-300 w-full"
                  }
                >
                  <span className="flex capitalize gap-2 mx-6 items-center w-full">
                    {icon}
                    <b className="flex justify-start w-full">{name}</b>
                  </span>
                </Link>
              </button>
            ))}
          </div>
          <button
            onClick={logout}
            className="flex items-center w-full ml-6 gap-2 text-[#D43B3B] hover:scale-110 duration-300"
          >
            <LogoutIcon />
            <p className=" flex font-bold">Logout</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
