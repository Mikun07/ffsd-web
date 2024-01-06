import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import AccountIcon from "../../../assets/icons/AccountIcon";
import DashboardIcon from "../../../assets/icons/DashboardIcon";
import ArchiveIcon from "../../../assets/icons/ArchiveIcon";
import ManageUserIcon from "../../../assets/icons/ManageUserIcon";
import ReceiptIcon from "../../../assets/icons/ReceiptIcon";
import Logo from "../../../assets/Logo.png";
import SchoolIcon from "../../../assets/icons/SchoolIcon";

function AdminSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(true);

  const menu = [
    {
      name: "dashboard",
      url: "/admin/dashboard",
      icon: <DashboardIcon width="25" height="25" />,
    },
    {
      name: "verify Documents",
      url: "",
      icon: <SchoolIcon width="25" height="25" />,
    },
    {
      name: " Manage account",
      url: "",
      icon: <AccountIcon width="25" height="25" />,
    },
    {
      name: "Manage Verification",
      url: "",
      icon: <ArchiveIcon width="25" height="25" />,
    },
    {
      name: "manage users",
      url: "",
      icon: <ManageUserIcon width="25" height="25" />,
    },
    {
      name: "Manage Receipts",
      url: "",
      icon: <ReceiptIcon width="25" height="25" />,
    },
  ];

  function logout() {
    localStorage.setItem("authToken", null);
    navigate("/login");
  }
  return (
    <>
      <div
        className={`${
          open ? "w-64" : "w-16"
        } duration-200 h-screen lg:flex hidden flex-col justify-between bg-slate-200 shadow-sm shadow-primary py-2`}
      >
        <div className={`flex items-center gap-2 mx-4 p-1`}>
          <img
            src={Logo}
            onClick={() => setOpen(!open)}
            alt=""
            className={`w-[70px]`}
          />
          <p
            className={`flex flex-col leading-4 font-semibold tracking-wider capitalize text-[15px] text-[#40B52D] ${
              !open && "scale-0"
            }`}
          >
            Documents
            <span className={`text-[#D4973B] ${!open && "scale-0"}`}>
              Verification
            </span>
          </p>
        </div>

        <div className={` flex flex-col gap-1`}>
          {menu.map(({ url, name, icon }, index) => (
            <div className={`flex items-center justify-between text-primary`}>
              <Link
                key={index}
                to={url}
                className={
                  pathname === url
                    ? "w-full mx-4 p-1 rounded-lg bg-white"
                    : "w-full mx-4 p-1 rounded-lg hover:bg-gray-300"
                }
              >
                <div
                  className={`${
                    !open && "flex items-center justify-center"
                  } flex gap-2 items-center `}
                >
                  {icon}
                  <p
                    className={` ${
                      !open && "hidden"
                    } font-semibold capitalize text-sm`}
                  >
                    {name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={logout}
          className={`${
            !open && "flex items-center justify-center mx-0"
          } flex items-center w-full mx-4 p-1 gap-2 text-[#D43B3B]`}
        >
          <LogoutIcon />
          <p
            className={`${
              !open && "hidden"
            } origin-left duration-200 flex font-bold`}
          >
            Logout
          </p>
        </button>
      </div>
    </>
  );
}

export default AdminSidebar;
