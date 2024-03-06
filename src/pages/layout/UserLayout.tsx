import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";
import UserSidebar from "../dashboard/user/UserSidebar";

function UserLayout() {
  return (
    <>
      <div className="flex overflow-hidden w-full h-screen">
        <div>
          <UserSidebar />
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

export default UserLayout;
