import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./pages/layout/AdminLayout";
import { ADMIN_ROUTES } from "./routes/AdminRoutes";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import OrgLayout from "./pages/layout/OrgLayout";
import { PUBLIC_ROUTES } from "./routes/PublicRoutes";
import { ORG_ROUTES } from "./routes/OrgRoutes";
import PROTECTED_ROUTES from "./routes/ProtectedRoutes";
import ErrorBoundary from "./pages/ErrorBoundary";

function App() {
  return (
    <>
      <Router>
        {/* <ErrorBoundary> */}
          <Routes>
            {PUBLIC_ROUTES.map(({ link, element }, index) => (
              <Route path={link} element={element} key={index} />
            ))}
            {/* <Route element={<PROTECTED_ROUTES />}> */}
              <Route path="admin" element={<AdminLayout />}>
                {ADMIN_ROUTES.map(({ link, element }, index) => (
                  <Route path={link} element={element} key={index} />
                ))}
              </Route>
              <Route path="org" element={<OrgLayout />}>
                {ORG_ROUTES.map(({ link, element }, index) => (
                  <Route path={link} element={element} key={index} />
                ))}
              </Route>
            {/* </Route> */}
          </Routes>
        {/* </ErrorBoundary> */}
      </Router>
      <Toaster />
    </>
  ); 
}

export default App;
