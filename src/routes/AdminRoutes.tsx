import { lazy } from "react";
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashBoard"))
const AdminVerifyDocumentPage = lazy(() => import("../pages/admin/verifyDocuments/AdminVerifyDocumentPage"))
const AdminAccountPage = lazy(() => import("../pages/admin/AdminAccountPage"))
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

const AdminArchiveDocumentPageRoute = {
  link: "/admin/managedocument/archived",
  element: <AdminArchiveDocumentPage />,
  isAdminProtected: true,
};

const AdminQueriedDocumentPageRoute = {
  link: "/admin/managedocument/queried",
  element: <AdminQueriedDocumentPage />,
  isAdminProtected: true,
};

const AdminSubmittedDocumentPageRoute = {
  link: "/admin/managedocument/submitted",
  element: <AdminSubmittedDocumentPage />,
  isAdminProtected: true,
};

const AdminVerifiedDocumentPageRoute = {
  link: "/admin/managedocument/verified",
  element: <AdminVerifiedDocumentPage />,
  isAdminProtected: true,
};

const AdminGetDocumentByIdRoute = {
  link: "/admin/managedocument/document/:type/:id/:owner",
  element: <AdminGetDocumentById />,
  isAdminProtected: true,
}

const AdminManageOrganizationUserRoute = {
  link: "/admin/manageuser/organization",
  element: <AdminManageOrganizationUser />,
  isAdminProtected: true,
}

const AdminManageAdminUserRoute = {
  link: "/admin/manageuser/admin",
  element: <AdminManageAdminUser />,
  isAdminProtected: true,
}

const AdminManageIndividualUserRoute = {
  link: "/admin/manageuser/individual",
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
  AdminVerifyDocumentPageRoute,
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
];
