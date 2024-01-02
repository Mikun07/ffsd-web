import React from "react";

function DashboardIcon({ width= "30", height="30"}) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <path
      fill="#40b52d"
      d="M5 5h4v6H5zm10 8h4v6h-4zM5 17h4v2H5zM15 5h4v2h-4z"
      opacity={0.3}
    />
    <path
      fill="#40b52d"
      d="M3 13h8V3H3zm2-8h4v6H5zm8 16h8V11h-8zm2-8h4v6h-4zM13 3v6h8V3zm6 4h-4V5h4zM3 21h8v-6H3zm2-4h4v2H5z"
    />
  </svg>
  );
}

export default DashboardIcon;
