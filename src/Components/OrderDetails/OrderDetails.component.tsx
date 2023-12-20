import { FC, useEffect, useState } from "react";

//style
import {
  OrderDetailsContentHolder,
  OrderDetailsHolder,
  OrderDetailsTable,
  OrdersHead,
  OrdersTableBody,
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
  fetchOrderDetails,
} from "redux/Pages/Orders/OrdersSlice";

//mui-icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//components
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";
import { orderForm } from "redux/Containers/OrderForm/OrderFormSlice";
import { useNavigate } from "react-router-dom";

const OrderDetailsComponent: FC<{}> = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [addedItems, setAddedItems] = useState<
    {
      productName: string;
      quantity: string;
      totalPrice: string;
      totalAmount: string;
      unitPrice: string;
      product: {
        id: string;
      };
    }[]
  >([]);
  const [orderNotes, setOrderNotes] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const dispatch: AppDispatch = useDispatch();

  //get order api
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(fetchOrderDetails());
        if (fetchOrderDetails.fulfilled.match(result)) {
          setOrders(result.payload);
        } else {
          setError("Error fetching orders. Please try again later!");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders. Please try again later!");
      }
    };

    fetchOrderData();
  }, [dispatch]);
  console.log(orders);

  //edit button click
  const handleEdit = (rental: any) => {
    console.log(rental);
    setIsModalOpen(true);
    setSelectedItem(rental);
  };

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  //post request
  const handleOrderFormClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const lastAddedItem = addedItems[addedItems.length - 1];

      const productsDataForOrder = addedItems.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        totalAmount: item.totalAmount,
        unitPrice: item.unitPrice,
        product: {
          id: parseInt(item.product.id),
        },
      }));

      const userCredentials = {
        totalAmount: lastAddedItem.totalAmount || "0",
        orderNotes: orderNotes,
        shippingAddress: {
          street: street,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
        },
        account: {
          accountId: selectedAccount,
        },
        orderItemList: productsDataForOrder,

        orderClient: {
          id: userId,
        },
        createdBy: {
          id: userId,
        },
      };
      await dispatch(orderForm({ userCredentials }));
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
    <>
      <OrderDetailsContentHolder>
        <OrderDetailsHolder>
          <OrderDetailsTable>
            <OrdersTableHead>
              <OrdersTableRow>
                <OrdersHead>FirstName</OrdersHead>
                <OrdersHead>LastName</OrdersHead>
                <OrdersHead>Account Name</OrdersHead>
                <OrdersHead>Product Name</OrdersHead>
                <OrdersHead>Order Notes</OrdersHead>
                <OrdersHead>Order Status</OrdersHead>
                <OrdersHead>Street</OrdersHead>
                <OrdersHead>City</OrdersHead>
                <OrdersHead>State</OrdersHead>
                <OrdersHead>Country</OrdersHead>
                <OrdersHead>Postal Code</OrdersHead>
                <OrdersHead>Total Amount</OrdersHead>
                <OrdersHead>Actions</OrdersHead>
              </OrdersTableRow>
            </OrdersTableHead>
            <OrdersTableBody>
              {orders.map((orderGroup: any, index: number) =>
                orderGroup.map((order: OrderDetails, subIndex: number) =>
                  order?.orderItem?.map((item: any, itemIndex: number) => (
                    <OrdersTableRow key={`${index}-${subIndex}-${itemIndex}`}>
                      <OrdersTableData>
                        {order?.userDTO?.firstName}
                      </OrdersTableData>
                      <OrdersTableData>
                        {order?.userDTO?.lastName}
                      </OrdersTableData>
                      <OrdersTableData>
                        {order?.accountBasicDTO?.accountName}
                      </OrdersTableData>
                      <OrdersTableData>
                        {item?.product?.productName}
                      </OrdersTableData>
                      <OrdersTableData>{order?.orderNotes}</OrdersTableData>
                      <OrdersTableData>{order?.orderStatus}</OrdersTableData>
                      <OrdersTableData>
                        {order?.shippingAddress?.street}
                      </OrdersTableData>
                      <OrdersTableData>
                        {order?.shippingAddress?.city}
                      </OrdersTableData>
                      <OrdersTableData>
                        {order?.shippingAddress?.state}
                      </OrdersTableData>
                      <OrdersTableData>
                        {order?.shippingAddress?.country}
                      </OrdersTableData>
                      <OrdersTableData>
                        {order?.shippingAddress?.postalCode}
                      </OrdersTableData>
                      <OrdersTableData>${order?.totalAmount}</OrdersTableData>
                      <OrdersTableData>
                        <EditIcon
                          onClick={() => handleEdit(order)}
                          style={{ cursor: "pointer" }}
                        />
                        {/* <EditOrderButton onClick={() => handleEdit(order)}>
                          Edit
                        </EditOrderButton> */}
                        {/* <IconLink to=""> */}
                        <DeleteIcon
                          onClick={() => handleDeleteOrder(order.id)}
                          style={{ cursor: "pointer" }}
                        />
                        {/* </IconLink> */}
                      </OrdersTableData>
                    </OrdersTableRow>
                  ))
                )
              )}
            </OrdersTableBody>
          </OrderDetailsTable>
        </OrderDetailsHolder>
      </OrderDetailsContentHolder>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        headerContent={<h2>Edit Order</h2>}
        bodyContent={
          <>
            {selectedItem && (
              <>
                <InputsOfModalHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="FirstName"
                      value={selectedItem?.userDTO.firstName || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          userDTO: {
                            ...selectedItem.userDTO,
                            firstName: e.target.value,
                          },
                        });
                      }}
                    />
                  </ModalInputHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="LastName"
                      value={selectedItem?.userDTO.lastName || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          userDTO: {
                            ...selectedItem.userDTO,
                            lastName: e.target.value,
                          },
                        });
                      }}
                    />
                  </ModalInputHolder>
                </InputsOfModalHolder>
                <InputsOfModalHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="Account Name"
                      value={selectedItem?.accountBasicDTO.accountName || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          accountBasicDTO: {
                            ...selectedItem.accountBasicDTO,
                            accountName: e.target.value,
                          },
                        });
                      }}
                    />
                  </ModalInputHolder>
                  <ModalInputHolder>
                    <GenericInput
                      input_label="Product Name"
                      value={
                        selectedItem?.orderItem[0]?.product?.productName || ""
                      }
                      onChange={(e) => {
                        const { orderItem } = selectedItem;
                        const updatedItem = {
                          ...orderItem[0],
                          product: {
                            ...orderItem[0].product,
                            productName: e.target.value,
                          },
                        };
                        setSelectedItem({
                          ...selectedItem,
                          orderItem: [updatedItem, ...orderItem.slice(1)],
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
                      input_label="Total Amount "
                      value={selectedItem?.totalAmount || ""}
                      onChange={(e: any) => {
                        setSelectedItem({
                          ...selectedItem,
                          totalAmount: parseFloat(e.target.value),
                        });
                      }}
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
    </>
  );
};

export default OrderDetailsComponent;
