import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./pages/layout/AdminLayout";
import { ADMIN_ROUTES } from "./routes/AdminRoutes";
import { Toaster } from "react-hot-toast";
import OrgLayout from "./pages/layout/OrgLayout";
import { PUBLIC_ROUTES } from "./routes/PublicRoutes";
import { ORG_ROUTES } from "./routes/OrgRoutes";
import PROTECTED_ROUTES from "./routes/ProtectedRoutes";
import ErrorBoundary from "./components/withStatus/error/ErrorBoundary";
import { Suspense } from "react";
import Loading from "./components/withStatus/loading/Loading";
import UserLayout from "./pages/layout/UserLayout";
import { INDIVIDUAL_ROUTES } from "./routes/IndividualRoutes";
import ADMIN_PROTECTED from "./routes/AdminProtected";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {PUBLIC_ROUTES.map(({ link, element }, index) => (
            <Route path={link} element={element} key={index} />
          ))}

          {/* admin routes */}
          {/* <Route element={<ADMIN_PROTECTED />}> */}
            <Route path="admin" element={<AdminLayout />}>
              {ADMIN_ROUTES.map(({ link, element }, index) => (
                <Route
                  path={link}
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<Loading />}>{element}</Suspense>
                    </ErrorBoundary>
                  }
                  key={index}
                />
              ))}
            </Route>
          {/* </Route> */}

          {/* Individual and Organization routes */}
          <Route element={<PROTECTED_ROUTES />}>
            <Route path="org" element={<OrgLayout />}>
              {ORG_ROUTES.map(({ link, element }, index) => (
                <Route
                  path={link}
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<Loading />}>{element}</Suspense>
                    </ErrorBoundary>
                  }
                  key={index}
                />
              ))}
            </Route>
            <Route path="dashboard" element={<UserLayout />}>
              {INDIVIDUAL_ROUTES.map(({ link, element }, index) => (
                <Route
                  path={link}
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<Loading />}>{element}</Suspense>
                    </ErrorBoundary>
                  }
                  key={index}
                />
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
