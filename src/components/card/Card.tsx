import React from "react";
import EllipsisVerticalOutline from "../../assets/icons/EllipsisVerticalOutline";

function Card({ name, number, icon }) {
  return (
    <div className="flex p-2 bg-[#40B52D] cursor-pointer shadow-md lg:w-[200px] lg:h-[120px] rounded-lg">
      <div className="flex items-center w-full flex-col item-center ">
        <p className="font-bold text-white lg:text-lg text-sm">{name}</p>
        <h1 className="font-bold text-white">{number}</h1>
      </div>

      <div className="flex flex-col justify-between w-full">
        <button className="flex w-full bg-transparent justify-end">
          <EllipsisVerticalOutline />
        </button>
        <div className="flex w-full justify-center items-center text-xl text-white">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Card;
