import VerifyDocumentPage from "../pages/Document/VerifyDocumentPage";
import OrgDashBoard from "../pages/dashboard/organization/OrgDashBoard";

const OrgDashBoardRoute = {
  link: "/org/dashboard",
  element: <OrgDashBoard />,
  isProtected: true
};

const VerifyDocumentPageRoute = {
  link: "/org/verifydocument",
  element: <VerifyDocumentPage />,
  isProtected: true
};

export const ORG_ROUTES = [OrgDashBoardRoute, VerifyDocumentPageRoute];
