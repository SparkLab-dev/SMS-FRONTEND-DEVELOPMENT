import { FC, useState } from "react";
import { useNavigate } from "react-router";

//style
import {
  Header,
  LogoName,
  LogoutButton,
  NavLoginCart,
  NavbarLogo,
} from "./style/Navbar.style";

//mui icons
import MenuIcon from "@mui/icons-material/Menu";
import StoreIcon from "@mui/icons-material/Store";

//redux
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: FC<NavbarProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("shop");
  const [showMenu, setShowMenu] = useState(false);
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
   
          <div style={{ display: "flex", cursor: "pointer" }}>
          {isLoggedIn ? (
            <MenuIcon
              onClick={toggleSidebar}
              fontSize="large"
              style={{ marginTop: "2px", paddingLeft: "10px" }}
            />):("")}
            <NavbarLogo>
              {/* <NavImage src={Shop} alt="shop-photo" /> */}
              <StoreIcon
                style={{
                  marginTop: "2px",
                  paddingLeft: "10px",
                  color: "#0e53c5",
                }}
                fontSize="large"
              />
              <LogoName>SMS</LogoName>
            </NavbarLogo>
          </div>
          <NavLoginCart>
            {isLoggedIn ? (
              <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
            ) : (
              <LogoutButton onClick={handleLogin}>Log in</LogoutButton>
            )}
            {/* <ShoppingCart style={{ fontSize: "30px" }} />
        <NavCartCount>0</NavCartCount> */}
          </NavLoginCart>
  
    </Header>
  );
};

export default Navbar;
