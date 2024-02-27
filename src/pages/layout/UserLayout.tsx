import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";
import UserSidebar from "../dashboard/user/UserSidebar";
import BGPattern from "../../assets/BG-pattern.png";

function UserLayout() {
  return (
    <>
      <div className="flex w-screen h-screen overflow-hidden">
        <div className="flex h-full">
          <UserSidebar />
        </div>
        <div className="flex flex-col w-full h-screen">
          <Header />
          <div
            className="h-screen overflow-hidden"
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

export default UserLayout;
