import { FC, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

//style
import { Page } from "App/style/App.style";

//components
import Navbar from "Components/Navbar/Navbar.component";
import SideBar from "statics/sidebar/Sidebar.component";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Login from "Pages/Authentication/Login/Login.component";

const OutletPage: FC<{}> = () => {
  //get userRole from redux
  const userRole = useSelector((state: RootState) => state.login.user?.role);
  console.log(userRole);
  const isLoggedIn = !!userRole;

  const location = useLocation();
  const showOpeningPage = location.pathname === "/";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Page>
      {isLoggedIn && <Navbar toggleSidebar={toggleSidebar} />}
      {showOpeningPage && <Login />}
      <SideBar isOpen={sidebarOpen} closeSidebar={toggleSidebar} />
      <Outlet />
    </Page>
  );
};

export default OutletPage;
