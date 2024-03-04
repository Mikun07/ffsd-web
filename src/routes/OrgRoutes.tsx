import { lazy } from "react";
const VerifyDocumentPage = lazy(
  () => import("../pages/verifyDocuments/VerifyDocumentPage")
);
const OrgDashBoard = lazy(
  () => import("../pages/dashboard/organization/OrgDashBoard")
);
const ManageAccountPage = lazy(() => import("../pages/ManageAccountPage"));
const ManageDocumentPage = lazy(
  () => import("../pages/manageDocuments/ManageDocumentPage")
);
const ManageStaffPage = lazy(
  () => import("../pages/dashboard/organization/manageStaff/OrgManageStaff")
);
const ManageTransactionPage = lazy(
  () => import("../pages/transaction/ManageTransactionPage")
);
const ManageReferralsUserPage = lazy(
  () => import("../pages/dashboard/organization/manageReferrals/UserReferrals")
);
const ManageReferralsDocument = lazy(
  () => import("../pages/dashboard/organization/manageReferrals/ManageReferrals")
);

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
  link: "/org/document",
  element: <ManageDocumentPage />,
  isProtected: true,
};

const OrgManageTransactionPageRoute = {
  link: "/org/transaction",
  element: <ManageTransactionPage />,
  isProtected: true,
};

const ManageAccountRoute = {
  link: "/org/account",
  element: <ManageAccountPage />,
  isProtected: true,
};

const ManageStaffPageRoute = {
  link: "/org/staff",
  element: <ManageStaffPage />,
  isProtected: true,
};

const ManageReferralsUserPageRoute = {
  link: "/org/referrals",
  element: <ManageReferralsUserPage />,
  isProtected: true,
};
const ManageReferralsDocumentRoute = {
  link: "/org/referrals/documents",
  element: <ManageReferralsDocument />,
  isProtected: true,
};

export const ORG_ROUTES = [
  OrgDashBoardRoute,
  VerifyDocumentPageRoute,
  OrgManageDocumentRoute,
  ManageAccountRoute,
  OrgManageTransactionPageRoute,
  ManageStaffPageRoute,
  ManageReferralsUserPageRoute,
  ManageReferralsDocumentRoute,
];
