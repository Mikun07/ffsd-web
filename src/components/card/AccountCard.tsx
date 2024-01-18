import React from "react";

function AccountCard({title, data, icon}) {
  return (
    <>
      <div className="bg-gray-300 p-3 rounded-lg  flex justify-between lg: gap-2">
        <div className="flex flex-col gap-2">
            <p className=" capitalize font-bold text-xl">{title}</p>
            <p className=" font-medium text-center text-sm">{data}</p>
        </div>
        <div className="text-primary lg:flex md:flex sm:flex hidden justify-center items-center">
            {icon}
        </div>
      </div>
    </>
  );
}

export default AccountCard;
