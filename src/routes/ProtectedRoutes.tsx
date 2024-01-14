import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router-dom";

const PROTECTED_ROUTES = () => {
  const isLoggedIn = useSelector((state) => state?.login?.isLoggedIn);

  console.log({isLoggedIn})

  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    // add token
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default PROTECTED_ROUTES;
