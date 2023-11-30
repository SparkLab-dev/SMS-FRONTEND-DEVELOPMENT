import { FC, useState } from "react";
import { useNavigate } from "react-router";

//style
import {
  HR,
  Header,
  ListItem,
  LogoName,
  LogoutButton,
  NavCartCount,
  NavImage,
  NavLink,
  NavLoginCart,
  NavbarLogo,
  ShoppingCart,
  UnorderedList,
} from "./style/Navbar.style";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar: FC<{}> = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("shop");
  const Shop = require("./assets/shop.png") as string;

  //logout call
  const logout = (): void => {
    try {
      localStorage.clear();
      navigate("/login");
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
        <NavLink to="/home" onClick={() => setMenu("shop")}>
          <ListItem>Home{menu === "shop" ? <HR /> : <></>}</ListItem>
        </NavLink>
        <NavLink to="/table" onClick={() => setMenu("bicycle")}>
          <ListItem>
            Product table{menu === "bicycle" ? <HR /> : <></>}
          </ListItem>
        </NavLink>
        <NavLink to="/orderTable" onClick={() => setMenu("orderTable")}>
          <ListItem>
            Order Table{menu === "orderTable" ? <HR /> : <></>}
          </ListItem>
        </NavLink>
      </UnorderedList>
      <div style={{display:"flex"}}>
        <MenuIcon />
      </div>
      <NavLoginCart>
        <LogoutButton onClick={logout}>Log out</LogoutButton>
        <ShoppingCart style={{ fontSize: "30px" }} />
        <NavCartCount>0</NavCartCount>
      </NavLoginCart>
    </Header>
  );
};

export default Navbar;
