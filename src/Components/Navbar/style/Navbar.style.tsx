import styled from "styled-components";

//react-router-dom
import { Link } from "react-router-dom";

//mui-icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-around;
  padding: 16px;
  align-items: center;
  background-color: #fff;
  color: #000000;
  width: 100%;
  height: 55px;
  box-shadow: 0 1px 3px -2px black;
`;
export const NavbarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const NavImage = styled.img`
  width: 55px;
  height: 55px;
`;
export const LogoName = styled.p`
  font-family: "Poppins";
  font-weight: 600;
  font-size: 32px;
  color: black;
`;

export const UnorderedList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  /* margin-left: 20px; */
`;
export const HR = styled.hr`
  border: none;
  width: 80%;
  height: 3px;
  border-radius: 10x;
  background-color: #0e53c5;
`;

export const ListItem = styled.li`
  margin-right: 35px;
  font-size: 20px;
  font-weight: 600;
  gap: 3px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 8px 12px;
  border-radius: 4px;
  gap: 3px;
  font-weight: 400;
  font-family: "Poppins";
  cursor: pointer;
`;
export const NavLoginCart = styled.div`
  display: flex;
  align-items: center;
  gap: 45px;
`;
export const LogoutButton = styled.button`
  width: 110px;
  height: 45px;
  outline: none;
  border: 1px solid #7a7a7a;
  border-radius: 75px;
  color: #515151;
  font-size: 18px;
  font-weight: 500;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
  }
`;

export const ShoppingCart = styled(ShoppingCartIcon)`
  font-size: large;
`;
export const NavCartCount = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 12px;
  margin-top: -25px;
  margin-left: -52px;
  border-radius: 14px;
  background-color: red;
  color: white;
`;
