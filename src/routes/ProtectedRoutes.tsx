/* eslint-disable */
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router-dom";
import { userToken } from "../config/auth";
import { RootState } from "../types/redux/root";

const PROTECTED_ROUTES = () => {
  const isLoggedIn = useSelector((state: RootState) => state?.login?.isLoggedIn) || !!userToken;  // eslint-disable-next-line

  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default PROTECTED_ROUTES;