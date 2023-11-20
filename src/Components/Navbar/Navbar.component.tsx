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
import { useNavigate } from "react-router";

const Navbar: FC<{}> = () => {
  const navigate=useNavigate()
  const [menu, setMenu] = useState("shop");
  const Shop = require("./assets/shop.png") as string;

  //logout call
  const logout = (): void => {
    try {
      localStorage.clear();
      navigate("/login")
      // window.location.reload();
      console.log("localStorage cleared successfully.");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };
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
        <NavLink to="/resetpassword" onClick={() => setMenu("cellphone")}>
          <ListItem>
            Reset Password{menu === "cellphone" ? <HR /> : <></>}
          </ListItem>
        </NavLink>
      </UnorderedList>
      <LogoutButton onClick={logout}>Log out</LogoutButton>
    </Header>
  );
};

export default Navbar;
