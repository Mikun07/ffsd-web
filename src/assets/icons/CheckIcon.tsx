import React from "react";

function CheckIcon({ width = "30", height="30"}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="currentColor"
        d="m10.586 13.414-2.829-2.828L6.343 12l4.243 4.243 7.07-7.071-1.413-1.415z"
      />
    </svg>
  );
}

export default CheckIcon;
