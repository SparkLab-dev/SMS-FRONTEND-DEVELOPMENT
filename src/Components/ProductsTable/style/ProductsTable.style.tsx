import { Link } from "react-router-dom";
import styled from "styled-components";

export const TableAndDatepickerHolder = styled.div`
  width: 100%;
  height: 80%;
`;
export const TableContainer = styled.div`
  width: 100%;
  height: 80%;
  overflow-x: auto;
  position: relative;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #cfdeff;
  font-family: "Poppins";
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #cfdeffa1;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #3746673b;
  text-align: center;
  padding: 6px;
  font-family: "Poppins";
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const EditButton = styled.button`
  background-color: #3746673b;
  border-radius: 5px;
  color: Black;
  border: none;
  font-weight: 500;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  font-family: "Poppins";
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
`;
export const IconLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
export const H2 = styled.h2`
  font-size: 30px;
  font-family: "Poppins";
  color: #0e53c5;
`;
export const AddNewProductButton = styled.div`
  height: fit-content;
`;
export const AddProductNameContainerPlusIcon = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const ButtonName = styled.p`
  margin: 5px;
`;

export const InputsOfProductTable = styled.div`
  display: "flex";
`;
export const ProductInputHold = styled.div`
  flex: 1;
  margin: 5px;
`;
