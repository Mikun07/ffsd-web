import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import AdminLayout from "./pages/layout/AdminLayout";
import { ADMIN_ROUTES } from "./routes/AdminRoutes";
import toast, { Toaster } from "react-hot-toast";
import OrgLayout from "./pages/layout/OrgLayout";
import { PUBLIC_ROUTES } from "./routes/PublicRoutes";
import { ORG_ROUTES } from "./routes/OrgRoutes";
import { useEffect, useState } from "react";
import PROTECTED_ROUTES from "./routes/ProtectedRoutes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {PUBLIC_ROUTES.map(({ link, element }, index) => (
            <Route path={link} element={element} key={index} />
          ))}
          <Route element={<PROTECTED_ROUTES />}>
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
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
