import styled from "styled-components";

export const PopularDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: auto;
`;
export const PopularText = styled.h1`
  color: #171717;
  font-size: 45px;
  font-weight: 400;
  font-family: "Poppins";
`;
export const Hr = styled.hr`
  width: 200px;
  height: 6px;
  border-radius: 10px;
  background-color: #171717;
`;
export const PopularItem = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  gap: 30px;
  justify-content: center;
`;
export const ItemHandler = styled.div`
  flex: 1 0 calc(25% - 30px); /* Four items per row with a gap of 30px */
  margin-bottom: 30px;
`;
export const CategoryName = styled.p`
  font-size: 17px;
  font-family: "Poppins";
  font-weight: 600;
`;
