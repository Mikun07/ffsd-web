import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import AccountIcon from "../../assets/icons/AccountIcon";
import ArchiveIcon from "../../assets/icons/ArchiveIcon";
import ManageUserIcon from "../../assets/icons/ManageUserIcon";
import ReceiptIcon from "../../assets/icons/ReceiptIcon";
import Logo from "../../assets/Logo.png";
import SchoolIcon from "../../assets/icons/SchoolIcon";
import { BsFillCaretDownFill, BsPersonFill } from "react-icons/bs";
import { RiArchiveDrawerFill, RiAdminFill } from "react-icons/ri";
import { IoIosDocument } from "react-icons/io";
import { GoVerified } from "react-icons/go";
import { GrServices, GrBusinessService } from "react-icons/gr";
import { VscOrganization } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/redux/root";
import { fetchUser } from "../../redux/features/userSlice";
import { AiOutlineSend } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";

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

  const toggleSubmenu = (submenuKey) => {
    setSubmenuOpen((prevState) => {
      const updatedSubmenuOpen = { ...prevState };

      // Close all other submenus
      Object.keys(updatedSubmenuOpen).forEach((key) => {
        if (key !== submenuKey) {
          updatedSubmenuOpen[key] = false;
        }
      });

      // Toggle the clicked submenu
      updatedSubmenuOpen[submenuKey] = !prevState[submenuKey];

      return updatedSubmenuOpen;
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
      name: "Transactions History",
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
        {
          icon: <IoIosDocument size={20} />,
          name: "All Documents",
          url: "/admin/document",
        },
        {
          icon: <RiArchiveDrawerFill size={20} />,
          name: "Archived",
          url: "/admin/document/archived",
        },
        {
          icon: <AiOutlineSend size={20} />,
          name: "Submitted",
          url: "/admin/document/submitted",
        },
        {
          icon: <MdReportProblem size={20} />,
          name: "Queried",
          url: "/admin/document/queried",
        },
        {
          icon: <GoVerified size={20} />,
          name: "Verified",
          url: "/admin/document/verified",
        },
      ],
      active: isMenuActive("/admin/document"),
    },

    {
      name: "Manage Users",
      icon: <ManageUserIcon width="25" height="25" />,
      submenu: true,
      submenuItems: [
        {
          icon: <RiAdminFill size={20} />,
          name: "Admin",
          url: "/admin/user/admin",
          condition: user?.is_system_admin === "1",
        },
        {
          icon: <BsPersonFill size={20} />,
          name: "individual",
          url: "/admin/user/individual",
        },
        {
          icon: <VscOrganization size={20} />,
          name: "Organization",
          url: "/admin/user/organization",
        },
      ].filter((item) => item.condition !== false),
      active: isMenuActive("/admin/user"),
    },
    {
      name: "Manage Service",
      icon: <SchoolIcon width="25" height="25" />,
      submenu: true,
      submenuItems: [
        {
          icon: <GrServices size={20} />,
          name: "service charge",
          url: "/admin/servicecharge",
        },
        {
          icon: <GrBusinessService size={20} />,
          name: "sur-charge",
          url: "/admin/surcharge",
        },
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

  return (
    <>
      <div
        className={`lg:w-60 md:w-60 w-16 relative h-full flex flex-col bg-gray-200 z-30 shadow-md py-2`}
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

        <div className="flex flex-col gap-1 mt-[50px]">
          {menu.map((menuItem, index) => (
            <div
              key={index}
              onClick={() =>
                toggleSubmenu(
                  menuItem.name.toLowerCase() as keyof typeof submenuOpen
                )
              }
              className={`flex flex-col items-start mt-1 px-3 text-primary ${
                menuItem.spacing ? "mb-2" : "mt-1"
              }`}
            >
              <Link
                to={menuItem.url}
                className={`link-tooltip ${
                  menuItem.submenu && submenuOpen[menuItem.name.toLowerCase()]
                    ? "submenu-open"
                    : ""
                } ${
                  menuItem.active
                    ? "w-full p-2 rounded-lg bg-white text-primary"
                    : "w-full p-2 rounded-lg hover:bg-gray-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    {menuItem.icon}
                    <p className="lg:flex md:flex hidden font-semibold capitalize text-[14px]">
                      {menuItem.name}
                    </p>
                  </div>
                  {menuItem.submenu && <BsFillCaretDownFill />}
                </div>
                <div className="tooltip-text">{menuItem.name}</div>{" "}
              </Link>
              {menuItem.submenu && submenuOpen[menuItem.name.toLowerCase()] && (
                <div className="flex flex-col w-full">
                  {menuItem.submenuItems.map((submenuItem, index) => (
                    <Link
                      key={index}
                      to={submenuItem.url}
                      className={`link-tooltip ${
                        isMenuActive(submenuItem.url)
                          ? "w-full p-2 lg:pl-7 mt-2 rounded-lg bg-white font-semibold capitalize text-[14px]"
                          : "w-full p-2 lg:pl-7 mt-2 rounded-lg hover:bg-gray-300 font-semibold capitalize text-[14px]"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          {submenuItem.icon}
                          <p className="lg:flex md:flex hidden font-semibold capitalize text-[14px]">
                            {submenuItem.name}
                          </p>
                        </div>
                        <div className="tooltip-text">{submenuItem.name}</div>{" "}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
