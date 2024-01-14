import VerifyDocumentPage from "../pages/Document/VerifyDocumentPage";
import OrgDashBoard from "../pages/dashboard/organization/OrgDashBoard";
import OrgManageDocument from "../pages/dashboard/organization/OrgManageDocument";

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
  element: <OrgManageDocument />,
  isProtected: true,
};

export const ORG_ROUTES = [
  OrgDashBoardRoute,
  VerifyDocumentPageRoute,
  OrgManageDocumentRoute,
];
