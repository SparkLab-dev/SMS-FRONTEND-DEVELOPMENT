import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

//style
import { Page } from "App/style/App.style";

//components
import Navbar from "Components/Navbar/Navbar.component";
import OpeningPage from "Components/OpeningPage/OpeningPage.component";

const OutletPage: FC<{}> = () => {
  const location = useLocation();
  const showOpeningPage = location.pathname === "/";
  return (
    <>
      <Page>
        <Navbar />
        {showOpeningPage && <OpeningPage />}
        <Outlet />
      </Page>
    </>
  );
};

export default OutletPage;
