import { lazy } from "react";
const DashBoard = lazy(() => import("../pages/dashboard/user/UserDashBoard"))
const VerifyDocumentPage = lazy(() => import("../pages/Document/VerifyDocumentPage"))
const ManageAccountPage = lazy(() => import("../pages/ManageAccountPage")) 


const DashBoardRoute = {
    link: "/dashboard",
    element: <DashBoard />,
    isProtected: true,
  };

const VerifyDocumentPageRoute = {
    link: "/dashboard/verifydocument",
    element: <VerifyDocumentPage />,
    isProtected: true,
  };

  const ManageAccountRoute = {
    link: "/dashboard/account",
    element: <ManageAccountPage />,
    isProtected: true,
  }

  export const INDIVIDUAL_ROUTES = [
    VerifyDocumentPageRoute,
    ManageAccountRoute,
    DashBoardRoute
  ];