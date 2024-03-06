import { useEffect, useState } from "react";
import Logo from "../../../assets/Logo.png";
import DashboardIcon from "../../../assets/icons/DashboardIcon";
import AccountIcon from "../../../assets/icons/AccountIcon";
import ArchiveIcon from "../../../assets/icons/ArchiveIcon";
import ManageUserIcon from "../../../assets/icons/ManageUserIcon";
import ReceiptIcon from "../../../assets/icons/ReceiptIcon";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "../../../assets/icons/DocumentIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types/redux/root";
import { fetchUser } from "../../../redux/features/userSlice";
import { FaNetworkWired } from "react-icons/fa";
import { BsFillCaretDownFill } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdGitNetwork } from "react-icons/io";

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

      updatedSubmenuOpen[submenuKey] = !prevState[submenuKey];

      Object.keys(prevState).forEach((key) => {
        if (key !== submenuKey) {
          updatedSubmenuOpen[key] = false;
        }
      });

      return updatedSubmenuOpen as typeof prevState; // Type assertion
    });
  };

  let menu = [
    {
      name: "Dashboard",
      url: "/org/dashboard",
      icon: <DashboardIcon width="25" height="25" />,
      active: isMenuActive("/org/dashboard"),
    },
    {
      name: "Verify Documents",
      url: "/org/verifydocument",
      icon: <SchoolIcon width="25" height="25" />,
      active: isMenuActive("/org/verifydocument"),
      spacing: true,
    },
    {
      name: "Manage Staff",
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
        {
          icon: <IoMdGitNetwork size={20} />,
          name: "Referrals",
          url: "/org/referrals",
        },
        {
          icon: <HiOutlineDocumentReport size={20} />,
          name: "Manage Document",
          url: "/org/referrals/documents",
        },
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
                  menuItem.active && menuItem.submenu ? "active" : ""
                } w-full p-2 rounded-lg hover:bg-gray-300`}
                style={{ textDecoration: "none" }} 
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
                {/* Add this */}
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
                      style={{ textDecoration: "none" }}
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

export default OrgSidebar;
