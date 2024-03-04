import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import AccountIcon from "../../assets/icons/AccountIcon";
import ArchiveIcon from "../../assets/icons/ArchiveIcon";
import ManageUserIcon from "../../assets/icons/ManageUserIcon";
import ReceiptIcon from "../../assets/icons/ReceiptIcon";
import Logo from "../../assets/Logo.png";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import SchoolIcon from "../../assets/icons/SchoolIcon";
import { adminLogout } from "../../redux/features/Admin/AdminSlice";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/redux/root";
import { fetchUser } from "../../redux/features/userSlice";

function AdminSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [submenuOpen, setSubmenuOpen] = useState({
    document: false,
    user: false,
  });

  const { data: user, loading: loadingMenu } = useSelector(
    (state: RootState) => state?.user
  ) as any;

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchUser());
  }, [dispatch]);

  const isMenuActive = (menuUrl) => {
    return location.pathname === menuUrl;
  };

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

  const menu = [
    {
      name: "dashboard",
      url: "/admin/dashboard",
      icon: <DashboardIcon width="25" height="25" />,
      active: isMenuActive("/admin/dashboard"),
    },
    {
      name: "Manage Transactions",
      url: "/admin/transaction",
      icon: <ReceiptIcon width="25" height="25" />,
      active: isMenuActive("/admin/transaction"),
      spacing: true,
    },
    {
      name: "Manage Documents",
      icon: <ArchiveIcon width="25" height="25" />,
      submenu: true,
      submenuItems: [
        { name: "All Documents", url: "/admin/document" },
        { name: "Archived", url: "/admin/document/archived" },
        { name: "Submitted", url: "/admin/document/submitted" },
        { name: "Queried", url: "/admin/document/queried" },
        { name: "Verified", url: "/admin/document/verified" },
      ],
      active: isMenuActive("/admin/document"),
    },

    {
      name: "Manage Users",
      icon: <ManageUserIcon width="25" height="25" />,
      submenu: true,
      submenuItems: [
        {
          name: "Admin",
          url: "/admin/user/admin",
          condition: user?.is_system_admin === "1",
        },
        { name: "individual", url: "/admin/user/individual" },
        { name: "Organization", url: "/admin/user/organization" },
      ].filter((item) => item.condition !== false),
      active: isMenuActive("/admin/user"),
    },
    {
      name: "Manage Service",
      icon: <SchoolIcon width="25" height="25" />,
      submenu: true,
      submenuItems: [
        { name: "service charge", url: "/admin/servicecharge" },
        { name: "sur-charge", url: "/admin/surcharge" },
      ],
      active: isMenuActive("/admin/system"),
      spacing: true,
    },

    {
      name: "Profile",
      url: "/admin/account",
      icon: <AccountIcon width="25" height="25" />,
      active: isMenuActive("/admin/account"),
      spacing: true,
    },
  ];

  const signOut = () => {
    dispatch(adminLogout());
  };

  return (
    <>
      <div
        className={`lg:w-64 md:w-64 w-16 relative h-screen flex flex-col bg-gray-200 z-30 shadow-md py-2`}
      >
        <div className={`flex items-center gap-2 mx-4 p-1`}>
          <img src={Logo} alt="" className={`w-[70px]`} />
          <p
            className={`lg:flex md:flex hidden flex-col leading-4 font-semibold tracking-wider capitalize text-[15px] text-[#40B52D]`}
          >
            Documents
            <span className={`text-[#D4973B] `}>Verification</span>
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

        <button
          onClick={signOut}
          className={`flex items-center w-full px-4 p-2 gap-2 text-[#D43B3B]`}
        >
          <LogoutIcon />
          <p className={`lg:flex md:flex hidden font-bold`}>Logout</p>
        </button>
      </div>
    </>
  );
}

export default AdminSidebar;
