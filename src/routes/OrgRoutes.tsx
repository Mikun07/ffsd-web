import { lazy } from "react";
const VerifyDocumentPage = lazy(() => import("../pages/verifyDocuments/VerifyDocumentPage"))
const OrgDashBoard = lazy(() => import("../pages/dashboard/organization/OrgDashBoard"))
const ManageAccountPage = lazy(() => import("../pages/ManageAccountPage")) 
const ManageDocumentPage = lazy(() => import("../pages/manageDocuments/ManageDocumentPage"))
const DocumentDetails =lazy(() => import("../pages/manageDocuments/shared/PreviewData"))

const OrgDashBoardRoute = {
  link: "/org/dashboard",
  element: <OrgDashBoard />,
  isProtected: true,
};

const VerifyDocumentPageRoute = {
  link: "/org/verifydocument",
  element: <VerifyDocumentPage />,
  isProtected: true,
};

const OrgManageDocumentRoute = {
  link: "/org/managedocument",
  element: <ManageDocumentPage />,
  isProtected: true,
};

const OrgManageDocumentDetailsRoute = {
  link: "/org/managedocument/details/:id",
  element: <DocumentDetails />,
  isProtected: true,
};

const ManageAccountRoute = {
  link: "/org/account",
  element: <ManageAccountPage />,
  isProtected: true,
}


export const ORG_ROUTES = [
  OrgDashBoardRoute,
  VerifyDocumentPageRoute,
  OrgManageDocumentRoute,
  ManageAccountRoute,
  OrgManageDocumentDetailsRoute,
];
