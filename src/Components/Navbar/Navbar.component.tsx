import { FC, useState } from "react";

//style
import {
  HR,
  Header,
  ListItem,
  LogoName,
  LogoutButton,
  NavImage,
  NavLink,
  NavbarLogo,
  UnorderedList,
} from "./style/Navbar.style";

const Navbar: FC<{}> = () => {
  const [menu, setMenu] = useState("shop");
  const Shop = require("./assets/shop.png") as string;
  return (
    <Header>
      <NavbarLogo>
        <NavImage src={Shop} alt="shop-photo" />
        <LogoName>SMS</LogoName>
      </NavbarLogo>
      <UnorderedList>
        <NavLink to="/login" onClick={() => setMenu("shop")}>
          <ListItem>Login{menu === "shop" ? <HR /> : <></>}</ListItem>
        </NavLink>
        <NavLink to="/register" onClick={() => setMenu("bicycle")}>
          <ListItem>Register{menu === "bicycle" ? <HR /> : <></>}</ListItem>
        </NavLink>
        <NavLink to="/newpassword" onClick={() => setMenu("cellphone")}>
          <ListItem>
            New Password{menu === "cellphone" ? <HR /> : <></>}
          </ListItem>
        </NavLink>
      </UnorderedList>
      <LogoutButton>Log out</LogoutButton>
    </Header>
  );
};

export default Navbar;
