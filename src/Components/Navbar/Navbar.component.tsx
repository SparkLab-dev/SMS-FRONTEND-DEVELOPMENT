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

//mui-icons
import MenuIcon from "@mui/icons-material/Menu";

//redux
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const Navbar: FC<{}> = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("shop");
  const Shop = require("./assets/AccountIcon.png") as string;

  //get userRole from redux
  const userRole = useSelector((state: RootState) => state.login.user?.role);
  console.log(userRole);
  const isLoggedIn = !!userRole;

  //logout call
  const handleLogout = (): void => {
    try {
      localStorage.clear();
      navigate("/login");
      // window.location.reload();
      console.log("LocalStorage cleared successfully.");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Header>
      <NavLink to="/">
        <NavbarLogo>
          <NavImage src={Shop} alt="shop-photo" />
          <LogoName>SMS</LogoName>
        </NavbarLogo>
      </NavLink>
      <UnorderedList>
        {userRole === "ADMIN" && (
          <>
            <NavLink to="/home" onClick={() => setMenu("shop")}>
              <ListItem>Home{menu === "shop" ? <HR /> : <></>}</ListItem>
            </NavLink>
            <NavLink
              to="/adminNotification"
              onClick={() => setMenu("notification")}
            >
              <ListItem>
                Notification{menu === "notification" ? <HR /> : <></>}
              </ListItem>
            </NavLink>
            <NavLink to="/vendorTable" onClick={() => setMenu("vendor")}>
              <ListItem>Vendor{menu === "vendor" ? <HR /> : <></>}</ListItem>
            </NavLink>
          </>
        )}

        {userRole === "EMPLOYEE" && (
          <>
            <NavLink to="/orderTable" onClick={() => setMenu("orderTable")}>
              <ListItem>
                Order Table{menu === "orderTable" ? <HR /> : <></>}
              </ListItem>
            </NavLink>
            <NavLink to="/table" onClick={() => setMenu("bicycle")}>
              <ListItem>
                Product table{menu === "bicycle" ? <HR /> : <></>}
              </ListItem>
            </NavLink>
            <NavLink to="/createCategory" onClick={() => setMenu("category")}>
              <ListItem>
                Category{menu === "category" ? <HR /> : <></>}
              </ListItem>
            </NavLink>
          </>
        )}
        {userRole === "CUSTOMER" && (
          <NavLink to="/home" onClick={() => setMenu("shop")}>
            <ListItem>Home{menu === "shop" ? <HR /> : <></>}</ListItem>
          </NavLink>
        )}
      </UnorderedList>
      {/* <div style={{ display: "flex" }}>
        <MenuIcon />
      </div> */}
      <NavLoginCart>
        {isLoggedIn ? (
          <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
        ) : (
          <LogoutButton onClick={handleLogin}>Log in</LogoutButton>
        )}
        <ShoppingCart style={{ fontSize: "30px" }} />
        <NavCartCount>0</NavCartCount>
      </NavLoginCart>
    </Header>
  );
};

export default Navbar;
