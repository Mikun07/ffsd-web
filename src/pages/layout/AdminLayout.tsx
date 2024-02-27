import React from "react";
import Header from "../../components/header/Header";
import AdminSidebar from "../admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import BGPattern from "../../assets/BG-pattern.png";


function AdminLayout() {
  return (
    <>
      <div className="flex w-screen h-screen overflow-hidden">
        <div className="flex h-full">
          <AdminSidebar />
        </div>
        <div className="flex flex-col w-full h-screen">
          <Header />
          <div className="h-screen overflow-hidden py-2 lg:px-4 px-2"
             // style={{
            //   backgroundImage: `url(${BGPattern})`,
            //   backgroundSize: "contain",
            //   backgroundAttachment: "fixed",
            // }}
            >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
