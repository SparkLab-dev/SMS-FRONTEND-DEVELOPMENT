import { FC } from "react";
import { Outlet } from "react-router-dom";

//style
import { Page } from "App/style/App.style";

const OutletPage: FC<{}> = () => {
  return (
    <>
      <Page>
        <Outlet />
      </Page>
    </>
  );
};

export default OutletPage;
