import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router-dom";
import { userToken } from "../config/auth";
import { RootState } from "../types/redux/root";

const ADMIN_PROTECTED = () => {
  const isAdminLoggedIn =
    useSelector((state: RootState) => state?.adminLogin?.isAdminLoggedIn) ||
    !!userToken;

  const location = useLocation();
  if (isAdminLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login/admin"} state={{ from: location }} replace />;
  }
};

export default ADMIN_PROTECTED;
