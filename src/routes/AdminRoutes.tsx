import { lazy } from "react";
const AdminDashboard = lazy(() => import("../pages/admin/adminDashboard/AdminDashBoard"))
const AdminAccountPage = lazy(() => import("../pages/ManageAccountPage"))
const AdminArchiveDocumentPage = lazy(() => import("../pages/admin/manageDocuments/AdminArchiveDocumentPage"))
const AdminQueriedDocumentPage = lazy(() => import("../pages/admin/manageDocuments/AdminQueriedDocumentPage"))
const AdminSubmittedDocumentPage = lazy(() => import("../pages/admin/manageDocuments/AdminSubmittedDocumentPage"))
const AdminVerifiedDocumentPage = lazy(() => import("../pages/admin/manageDocuments/AdminVerifiedDocumentPage"))
const AdminManageUserPage = lazy(() => import("../pages/admin/AdminManageUserPage"))
const AdminReceiptsPage = lazy(() => import("../pages/admin/AdminReceiptsPage"))
const AdminManageAccountPage = lazy(() => import("../pages/admin/AdminManageUserPage")) 
const AdminMangeDocumentPage = lazy(() => import("../pages/admin/manageDocuments/AdminManageDocumentPage"))
const AdminGetDocumentById = lazy(() => import("../pages/admin/manageDocuments/shared/PreviewData"))
const AdminManageOrganizationUser = lazy(() => import("../pages/admin/adminManageUser/organizations/OrganizationUser"))
const AdminManageAdminUser = lazy(() => import("../pages/admin/adminManageUser/admin/AdminUser"))
const AdminManageIndividualUser = lazy(() => import("../pages/admin/adminManageUser/individual/IndividualUser"))
const ServiceCharge = lazy(() => import("../pages/admin/charges/ServiceCharge"))
const SurCharge = lazy(() => import("../pages/admin/charges/Surcharge"))
const AdminManageTransactionPage = lazy(
  () => import("../pages/admin/transaction/ManageTransactionPage")
);

const AdminDashBoardRoute = {
  link: "/admin/dashboard",
  element: <AdminDashboard />,
  isAdminProtected: true,
};

const AdminAccountPageRoute = {
  link: "/admin/account",
  element: <AdminAccountPage />,
  isAdminProtected: true,
};

const AdminManageUserPageRoute = {
  link: "/admin/user",
  element: <AdminManageUserPage />,
  isAdminProtected: true,
};

const AdminReceiptsPageRoute = {
  link: "/admin/receipts",
  element: <AdminReceiptsPage />,
  isAdminProtected: true,
};

const AdminManageTransactionPageRoute = {
  link: "/admin/transaction",
  element: <AdminManageTransactionPage />,
  isProtected: true,
};

const AdminManageAccountPageRoute = {
  link: "/admin/account",
  element: <AdminManageAccountPage />,
  isAdminProtected: true,
}

const AdminManageDocumentPageRoute = {
  link: "/admin/document",
  element: <AdminMangeDocumentPage />,
  isAdminProtected: true,
}

const AdminArchiveDocumentPageRoute = {
  link: "/admin/document/archived",
  element: <AdminArchiveDocumentPage />,
  isAdminProtected: true,
};

const AdminQueriedDocumentPageRoute = {
  link: "/admin/document/queried",
  element: <AdminQueriedDocumentPage />,
  isAdminProtected: true,
};

const AdminSubmittedDocumentPageRoute = {
  link: "/admin/document/submitted",
  element: <AdminSubmittedDocumentPage />,
  isAdminProtected: true,
};

const AdminVerifiedDocumentPageRoute = {
  link: "/admin/document/verified",
  element: <AdminVerifiedDocumentPage />,
  isAdminProtected: true,
};

const AdminGetDocumentByIdRoute = {
  link: "/admin/document/document/:type/:id/:owner",
  element: <AdminGetDocumentById />,
  isAdminProtected: true,
}

const AdminManageOrganizationUserRoute = {
  link: "/admin/user/organization",
  element: <AdminManageOrganizationUser />,
  isAdminProtected: true,
}

const AdminManageAdminUserRoute = {
  link: "/admin/user/admin",
  element: <AdminManageAdminUser />,
  isAdminProtected: true,
}

const AdminManageIndividualUserRoute = {
  link: "/admin/user/individual",
  element: <AdminManageIndividualUser />,
  isAdminProtected: true,
}

const ServiceChargeRoute = {
  link: "/admin/servicecharge",
  element: <ServiceCharge />,
  isAdminProtected: true,
}
const SurChargeRoute = {
  link: "/admin/surcharge",
  element: <SurCharge />,
  isAdminProtected: true,
}

export const ADMIN_ROUTES = [
  AdminDashBoardRoute,
  AdminArchiveDocumentPageRoute,
  AdminAccountPageRoute,
  AdminManageUserPageRoute,
  AdminReceiptsPageRoute,
  AdminManageAccountPageRoute,
  AdminManageDocumentPageRoute,
  AdminQueriedDocumentPageRoute,
  AdminSubmittedDocumentPageRoute,
  AdminGetDocumentByIdRoute,
  AdminManageOrganizationUserRoute,
  ServiceChargeRoute,
  AdminManageAdminUserRoute,
  AdminManageIndividualUserRoute,
  SurChargeRoute,
  AdminVerifiedDocumentPageRoute,
  AdminManageTransactionPageRoute,
];
