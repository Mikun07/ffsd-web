import React from "react";
import Header from "../../components/header/Header";
import AdminSidebar from "../dashboard/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <div className="flex w-screen h-screen overflow-hidden">
        <div className="flex h-full">
          <AdminSidebar />
        </div>
        <div className="w-full flex-1 mx-1 flex-col overflow-hidden">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
