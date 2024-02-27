import React from "react";

function LeftOutlineIcon({ width = "30", height = "30" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 48 48"
    >
      <path fill="none" d="M0 0h48v48H0z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M31 36 19 24l12-12"
      />
    </svg>
  );
}

export default LeftOutlineIcon;
