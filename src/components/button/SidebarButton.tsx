import React, { useState } from "react";
import MenuIcon from "../../assets/icons/MenuIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoDP from "../../assets/Logo.png";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import AccountIcon from "../../assets/icons/AccountIcon";
import ArchiveIcon from "../../assets/icons/ArchiveIcon";
import ManageUserIcon from "../../assets/icons/ManageUserIcon";
import ReceiptIcon from "../../assets/icons/ReceiptIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/loginSlice";

function SidebarButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const menu = [
    {
      name: "dashboard",
      // url: "/org/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "account",
      // url: "/admin/account",
      icon: <AccountIcon />,
    },
    {
      name: "manage Verification",
      // url: "/admin/manageverification",
      icon: <ArchiveIcon width={30} height={30} />,
    },
    {
      name: "manage users",
      // url: "/admin/manageuser",
      icon: <ManageUserIcon />,
    },
    {
      name: "Receipts",
      // url: "/admin/receipts",
      icon: <ReceiptIcon />,
    },
  ];

  function signOut() {
    dispatch(logout())
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
        <div
          className={`w-60 z-20 absolute top-0 left-0 duration-200 h-screen lg:flex hidden flex-col justify-between bg-slate-100 shadow-sm shadow-primary py-2`}
        >
          <div className={`flex items-center gap-2 mx-4 p-1`}>
            <img src={LogoDP} alt="" className={`w-[70px]`} />
            <p
              className={`flex flex-col leading-4 font-semibold tracking-wider capitalize text-[15px] text-[#40B52D]`}
            >
              Documents
              <span className={`text-[#D4973B] `}>Verification</span>
            </p>
          </div>

          <div className={` flex flex-col gap-1`}>
            {menu.map(({ url, name, icon }, index) => (
              <div className={`flex items-center justify-between text-primary`}>
                <Link
                  key={index}
                  to={url}
                  onClick={() => setOpen(!open)}
                  className={
                    pathname === url
                      ? "w-full mx-4 p-1 rounded-lg bg-white"
                      : "w-full mx-4 p-1 rounded-lg hover:bg-gray-300"
                  }
                >
                  <div className={`flex gap-2 items-center `}>
                    {icon}
                    <p className={`font-semibold capitalize text-sm`}>{name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={signOut}
            className={`flex items-center w-full mx-4 p-1 gap-2 text-[#D43B3B]`}
          >
            <LogoutIcon />
            <p className={`flex font-bold`}>Logout</p>
          </button>
        </div>
      )}
    </>
  );
}

export default SidebarButton;
