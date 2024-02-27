import React from "react";

function EllipsisVerticalOutline() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      viewBox="0 0 512 512"
    >
      <circle
        cx={256}
        cy={256}
        r={32}
        fill="none"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <circle
        cx={256}
        cy={416}
        r={32}
        fill="none"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <circle
        cx={256}
        cy={96}
        r={32}
        fill="none"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
    </svg>
  );
}

export default EllipsisVerticalOutline;
