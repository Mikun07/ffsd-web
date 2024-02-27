import { useEffect } from "react";
import BellIcon from "../../assets/icons/BellIcon";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/features/userSlice";
import { RootState } from "../../types/redux/root";
import { ThunkDispatch } from "@reduxjs/toolkit";

function Header() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchUser());
    // location.reload();
  }, [dispatch]);

  // Select user data and loading state from Redux store
  const { data: user, loading: userLoading } = useSelector(
    (state: RootState) => state?.user
  );

  console.log({ user });

  // Render user greeting based on loading state and user data
  const renderUserGreeting = () => {
    if (userLoading) {
      // Show loading animation while user data is being fetched
      return (
        <div className="w-[350px] h-4 bg-[#D4973B] rounded-lg p-2 animate-pulse"></div>
      );
    } else if (user) {
      // Display user's first and last name
      const { firstName, lastName } = user;
      return (
        <p className="lg:flex hidden font-bold capitalize text-[15px] gap-1">
          Hi{" "}
          <span className="text-[#D4973B]">{`${firstName} ${lastName}`}</span>
        </p>
      );
    }
    // Return null if user data is not available
    return null;
  };

  return (
    <div className="flex h-14 px-4 py-2 bg-gray-200 w-full sticky z-20 top-0 shadow-sm justify-between">
      {/* Render user greeting */}
      <div className="flex items-center gap-3">{renderUserGreeting()}</div>
      {/* Render notification bell and user avatar */}
      <div className="flex items-center gap-3">
        <button className="bg-transparent px-1 relative">
          <BellIcon width="25" height="25" />
          <div className="absolute top-[-5px] left-[1px] h-4 w-4 items-center justify-center bg-[#D4973B] rounded-full">
            <p className="text-white text-[9px] font-medium">5</p>
          </div>
        </button>
        {/* Render user avatar or loading animation */}
        {userLoading ? (
          <div className="h-[35px] w-[35px] animate-pulse bg-[#D4973B] rounded-full"></div>
        ) : (
          <div className="h-[40px] w-[40px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center capitalize text-white">
            <p className="font-semibold">{`${user?.firstName?.[0]?.toUpperCase()}${user?.lastName?.[0]?.toUpperCase()}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
