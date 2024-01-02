import { Navigate, Routes, Route } from "react-router-dom";
import AdminDashBoard from "../pages/dashboard/admin/AdminDashBoard";
import AdminAccountPage from "../pages/dashboard/admin/AdminAccountPage";
import AdminArchivePage from "../pages/dashboard/admin/AdminArchivePage";
import ManageUserPage from "../pages/dashboard/admin/ManageUserPage";
import AdminReceiptsPage from "../pages/dashboard/admin/AdminReceiptsPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="Admin" />} />
      <Route path="admin/dashboard" element={<AdminDashBoard />} />
      <Route path="admin/account" element={<AdminAccountPage />} />
      <Route path="admin/archive" element={<AdminArchivePage />} />
      <Route path="admin/manageuser" element={<ManageUserPage />} />
      <Route path="admin/receipts" element={<AdminReceiptsPage />} />
    </Routes>
  );
};

export default AdminRoutes;
