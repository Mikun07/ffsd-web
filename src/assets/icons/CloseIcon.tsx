import React from "react";

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} >
      <path fill="none" d="M0 0h32v32H0z" />
      <path
        fill="currentColor"
        d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14 14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6 10.6 23 9 21.4l5.4-5.4L9 10.6 10.6 9l5.4 5.4L21.4 9l1.6 1.6-5.4 5.4 5.4 5.4z"
      />
    </svg>
  );
}

export default CloseIcon;
