import { FC } from "react";
import { Outlet } from "react-router-dom";

//style
import { Page } from "App/style/App.style";
import Navbar from "Components/Navbar/Navbar.component";

const OutletPage: FC<{}> = () => {
  return (
    <>
      <Page>
        <Navbar/>
        <Outlet />
      </Page>
    </>
  );
};

export default OutletPage;
