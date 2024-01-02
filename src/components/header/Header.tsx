import React from "react";
import BellIcon from "../../assets/icons/BellIcon";
import SidebarButton from "../button/SidebarButton";

function Header() {
  const [profile, setProfile] = [{ Name: "Festus-Olaleye Ayomikun" }];
  return (
    <>
      <div className="flex h-12 px-4 py-2 bg-white w-full sticky top-0 justify-between">
        <div className="flex items-center gap-3">
          <div className="lg:hidden flex">
            <SidebarButton />
          </div>
          <p className="lg:flex hidden font-bold capitalize text-[15px] gap-1">
            Hi<span className="text-[#D4973B]"> Festus-olaleye ayomikun</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-transparent px-1 relative">
            <BellIcon width="25" height="25" />
            <div className="absolute top-[-5px] left-[1px] h-4 w-4 items-center justify-center bg-[#D4973B] rounded-full">
              <p className="text-white text-[9px] font-medium">5</p>
            </div>
          </button>

          <div className="h-[35px] w-[35px] text-xl rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
            <p className="font-semibold lg:text-[20px] text-[18px]">
              {profile.Name.split(" ")[0][0]}
              {profile.Name.split(" ")[1][0]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
