import React from "react";
import BellIcon from "../../assets/icons/BellIcon";
import SidebarButton from "../button/SidebarButton";

function Header() {
  const [profile, setProfile] = [{ Name: "Festus-Olaleye Ayomikun" }];
  return (
    <>
      <div className="flex h-12 px-1 w-full justify-between">
        <div className="flex items-center gap-3">
          <SidebarButton />
          <p className=" font-bold capitalize lg:text-lg ">
            Hi <span className="text-[#D4973B]">Festus-olaleye ayomikun</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-transparent px-1 relative">
            <BellIcon />
            <div className="absolute hidden top-[-5px] left-[-2px] h-5 w-5 items-center justify-center bg-[#D4973B] rounded-full">
              <p className="text-white text-xs font-medium">10</p>
            </div>
          </button>

          <div className="h-[40px] w-[40px] text-xl rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
            <p className="font-semibold">
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
