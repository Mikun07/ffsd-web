import React from "react";

function Avatar() {
  const [profile, setProfile] = [{ Name: "Festus-Olaleye Ayomikun" }];
  return (
    <>
      <div className="h-[120px] w-[120px] rounded-full bg-[#40B52D] cursor-pointer flex items-center justify-center text-white">
        <p className="font-semibold text-6xl">
          {profile.Name.split(" ")[0][0]}
          {profile.Name.split(" ")[1][0]}
        </p>
      </div>
    </>
  );
}

export default Avatar;
