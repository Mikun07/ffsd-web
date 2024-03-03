import { lazy } from "react";
const DashBoard = lazy(() => import("../pages/dashboard/user/UserDashBoard"));
const VerifyDocumentPage = lazy(
  () => import("../pages/verifyDocuments/VerifyDocumentPage")
);
const ManageAccountPage = lazy(() => import("../pages/ManageAccountPage"));
const ManageDocumentPage = lazy(
  () => import("../pages/manageDocuments/ManageDocumentPage")
);
const ManageTransactionPage = lazy(
  () => import("../pages/transaction/ManageTransactionPage")
);

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
};
const ManageDocumentRoute = {
  link: "/dashboard/document",
  element: <ManageDocumentPage />,
  isProtected: true,
};

const ManageTransactionPageRoute = {
  link: "/dashboard/transaction",
  element: <ManageTransactionPage />,
  isProtected: true,
};

export const INDIVIDUAL_ROUTES = [
  VerifyDocumentPageRoute,
  ManageAccountRoute,
  DashBoardRoute,
  ManageDocumentRoute,
  ManageTransactionPageRoute,
];
