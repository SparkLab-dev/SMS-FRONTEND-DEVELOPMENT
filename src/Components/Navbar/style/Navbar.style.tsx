import styled from "styled-components";

//react-router-dom
import { Link } from "react-router-dom";

export const Header = styled.header`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  align-items: center;
  /* background-color: #0e53c5; */
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

export const LogoutButton = styled.button`
  /* background-color: #ffff; */
  background-color: #0e53c5;
  /* color: black; */
  color: #ffff;
  border: 1px solid;
  border-color: #ffff;
  padding: 8px 26px;
  margin-right: 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    background-color: #cfdeff;
  }
`;
