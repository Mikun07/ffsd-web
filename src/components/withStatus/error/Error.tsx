import React from "react";
import ErrorIMG from "../../../assets/ErrorIMG";
import { startCase } from "lodash";


function Error({ label = "", ...rest}) {
  const title = startCase(label);
  return (
    <div className="flex gap-2 flex-col w-full h-screen justify-center items-center">
      <div className="w-[540px]">
        <ErrorIMG />
      </div>
      <div>
        <h1 className=" capitalize font-medium">
          {title}
        </h1>
      </div>
    </div>
  );
}

export default Error;
