import styled from "styled-components";

//mui-icons
import EditIcon from "@mui/icons-material/Edit";

export const OrderDetailsContentHolder = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px 0 17px 0;
`;

export const OrderDetailsHolder = styled.div`
  width: 100%;
  max-width: 1300px;
  box-shadow: 3px 3px 15px 5px rgb(0 0 0 / 15%);
  border-radius: 10px;
  background-color: #ffff;
  overflow: scroll;
  height: fit-content;
  overflow-x: auto;
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const OrderDetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;
export const OrdersTableHead = styled.thead`
  text-align: left;
`;
export const OrdersHead = styled.th`
  border-bottom: 1px solid #ccc;
  padding: 8px;
`;
export const OrdersTableBody = styled.tbody`
  text-align: left;
`;
export const OrdersTableRow = styled.tr``;
export const OrdersTableData = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 8px;
`;
export const OrderActionTableData = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 8px;
  display: flex;
`;
export const DeleteIconInOrdersHolder = styled.div`
  font-size: 30px;
  text-align: left;
  cursor: pointer;
`;
export const OrderEditButton = styled.button`
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
export const EditOrderIconMui = styled(EditIcon)`
  cursor: pointer;
  padding: 4px;
  color: #1976d2;
`;
export const EditOrderTableName = styled.p`
  font-family: "Poppins";
  color: #0e53c5;
  font-size: 27px;
  margin: 10px 0;
`;
