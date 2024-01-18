import React from "react";
import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";
import UserSidebar from "../dashboard/user/UserSidebar";

function UserLayout() {
  return (
    <>
      <div className="flex w-screen h-screen overflow-hidden">
        <div className="flex h-full">
          <UserSidebar />
        </div>
        <div className="w-full flex-1 flex-col overflow-hidden">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserLayout;
