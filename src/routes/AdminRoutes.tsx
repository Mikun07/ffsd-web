import { lazy } from "react";
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashBoard"))
const AdminVerifyDocumentPage = lazy(() => import("../pages/admin/verifyDocuments/VerifyDocumentPage"))
const AdminAccountPage = lazy(() => import("../pages/admin/AdminAccountPage"))
const AdminArchivePage = lazy(() => import("../pages/admin/AdminArchivePage"))
const ManageUserPage = lazy(() => import("../pages/admin/ManageUserPage"))
const AdminReceiptsPage = lazy(() => import("../pages/admin/AdminReceiptsPage"))
const ManageAccountPage = lazy(() => import("../pages/admin/ManageUserPage")) 


const AdminDashBoardRoute = {
  link: "/admin/dashboard",
  element: <AdminDashboard />,
  isAdminProtected: true,
};

const AdminArchivePageRoute = {
  link: "/admin/manageverification",
  element: <AdminArchivePage />,
  isAdminProtected: true,
};

const AdminAccountPageRoute = {
  link: "/admin/account",
  element: <AdminAccountPage />,
  isAdminProtected: true,
};

const ManageUserPageRoute = {
  link: "/admin/manageuser",
  element: <ManageUserPage />,
  isAdminProtected: true,
};

const AdminReceiptsPageRoute = {
  link: "/admin/receipts",
  element: <AdminReceiptsPage />,
  isAdminProtected: true,
};

const VerifyDocumentPageRoute = {
  link: "/admin/verifydocument",
  element: <AdminVerifyDocumentPage />,
  isAdminProtected: true,
};

const ManageAccountRoute = {
  link: "/admin/account",
  element: <ManageAccountPage />,
  isAdminProtected: true,
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
