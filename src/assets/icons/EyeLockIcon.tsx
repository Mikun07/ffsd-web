import React from "react";

function EyeLockIcon({width = 30, height = 30}) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="#40B52D"
      d="M14.9 11.1c-1 .8-1.7 2-1.7 3.4v.2c-.4.2-.8.3-1.2.3-1.7 0-3-1.3-3-3s1.3-3 3-3c1.4 0 2.5.9 2.9 2.1M12 18.2c0-.4.1-.8.3-1.2H12c-2.8 0-5-2.2-5-5s2.2-5 5-5c2.1 0 3.9 1.3 4.7 3.2.4-.1.9-.2 1.3-.2 2.1 0 3.9 1.3 4.5 3.1.2-.3.3-.7.5-1.1-1.7-4.4-6-7.5-11-7.5S2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5zm8.8-1.2h-4.3v-2.5c0-.8.7-1.3 1.5-1.3s1.5.5 1.5 1.3v.5h1.3v-.5c0-1.4-1.4-2.5-2.8-2.5s-2.8 1.1-2.8 2.5V17c-.6 0-1.2.6-1.2 1.2v3.5c0 .7.6 1.3 1.2 1.3h5.5c.7 0 1.3-.6 1.3-1.2v-3.5c0-.7-.6-1.3-1.2-1.3"
    />
  </svg>
  );
}

export default EyeLockIcon;
