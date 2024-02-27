import React from "react";
import LogoDP from "../../../assets/Logo.png";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "../../../assets/icons/DashboardIcon";
import SchoolIcon from "../../../assets/icons/DocumentIcon";
import ArchiveIcon from "../../../assets/icons/ArchiveIcon";
import ReceiptIcon from "../../../assets/icons/ReceiptIcon";
import AccountIcon from "../../../assets/icons/AccountIcon";
import { logout } from "../../../redux/features/loginSlice";
import LogoutIcon from "../../../assets/icons/LogoutIcon";

function UserSidebar() {
  // Extracting the current path from the location
  const location = useLocation();
  const dispatch = useDispatch();

  const isMenuActive = (menuUrl) => {
    return location.pathname === menuUrl;
  };

  // Sidebar menu items
  const menu = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: <DashboardIcon width="25" height="25" />,
      active: isMenuActive("/dashboard"),
    },
    {
      name: "Verify Documents",
      url: "/dashboard/verifydocument",
      icon: <SchoolIcon width="25" height="25" />,
      active: isMenuActive("/dashboard/verifydocument"),
      spacing: true,
    },
    {
      name: "Manage Documents",
      url: "/dashboard/document",
      icon: <ArchiveIcon width="25" height="25" />,
      active: isMenuActive("/dashboard/document"),

    },
    {
      name: "Manage Receipts",
      url: "",
      icon: <ReceiptIcon width="25" height="25" />,
      active: isMenuActive(""),
      // spacing: true,
    },
    {
      name: "Profile",
      url: "/dashboard/account",
      icon: <AccountIcon width="25" height="25" />,
      active: isMenuActive("/dashboard/account"),
      spacing: true,
    },
  ];

  // Function to handle user sign out
  function signOut() {
    dispatch(logout());
  }

  return (
    <>
      {/* Sidebar container */}
      <div
        className={`lg:w-64 md:w-64 w-16 relative h-screen flex flex-col bg-gray-200 z-30 shadow-md py-2`}
      >
        {/* Logo and title */}
        <div className={`flex items-center gap-2 mx-4 p-1`}>
          <img src={LogoDP} alt="" className={`w-[70px]`} />
          <p
            className={`lg:flex md:flex hidden flex-col leading-4 font-semibold tracking-wider capitalize text-[15px] text-[#40B52D]`}
          >
            Documents
            <span className={`text-[#D4973B]`}>Verification</span>
          </p>
        </div>

        {/* Sidebar menu */}
        <div className={`flex flex-col gap-1 mt-[120px]`}>
          {menu.map((menuItem, index) => (
            <div
              key={index}
              className={`flex flex-col items-start mt-1 px-3 text-primary ${
                menuItem.spacing ? "mb-8" : "mt-1"
              }`}
            >
              <Link
                to={menuItem.url}
                className={
                  location.pathname === menuItem.url
                    ? "w-full p-1 rounded-lg bg-white text-primary"
                    : "w-full p-1 rounded-lg hover:bg-gray-300"
                }
              >
                <div className={`flex gap-2 items-center `}>
                  {menuItem.icon}
                  <p
                    className={`lg:flex md:flex hidden font-semibold capitalize text-sm`}
                  >
                    {menuItem.name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Logout button */}
        <button
          onClick={signOut}
          className={`flex items-center w-full px-4 pt-2 p-1 gap-2 text-[#D43B3B]`}
        >
          <LogoutIcon />
          <p className={`lg:flex md:flex hidden font-bold`}>Logout</p>
        </button>
      </div>
    </>
  );
}

export default UserSidebar;
