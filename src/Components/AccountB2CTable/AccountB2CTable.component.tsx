import { FC, useEffect, useState } from "react";

import GenericButton from "Components/GenericButton/GenericButton.component";

//mui icons
import ForwardIcon from "@mui/icons-material/Forward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "Components/ProductsTable/style/ProductsTable.style";
import { TableBody } from "Components/OrdersTable/style/OrdersTable.style";
import {
  AccountTypeProps,
  fetchAccountDetails,
} from "redux/Pages/AccountType/AccountTypeSlice";
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  AccountB2CButtonName,
  AccountB2CTableContainer,
  AddAccountB2CNameContainerPlusIcon,
  AddNewAccountB2CButton,
} from "./style/AccountB2CTable.style";


const AccountB2CTable: FC<{}> = () => {
  const [accountB2C, setAccountB2C] = useState<AccountTypeProps[]>([]);

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  //get account B2B api
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(fetchAccountDetails());
        if (fetchAccountDetails.fulfilled.match(result)) {
          console.log(result);
          setAccountB2C(result.payload);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrderData();
  }, [dispatch]);
  const accountB2CButtonName = (
    <AddAccountB2CNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <AccountB2CButtonName>Add account</AccountB2CButtonName>
    </AddAccountB2CNameContainerPlusIcon>
  );
  return (
    <AccountB2CTableContainer>
      <AddNewAccountB2CButton>
        <GenericButton name={accountB2CButtonName} />
      </AddNewAccountB2CButton>
      <AddNewAccountB2CButton>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <th>FistName</th>
                <th>LastName</th>
                <th>Account Name</th>
                <th>Email</th>
                <th>Account Number</th>
                <th>Industry</th>
                <th>Account Priority</th>
                <th>Cel</th>
                <th>Website</th>
                <th>Employee Number</th>
                <th>Description</th>
                <th>Actions</th>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountB2C.map((accountB2B: any, index: number) =>
                accountB2B.map((accountItem: any, subIndex: number) => (
                  <TableRow key={`${index}-${subIndex}`}>
                    <TableCell>{accountItem.createdBy.firstName}</TableCell>
                    <TableCell>{accountItem.createdBy.lastName}</TableCell>
                    <TableCell>{accountItem.accountName}</TableCell>
                    <TableCell>{accountItem.email}</TableCell>
                    <TableCell>{accountItem.accountNumber}</TableCell>
                    <TableCell>{accountItem.industry}</TableCell>
                    <TableCell>{accountItem.accountPriority}</TableCell>
                    <TableCell>{accountItem.phone}</TableCell>
                    <TableCell>{accountItem.website}</TableCell>
                    <TableCell>{accountItem.employeesNumber}</TableCell>
                    <TableCell>{accountItem.description}</TableCell>
                    <TableCell>
                      <ForwardIcon
                        color="primary"
                        fontSize="large"
                        // onClick={() => handleGoToOrderLinkClick(order)}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </AddNewAccountB2CButton>
    </AccountB2CTableContainer>
  );
};

export default AccountB2CTable;
