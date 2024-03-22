import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/features/userSlice";
import { RootState } from "../../types/redux/root";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AiFillCaretDown } from "react-icons/ai";
import { adminLogout } from "../../redux/features/Admin/AdminSlice";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import { logout } from "../../redux/features/loginSlice";

function Header() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [modal, openModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { data: user, loading: userLoading } = useSelector(
    (state: RootState) => state?.user
  );

  const AdminSignOut = () => {
    dispatch(adminLogout());
  };
  const signOut = () => {
    dispatch(logout());
  };

  const renderUserGreeting = () => {
    if (userLoading) {
      return (
        <div className="w-[350px] h-4 bg-[#D4973B] rounded-lg p-2 animate-pulse"></div>
      );
    } else if (user) {
      const { firstName, lastName } = user;
      return (
        <p className="flex font-bold capitalize text-[15px] gap-1">
          Hi{" "}
          <span className="text-[#D4973B]">{`${firstName} ${lastName}`}</span>
        </p>
      );
    }
    return null;
  };

  return (
    <div className="flex h-14 px-4 py-2 bg-gray-200 w-full sticky z-20 top-0 shadow-sm justify-between">
      <div className="flex items-center gap-3">{renderUserGreeting()}</div>
      <div className="flex items-center gap-3">
        {userLoading ? (
          <div className="h-[35px] w-[35px] animate-pulse bg-[#D4973B] rounded-full"></div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="h-[40px] w-[40px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center capitalize text-white">
                <p className="font-semibold">{`${user?.firstName?.[0]?.toUpperCase()}${user?.lastName?.[0]?.toUpperCase()}`}</p>
              </div>

              {user?.category === "org" ||
                user?.category === "staff" ||
                user?.category === "student" ||
                (user?.category === "indv" && (
                  <>
                    <button
                      onClick={() => openModal(!modal)}
                      className="text-primary"
                    >
                      <AiFillCaretDown />
                    </button>

                    {modal && (
                      <div className="absolute z-20 shadow-md w-56 bg-slate-100 top-16 right-3 rounded-md">
                        <button
                          onClick={signOut}
                          className={`flex items-center w-full p-2 *: gap-2 text-[#D43B3B]`}
                        >
                          <LogoutIcon />
                          <p className={`flex font-bold`}>Logout</p>
                        </button>
                      </div>
                    )}
                  </>
                ))}

              {user?.is_system_admin && (
                <>
                  <button
                    onClick={() => openModal(!modal)}
                    className="text-primary"
                  >
                    <AiFillCaretDown />
                  </button>

                  {modal && (
                    <div className="absolute z-20 shadow-md w-56 bg-slate-100 top-16 right-3 rounded-md">
                      <button
                        onClick={AdminSignOut}
                        className={`flex items-center w-full p-2 *: gap-2 text-[#D43B3B]`}
                      >
                        <LogoutIcon />
                        <p className={`flex font-bold`}>Logout</p>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
