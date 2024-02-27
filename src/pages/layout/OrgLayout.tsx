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
        <div className="flex flex-col w-full h-screen">
          <Header />
          <div className="h-screen overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrgLayout;
