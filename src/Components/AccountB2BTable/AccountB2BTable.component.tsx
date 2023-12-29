import { FC, useEffect, useState } from "react";
import {
  AccountButtonName,
  AccountTableContainer,
  AccountTypeName,
  AccountsTypeNAmeHolder,
  AddAccountNameContainerPlusIcon,
  AddNewAccountButton,
  PopupName,
  TableAccountHolder,
} from "./style/AccountB2BTable.style";
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
import Popup from "Components/Popup/Popup.component";

const AccountB2BTable: FC<{}> = () => {
  const [accountB2B, setAccountB2B] = useState<AccountTypeProps[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for controlling the modal/popup visibility

  // ... (existing code remains unchanged)

  // Function to open the popup
  const openPopup = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  //get account B2B api
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(fetchAccountDetails());
        if (fetchAccountDetails.fulfilled.match(result)) {
          console.log(result);
          setAccountB2B(result.payload);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrderData();
  }, [dispatch]);
  const accountButtonName = (
    <AddAccountNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <AccountButtonName>Add account</AccountButtonName>
    </AddAccountNameContainerPlusIcon>
  );

  const navigateToForm = (type: string) => {
    if (type === "B2B") {
      navigate("/B2BForm");
    } else if (type === "B2C") {
      navigate("/B2CForm"); 
    }
    setIsModalOpen(false); 
  };
  return (
    <>
      <AccountTableContainer>
        <AddNewAccountButton>
          <GenericButton name={accountButtonName} onClick={openPopup} />
        </AddNewAccountButton>

        <TableAccountHolder>
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
                {accountB2B.map((accountB2B: any, index: number) =>
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
        </TableAccountHolder>
      </AccountTableContainer>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        headerContent={<PopupName>Choose Account Type</PopupName>}
        bodyContent={
          <>
            <AccountsTypeNAmeHolder>
              <AccountTypeName onClick={() => navigateToForm("B2B")}>
                B2B
              </AccountTypeName>
              <AccountTypeName onClick={() => navigateToForm("B2C")}>
                B2C
              </AccountTypeName>
            </AccountsTypeNAmeHolder>
          </>
        }
        footerContent={<GenericButton name="Save" />}
      />
    </>
  );
};

export default AccountB2BTable;
