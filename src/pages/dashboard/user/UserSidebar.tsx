import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types/redux/root";
import { fetchUser } from "../../../redux/features/userSlice";
import DashboardIcon from "../../../assets/icons/DashboardIcon";
import ReceiptIcon from "../../../assets/icons/ReceiptIcon";
import ArchiveIcon from "../../../assets/icons/ArchiveIcon";
import SchoolIcon from "../../../assets/icons/SchoolIcon";
import AccountIcon from "../../../assets/icons/AccountIcon";

function AdminSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

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

  const menu = [
    {
      name: "dashboard",
      url: "/dashboard",
      icon: <DashboardIcon width="25" height="25" />,
      active: isMenuActive("/admin/dashboard"),
    },
    {
      name: "Verify Documents",
      url: "/dashboard/verifydocument",
      icon: <SchoolIcon width="25" height="25" />,
      active: isMenuActive("/dashboard/verifydocument"),
    },
    {
      name: "Manage Transactions",
      url: "/dashboard/transaction",
      icon: <ReceiptIcon width="25" height="25" />,
      active: isMenuActive("/dashboard/transaction"),
    },
    {
      name: "Manage Documents",
      url: "/dashboard/document",
      icon: <ArchiveIcon width="25" height="25" />,
      active: isMenuActive("/dashboard/document"),
    },
    {
      name: "Profile",
      url: "/dashboard/account",
      icon: <AccountIcon width="25" height="25" />,
      active: isMenuActive("/dashboard/account"),
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
              className={`flex flex-col items-start mt-1 px-3 text-primary`}
            >
              <Link
                to={menuItem.url}
                className={`link-tooltip ${
                  menuItem.active ? "active" : ""
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
                  <div className="tooltip-text">{menuItem.name}</div>{" "}
                  {/* Add this */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
