import React from "react";
import Header from "../../../components/header/Header";
import AdminSidebar from "./AdminSidebar";
import AdminDashBoard from "./AdminDashBoard";
import { Outlet } from "react-router-dom";
import useScreenSize from "../../../hooks/useScreenSize";

function AdminLayout() {
  const { width } = useScreenSize();
  return (
    <>
      <div className="flex w-screen h-screen overflow-hidden">
        <div className="overflow-hidden flex h-full">
          <AdminSidebar />
        </div>
        <div className="w-full flex-1 px-1 flex-col h-full overflow-hidden">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
