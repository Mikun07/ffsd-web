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
import { FaNetworkWired } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";

function OrgSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [submenuOpen, setSubmenuOpen] = useState({
    referrals: false,
  });

  const isMenuActive = (menuUrl) => {
    return location.pathname === menuUrl;
  };

  const { data: user, loading: loadingMenu } = useSelector(
    (state: RootState) => state?.user
  ) as any;

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchUser());
  }, [dispatch]);

  const toggleSubmenu = (submenuKey: keyof typeof submenuOpen) => {
    setSubmenuOpen((prevState) => {
      const updatedSubmenuOpen: { [key: string]: boolean } = {};

      // Toggle the clicked submenu
      updatedSubmenuOpen[submenuKey] = !prevState[submenuKey];

      // Close all other submenus
      Object.keys(prevState).forEach((key) => {
        if (key !== submenuKey) {
          updatedSubmenuOpen[key] = false;
        }
      });

      return updatedSubmenuOpen as typeof prevState; // Type assertion
    });
  };

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
      url: "/org/transaction",
      icon: <ReceiptIcon width="25" height="25" />,
      active: isMenuActive("/org/transaction"),
    },
    {
      name: "Manage Documents",
      url: "/org/document",
      icon: <ArchiveIcon width="25" height="25" />,
      active: isMenuActive("/org/document"),
      spacing: true,
    },

    {
      name: "Manage Referrals",
      icon: <FaNetworkWired size={25} />,
      submenu: true,
      submenuItems: [
        { name: "Referrals", url: "/org/referrals" },
        { name: "Manage Document", url: "/org/referrals/documents" },
      ],
      active: isMenuActive("/org/referrals"),
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
          menuItem.name === "verify Documents" ||
          menuItem.name === "Manage Referrals")
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

        <div className="flex flex-col gap-1 mt-[120px]">
          {menu.map((menuItem, index) => (
            <div
              key={index}
              className={`flex flex-col items-start mt-1 px-3 text-primary ${
                menuItem.spacing ? "mb-8" : "mt-1"
              }`}
            >
              {/* Create a container for each menu item. */}
              <Link
                to={menuItem.url}
                className={`${
                  menuItem.submenu && submenuOpen[menuItem.name.toLowerCase()]
                    ? "submenu-open" // Add a class if the submenu is open
                    : ""
                } ${
                  menuItem.active && menuItem.submenu // Add active class for active menu item with submenu
                    ? "active"
                    : ""
                } w-full p-2 rounded-lg hover:bg-gray-300`}
                onClick={() =>
                  menuItem.submenu &&
                  toggleSubmenu(
                    menuItem.name.toLowerCase() as keyof typeof submenuOpen
                  )
                }
              >
                {/* Create a link for each menu item with active/inactive styles. */}
                <div className="flex justify-between items-center">
                  {/* Create a container for menu item content. */}
                  <div className="flex gap-2 items-center">
                    {/* Display menu item icon and name. */}
                    {menuItem.icon}
                    <p className="lg:flex md:flex hidden font-semibold capitalize text-[14px]">
                      {menuItem.name}
                    </p>
                    {/* Display menu item name with styling. */}
                  </div>
                  {menuItem.submenu && (
                    <BsFillCaretDownFill
                      className=""
                      onClick={() =>
                        toggleSubmenu(
                          menuItem.name.toLowerCase() as keyof typeof submenuOpen
                        )
                      }
                    />
                  )}
                  {/* If menu item has submenu, display caret icon for toggling submenu. */}
                </div>
              </Link>
              {/* Move submenuItems mapping outside of the Link element */}
              {menuItem.submenu && submenuOpen[menuItem.name.toLowerCase()] && (
                <div className="flex flex-col w-full">
                  {/* If submenu is open and menu item has submenu, display submenu items. */}
                  {menuItem.submenuItems.map((submenuItem, index) => (
                    <Link
                      key={index}
                      to={submenuItem.url}
                      className={
                        isMenuActive(submenuItem.url)
                          ? "w-full p-2 pl-11 mt-2 rounded-lg bg-white font-semibold capitalize text-[14px]"
                          : "w-full p-2 pl-11 mt-2 rounded-lg hover:bg-gray-300 font-semibold capitalize text-[14px]"
                      }
                    >
                      {submenuItem.name}
                    </Link>
                  ))}
                  {/* Iterate over each submenu item and create a link for it. */}
                </div>
              )}
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
