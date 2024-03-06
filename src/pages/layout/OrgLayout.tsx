import React from "react";
import OrgSidebar from "../dashboard/organization/OrgSidebar";
import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";

function OrgLayout() {
  return (
    <>
      <div className="flex overflow-hidden w-full h-screen">
        <div>
          <OrgSidebar />
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

export default OrgLayout;
