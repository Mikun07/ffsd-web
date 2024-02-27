import React from "react";
import { Triangle } from "react-loader-spinner";

function Loading({height="80", width="80", className="flex w-full h-screen items-center justify-center"}) {
  return (
    <div className={className}>
      <Triangle
        visible={true}
        height={height}
        width={width}
        color="#40B52D"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loading;
