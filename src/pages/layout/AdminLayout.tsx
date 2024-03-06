import Header from "../../components/header/Header";
import AdminSidebar from "../admin/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <div className="flex overflow-hidden w-full h-screen">
        <div>
          <AdminSidebar />
        </div>
        <div className="flex flex-col w-full overflow-hidden">
          <div>
            <Header />
          </div>
          <div className="overflow-hidden h-screen px-2">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
