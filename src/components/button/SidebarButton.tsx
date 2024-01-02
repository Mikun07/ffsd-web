import React, { useState } from "react";
import MenuIcon from "../../assets/icons/MenuIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import AccountIcon from "../../assets/icons/AccountIcon";
import ArchiveIcon from "../../assets/icons/ArchiveIcon";
import ManageUserIcon from "../../assets/icons/ManageUserIcon";
import ReceiptIcon from "../../assets/icons/ReceiptIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";

function SidebarButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
      name: "manage Verification",
      url: "/admin/manageverification",
      icon: <ArchiveIcon width={30} height={30}/>,
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
      <button
        onClick={() => setOpen(!open)}
        className="bg-transparent shadow-md rounded-lg relative lg:hidden flex items-center justify-center border-2 border-[#40B52D] p-1"
      >
        <MenuIcon />
      </button>
      {open && (
        <div className="w-60 z-20 absolute top-0 left-0 h-screen overflow-hidden bg-black py-3 flex justify-center">
          <div className="flex flex-col w-full justify-between">
            <div className="text-xl flex justify-center">
              <b className="flex capitalize text-[#40B52D]">
                Documents <span className="text-[#D4973B]">Verification</span>
              </b>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              {menu.map(({ url, name, icon }, i) => (
                <button className="flex flex-row justify-center w-full">
                  <Link
                    key={i}
                    to={url}
                    onClick={() => setOpen(!open)}
                    className={
                      pathname === url
                        ? "bg-white w-full py-1 item-center justify-center text-[#40B52D]"
                        : "flex items-center py-1 justify-center text-[#40B52D] hover:bg-gray-300 w-full"
                    }
                  >
                    <span className="flex capitalize gap-2 mx-6 items-center w-full">
                      {icon}
                      <b className="flex justify-start w-full">
                        {name}
                      </b>
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
              <p className="flex font-bold">Logout</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SidebarButton;
