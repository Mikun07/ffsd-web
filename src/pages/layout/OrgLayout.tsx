import React from "react";
import OrgSidebar from "../dashboard/organization/OrgSidebar";
import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";

function OrgLayout() {
  return (
    <>
      <div className="flex w-screen h-screen overflow-hidden">
        <div className="flex h-full">
          <OrgSidebar />
        </div>
        <div className="w-full flex-1 flex-col overflow-hidden">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default OrgLayout;
