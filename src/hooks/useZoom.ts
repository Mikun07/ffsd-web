import React, { useState, useEffect } from "react";

function useZoom() {
  const [shouldZoom, setShouldZoom] = useState(true); // Always set to true for 67% zoom

  useEffect(() => {
    const handleResize = () => {
      // No need for this logic as we always want to zoom out
      // const screenWidth = window.innerWidth;
      // const shouldZoomOut = screenWidth <= 1280;
      // setShouldZoom(shouldZoomOut);
    };

    window.addEventListener("resize", handleResize);
    // handleResize(); No need to call handleResize here
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (shouldZoom) {
      (document.documentElement.style as any).zoom = "67%";
    } else {
      (document.documentElement.style as any).zoom = "100%";
    }
  }, [shouldZoom]);

  return shouldZoom;
}

export default useZoom;
