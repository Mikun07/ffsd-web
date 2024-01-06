import React from "react";
import AdminDashBoard from "../pages/dashboard/admin/AdminDashBoard";
import VerifyDocumentPage from "../pages/Document/VerifyDocumentPage"
import AdminAccountPage from "../pages/dashboard/admin/AdminAccountPage";
import AdminArchivePage from "../pages/dashboard/admin/AdminArchivePage";
import ManageUserPage from "../pages/dashboard/admin/ManageUserPage";
import AdminReceiptsPage from "../pages/dashboard/admin/AdminReceiptsPage";

const AdminDashBoardRoute = {
  link: "/admin/dashboard",
  element: <AdminDashBoard />,
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

export const ADMIN_ROUTES = [
  AdminDashBoardRoute,
  AdminArchivePageRoute,
  AdminAccountPageRoute,
  ManageUserPageRoute,
  AdminReceiptsPageRoute,
  VerifyDocumentPageRoute
];
