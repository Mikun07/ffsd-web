import { lazy } from "react";
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashBoard"))
const AdminVerifyDocumentPage = lazy(() => import("../pages/admin/verifyDocuments/VerifyDocumentPage"))
const AdminAccountPage = lazy(() => import("../pages/admin/AdminAccountPage"))
const AdminArchivePage = lazy(() => import("../pages/admin/AdminArchivePage"))
const AdminManageUserPage = lazy(() => import("../pages/admin/ManageUserPage"))
const AdminReceiptsPage = lazy(() => import("../pages/admin/AdminReceiptsPage"))
const AdminManageAccountPage = lazy(() => import("../pages/admin/ManageUserPage")) 
const AdminMangeDocumentPage = lazy(() => import("../pages/admin/manageDocuments/AdminManageDocumentPage"))


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

const AdminManageUserPageRoute = {
  link: "/admin/manageuser",
  element: <AdminManageUserPage />,
  isAdminProtected: true,
};

const AdminReceiptsPageRoute = {
  link: "/admin/receipts",
  element: <AdminReceiptsPage />,
  isAdminProtected: true,
};

const AdminVerifyDocumentPageRoute = {
  link: "/admin/verifydocument",
  element: <AdminVerifyDocumentPage />,
  isAdminProtected: true,
};

const AdminManageAccountPageRoute = {
  link: "/admin/account",
  element: <AdminManageAccountPage />,
  isAdminProtected: true,
}

const AdminManageDocumentPageRoute = {
  link: "/admin/managedocument",
  element: <AdminMangeDocumentPage />,
  isAdminProtected: true,
}

export const ADMIN_ROUTES = [
  AdminDashBoardRoute,
  AdminArchivePageRoute,
  AdminAccountPageRoute,
  AdminManageUserPageRoute,
  AdminReceiptsPageRoute,
  AdminVerifyDocumentPageRoute,
  AdminManageAccountPageRoute,
  AdminManageDocumentPageRoute,
];
