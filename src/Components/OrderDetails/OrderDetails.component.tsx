import { FC, useEffect, useState } from "react";

//style
import {
  AccountLabel,
  DisplayOrderHolder,
  EditOrderTableName,
  Hr,
  OrdDetailsHolder,
  OrderDetailsContainer,
  OrderDetailsContentHolder,
  OrderDetailsHolder,
  OrderDetailsTable,
  Orderdetails,
  OrdersHead,
  // OrdersTableBody,
  OrdersTableData,
  OrdersTableHead,
  OrdersTableRow,
} from "./style/OrderDetails.style";
import {
  InputsOfModalHolder,
  ModalInputHolder,
  ModalSaveButtonHolder,
} from "Components/OrdersTable/style/OrdersTable.style";

//redux
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderDetails,
  deleteOrder,
  fetchOrderDetailsById,
} from "redux/Pages/Orders/OrdersSlice";

//mui-icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//components
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import { orderForm } from "redux/Containers/OrderForm/OrderFormSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProductsOfOrder from "Components/ProductsOfOrder/ProductsOfOrder.component";
import { StyledSelect } from "App/style/App.style";
import {
  Account,
  fetchAccountDetails,
} from "redux/Containers/Account/AccountSlice";

const OrderDetailsComponent: FC<{}> = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [account, setAccount] = useState<Account[]>([]);
  console.log("ACCOUNT", account);

  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  console.log("ECELCTED ACCOUNT", selectedAccount);

  const dispatch: AppDispatch = useDispatch();

  const { orderId } = useParams();
  const orderID = orderId ? parseInt(orderId) : 0;

  //get order api
  useEffect(() => {
    const fetchDetails = () => {
      if (orderID) {
        console.log(orderID);
        dispatch(fetchOrderDetailsById(orderID))
          .then((result: any) => {
            console.log(result);
            if (fetchOrderDetailsById.fulfilled.match(result)) {
              setOrders(result.payload);
            }
          })
          .catch((error: any) => {
            console.error("Error fetching  product details:", error);
          });
      }
    };

    fetchDetails();
  }, [dispatch, orderID]);
  console.log(orders);

  //get account api
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const result = await dispatch(fetchAccountDetails());
        console.log(result);
        if (fetchAccountDetails.fulfilled.match(result)) {
          const accounts = result.payload.flat();

          setAccount(accounts);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccountData();
  }, [dispatch]);
  console.log("account", account);

  //edit button click
  const handleEdit = (editOrder: any) => {
    console.log(editOrder);
    setIsModalOpen(true);
    setSelectedItem(editOrder);
    const selectedAccountId = editOrder?.accountBasicDTO?.id;
    console.log(selectedAccountId);
    if (selectedAccountId !== undefined && selectedAccountId !== null) {
      setSelectedAccount(selectedAccountId);
    } else {
      setSelectedAccount(null); // or any default value if accountId doesn't exist
    }
  };

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  //post request
  const handleOrderFormClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const userCredentials = {
      id: orderID,
      totalAmount: selectedItem.totalAmount || "0",
      orderSource: selectedItem.orderSource,
      orderNumber: selectedItem.orderNumber,
      orderStatus: selectedItem.orderStatus,
      orderNotes: selectedItem.orderNotes,
      shippingAddress: {
        street: selectedItem?.shippingAddress?.street || "", // Handling null/undefined
        city: selectedItem?.shippingAddress?.city || "",
        state: selectedItem?.shippingAddress?.state || "",
        postalCode: selectedItem?.shippingAddress?.postalCode || "",
        country: selectedItem?.shippingAddress?.country || "",
      },
      account: {
        accountId: String(selectedAccount),
      },

      orderClient: {
        id: userId,
      },
      createdBy: {
        id: userId,
      },
    };
    console.log("SELECTED ACCOUNT", selectedAccount);
    try {
      // const lastAddedItem = addedItems[addedItems.length - 1];

      const response = await dispatch(orderForm({ userCredentials }));
      if (response.payload) {
        const updatedOrderDetails = orders.map((order) =>
          order.id === selectedItem.id ? selectedItem : order
        );
        console.log(selectedItem);
        setOrders(updatedOrderDetails);
        // localStorage.setItem("orders", JSON.stringify(updatedOrderDetails));
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log("Error in handleOrderClick:", error);
    }
  };

  //delete product api call
  const handleDeleteOrder = async (orderId: number) => {
    try {
      const result = await dispatch(deleteOrder(orderId));
      if (deleteOrder.fulfilled.match(result)) {
        console.log("Order deleted successfully!");
        setOrders((prevState) =>
          prevState.filter((order) => order.id !== orderId)
        );
        navigate("/orderTable");
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  return (
    <Orderdetails>
      <OrderDetailsContentHolder>
        <OrderDetailsHolder>
          <OrderDetailsTable>
            <DisplayOrderHolder>
              <OrderDetailsContainer>
                <OrdDetailsHolder>
                  <OrdersTableHead>
                    {/* <OrdersTableRow> */}
                    <OrdersHead>Order Number</OrdersHead>

                    <Hr />
                    <OrdersHead>Account Name</OrdersHead>
                    <Hr />
                    <OrdersHead>Order Source</OrdersHead>
                    <Hr />
                    <OrdersHead>Order Notes</OrdersHead>
                    <Hr />
                    <OrdersHead>Order Status</OrdersHead>
                    <Hr />
                    <OrdersHead>Street</OrdersHead>
                    <Hr />
                    <OrdersHead>City</OrdersHead>
                    <Hr />
                    <OrdersHead>State</OrdersHead>
                    <Hr />
                    <OrdersHead>Country</OrdersHead>
                    <Hr />
                    <OrdersHead>Postal Code</OrdersHead>
                    <Hr />
                    <OrdersHead>Total Amount</OrdersHead>
                    <Hr />
                    <OrdersHead>Actions</OrdersHead>

                    {/* </OrdersTableRow> */}
                  </OrdersTableHead>
                  {/* <OrdersTableBody> */}
                  {orders.map((order: any, index: number) => (
                    // orderGroup.map(
                    //   (order: any, subIndex: number) => (
                    // order?.orderItem?.map((item: any, itemIndex: number) => (
                    <>
                      <OrdersTableRow key={index}>
                        <OrdersTableData>{order.orderNumber}</OrdersTableData>
                        <Hr />
                        <OrdersTableData>
                          {index === 0 &&
                            (order?.accountBasicDTO?.accountType === "B2B"
                              ? order?.accountBasicDTO?.accountName
                              : `${order?.accountBasicDTO?.firstName} ${order?.accountBasicDTO?.lastName}`)}
                        </OrdersTableData>
                        <Hr />
                        <OrdersTableData>{order.orderSource}</OrdersTableData>
                        <Hr />
                        <OrdersTableData>{order?.orderNotes}</OrdersTableData>
                        <Hr />
                        <OrdersTableData>{order?.orderStatus}</OrdersTableData>
                        <Hr />
                        <OrdersTableData>
                          {order?.shippingAddress?.street}
                        </OrdersTableData>
                        <Hr />
                        <OrdersTableData>
                          {order?.shippingAddress?.city}
                        </OrdersTableData>
                        <Hr />
                        <OrdersTableData>
                          {order?.shippingAddress?.state}
                        </OrdersTableData>
                        <Hr />
                        <OrdersTableData>
                          {order?.shippingAddress?.country}
                        </OrdersTableData>
                        <Hr />
                        <OrdersTableData>
                          {order?.shippingAddress?.postalCode}
                        </OrdersTableData>
                        <Hr />
                        <OrdersTableData>
                          {order?.totalAmount}
                        </OrdersTableData>{" "}
                        <Hr />
                        <OrdersTableData>
                          <Hr />
                          <EditIcon
                            onClick={() => handleEdit(order)}
                            style={{
                              cursor: "pointer",
                              color: "#0e53c5",
                              fontSize: "25px",
                            }}
                          />
                          <DeleteIcon
                            onClick={() => handleDeleteOrder(order.id)}
                            style={{
                              cursor: "pointer",
                              color: "#0e53c5",
                              fontSize: "25px",
                            }}
                          />
                        </OrdersTableData>
                      </OrdersTableRow>
                    </>
                    // )
                    // ))
                  ))}
                  {/* </OrdersTableBody> */}
                </OrdDetailsHolder>
              </OrderDetailsContainer>
            </DisplayOrderHolder>
          </OrderDetailsTable>
        </OrderDetailsHolder>
      </OrderDetailsContentHolder>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        headerContent={<EditOrderTableName>Edit Order</EditOrderTableName>}
        bodyContent={
          <>
            {selectedItem && (
              <>
                <InputsOfModalHolder>
                  <ModalInputHolder>
                    {" "}
                    <GenericInput
                      input_label="Order number"
                      value={selectedItem?.orderNumber || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          orderNumber: e.target.value,
                        });
                      }}
                    />
                  </ModalInputHolder>
                </InputsOfModalHolder>
                <InputsOfModalHolder>
                  <ModalInputHolder>
                    <AccountLabel>Account</AccountLabel>
                    <StyledSelect
                      value={
                        selectedAccount !== null
                          ? selectedAccount.toString()
                          : ""
                      }
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        // const selectedAccountId = Number(e.target.value);
                        setSelectedAccount(Number(e.target.value));
                      }}
                    >
                      <option defaultValue="none">Select an Option</option>
                      {account.map((account: any, index: any) => (
                        <option key={index} value={account.accountId}>
                          {account.accountType === "B2B"
                            ? account.accountName
                            : `${account.firstName} ${account.lastName}`}
                        </option>
                      ))}
                    </StyledSelect>
                  </ModalInputHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="Order Source"
                      value={selectedItem?.orderSource || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          orderSource: e.target.value,
                        });
                      }}
                    />
                  </ModalInputHolder>
                </InputsOfModalHolder>
                <InputsOfModalHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="Order Notes "
                      value={selectedItem?.orderNotes || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          orderNotes: e.target.value,
                        });
                      }}
                    />
                  </ModalInputHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="Order Status"
                      value={selectedItem?.orderStatus || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          orderStatus: e.target.value,
                        });
                      }}
                    />
                  </ModalInputHolder>
                </InputsOfModalHolder>
                <InputsOfModalHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="Street"
                      value={selectedItem?.shippingAddress.street || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          shippingAddress: {
                            ...selectedItem.shippingAddress,
                            street: e.target.value,
                          },
                        });
                      }}
                    />
                  </ModalInputHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="City "
                      value={selectedItem?.shippingAddress.city || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          shippingAddress: {
                            ...selectedItem.shippingAddress,
                            city: e.target.value,
                          },
                        });
                      }}
                    />
                  </ModalInputHolder>
                </InputsOfModalHolder>
                <InputsOfModalHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="State"
                      value={selectedItem?.shippingAddress.state || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          shippingAddress: {
                            ...selectedItem.shippingAddress,
                            state: e.target.value,
                          },
                        });
                      }}
                    />
                  </ModalInputHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="Country"
                      value={selectedItem?.shippingAddress.country || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          shippingAddress: {
                            ...selectedItem.shippingAddress,
                            country: e.target.value,
                          },
                        });
                      }}
                    />
                  </ModalInputHolder>
                </InputsOfModalHolder>
                <InputsOfModalHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="Postal Code"
                      value={selectedItem?.shippingAddress.postalCode || ""}
                      type="number"
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          shippingAddress: {
                            ...selectedItem.shippingAddress,
                            postalCode: e.target.value,
                          },
                        });
                      }}
                    />
                  </ModalInputHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="Total Amount"
                      value={selectedItem?.totalAmount || ""}
                      type="number"
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          totalAmount: e.target.value,
                        });
                      }}
                      disabled
                    />
                  </ModalInputHolder>
                </InputsOfModalHolder>
              </>
            )}
          </>
        }
        footerContent={
          <ModalSaveButtonHolder>
            <GenericButton name="Save" onClick={handleOrderFormClick} />
          </ModalSaveButtonHolder>
        }
      />
      <ProductsOfOrder />
    </Orderdetails>
  );
};

export default OrderDetailsComponent;
