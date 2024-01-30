import { lazy } from "react";
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashBoard"))
const VerifyDocumentPage = lazy(() => import("../pages/verifyDocuments/VerifyDocumentPage"))
const AdminAccountPage = lazy(() => import("../pages/admin/AdminAccountPage"))
const AdminArchivePage = lazy(() => import("../pages/admin/AdminArchivePage"))
const ManageUserPage = lazy(() => import("../pages/admin/ManageUserPage"))
const AdminReceiptsPage = lazy(() => import("../pages/admin/AdminReceiptsPage"))
const ManageAccountPage = lazy(() => import("../pages/ManageAccountPage")) 


const AdminDashBoardRoute = {
  link: "/admin/dashboard",
  element: <AdminDashboard />,
  isProtected: true
};

const AdminArchivePageRoute = {
  link: "/admin/manageverification",
  element: <AdminArchivePage />,
  isProtected: true
};

const AdminAccountPageRoute = {
  link: "/admin/account",
  element: <AdminAccountPage />,
  isProtected: true
};

const ManageUserPageRoute = {
  link: "/admin/manageuser",
  element: <ManageUserPage />,
  isProtected: true
};

const AdminReceiptsPageRoute = {
  link: "/admin/receipts",
  element: <AdminReceiptsPage />,
  isProtected: true
};

const VerifyDocumentPageRoute = {
  link: "/admin/verifydocument",
  element: <VerifyDocumentPage />,
  isProtected: true
};

const ManageAccountRoute = {
  link: "/admin/account",
  element: <ManageAccountPage />,
  isProtected: true,
}

export const ADMIN_ROUTES = [
  AdminDashBoardRoute,
  AdminArchivePageRoute,
  AdminAccountPageRoute,
  ManageUserPageRoute,
  AdminReceiptsPageRoute,
  VerifyDocumentPageRoute,
  ManageAccountRoute,
];
