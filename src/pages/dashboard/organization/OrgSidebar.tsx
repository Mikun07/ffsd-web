import { useEffect, useState } from "react";
import LogoDP from "../../../assets/Logo.png";
import DashboardIcon from "../../../assets/icons/DashboardIcon";
import AccountIcon from "../../../assets/icons/AccountIcon";
import ArchiveIcon from "../../../assets/icons/ArchiveIcon";
import ManageUserIcon from "../../../assets/icons/ManageUserIcon";
import ReceiptIcon from "../../../assets/icons/ReceiptIcon";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import SchoolIcon from "../../../assets/icons/DocumentIcon";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/loginSlice";
import { RootState } from "../../../types/redux/root";
import { fetchUser } from "../../../redux/features/userSlice";

function OrgSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const isMenuActive = (menuUrl) => {
    return location.pathname === menuUrl;
  };

  const { data: user, loading: loadingMenu } = useSelector(
    (state: RootState) => state?.user
  ) as any;

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchUser());
  }, []);

  // Sidebar menu items
  let menu = [
    {
      name: "dashboard",
      url: "/org/dashboard",
      icon: <DashboardIcon width="25" height="25" />,
      active: isMenuActive("/org/dashboard"),
    },
    {
      name: "verify Documents",
      url: "/org/verifydocument",
      icon: <SchoolIcon width="25" height="25" />,
      active: isMenuActive("/org/verifydocument"),
      spacing: true,
    },
    {
      name: "manage staff",
      url: "/org/staff",
      icon: <ManageUserIcon width="25" height="25" />,
      active: isMenuActive("/org/staff"),
    },
    {
      name: "Manage Transaction",
      url: "/org/managetransaction",
      icon: <ReceiptIcon width="25" height="25" />,
      active: isMenuActive("/org/managetransaction"),
    },
    {
      name: "Manage Documents",
      url: "/org/managedocument",
      icon: <ArchiveIcon width="25" height="25" />,
      active: isMenuActive("/org/document"),
      spacing: true,
    },
    {
      name: "Profile",
      url: "/org/account",
      icon: <AccountIcon width="25" height="25" />,
      active: isMenuActive("/org/account"),
      spacing: true,
    },
  ];

  const isStaff = user?.category === "staff";
  menu = menu.filter(
    (menuItem) =>
      !(
        isStaff &&
        (menuItem.name === "manage staff" ||
          menuItem.name === "verify Documents" 
          // ||
          // menuItem.name === "Manage Transaction"
          )
      )
  );

  function signOut() {
    dispatch(logout());
  }

  return (
    <>
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

export default OrgSidebar;
