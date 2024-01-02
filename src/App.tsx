import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/Registration/RegisterPage";
import AdminLayout from "./pages/dashboard/admin/AdminLayout";
import AdminRoutes from "./routes/AdminRoutes";
import { authToken } from "./config/auth";
import AdminDashBoard from "./pages/dashboard/admin/AdminDashBoard";
import AdminAccountPage from "./pages/dashboard/admin/AdminAccountPage";
import AdminArchivePage from "./pages/dashboard/admin/AdminArchivePage";
import ManageUserPage from "./pages/dashboard/admin/ManageUserPage";
import AdminReceiptsPage from "./pages/dashboard/admin/AdminReceiptsPage";
import ForgotPassword from "./pages/authentication/ForgotPassword/ForgotPasswordPage";
import { Toaster } from "react-hot-toast";
import OTPPage from "./pages/authentication/OTPPage";
import OrgDashBoard from "./pages/dashboard/organization/OrgDashBoard";
import OrgLayout from "./pages/dashboard/organization/OrgLayout";
// const ProtectedRoutes = () => {
//   return authToken ? <Outlet /> : <Navigate to="/login" />;
// };

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/signup/otp" element={<OTPPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashBoard />} />
            <Route path="/admin/account" element={<AdminAccountPage />} />
            <Route
              path="/admin/manageverification"
              element={<AdminArchivePage />}
            />
            <Route path="/admin/manageuser" element={<ManageUserPage />} />
            <Route path="/admin/receipts" element={<AdminReceiptsPage />} />
          </Route>

          <Route path="org" element={<OrgLayout />}>
            <Route path="/org/dashboard" element={<OrgDashBoard />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
