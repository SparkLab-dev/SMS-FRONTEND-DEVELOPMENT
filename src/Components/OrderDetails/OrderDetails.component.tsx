import { FC, useEffect, useState } from "react";

//style
import {
  EditOrderTableName,
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

const OrderDetailsComponent: FC<{}> = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderDetails[]>([]);
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
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

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

  //edit button click
  const handleEdit = (editOrder: any) => {
    console.log(editOrder);
    setIsModalOpen(true);
    setSelectedItem(editOrder);
  };

  //get userRole from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);
  console.log(selectedItem);
  //post request
  const handleOrderFormClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      // const lastAddedItem = addedItems[addedItems.length - 1];

      const userCredentials = {
        totalAmount: selectedItem.totalAmount || "0",
        orderNotes: selectedItem.orderNotes,
        shippingAddress: {
          street: selectedItem.street,
          city: selectedItem.city,
          state: selectedItem.state,
          postalCode: selectedItem.postalCode,
          country: selectedItem.country,
        },
        account: {
          accountId: selectedAccount,
        },
        orderItemList: {
          productName: selectedItem.productName,
          quantity: selectedItem.quantity,
          totalPrice: selectedItem.totalPrice,
          totalAmount: selectedItem.totalAmount,
          unitPrice: selectedItem.unitPrice,
          product: {
            id: selectedItem.id,
          },
        },

        orderClient: {
          id: userId,
        },
        createdBy: {
          id: userId,
        },
      };
      const response = await dispatch(orderForm({ userCredentials }));
      if (response.payload) {
        const updatedProductDetails = orders.map((order) =>
          order.id === selectedItem.id ? selectedItem : order
        );
        setOrders(updatedProductDetails);
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
    <>
      <OrderDetailsContentHolder>
        <OrderDetailsHolder>
          <OrderDetailsTable>
            <OrdersTableHead>
              <OrdersTableRow>
                <OrdersHead>Account Name</OrdersHead>
                <OrdersHead>Product Name</OrdersHead>
                <OrdersHead>Order Notes</OrdersHead>
                <OrdersHead>Order Status</OrdersHead>
                <OrdersHead>Street</OrdersHead>
                <OrdersHead>City</OrdersHead>
                <OrdersHead>State</OrdersHead>
                <OrdersHead>Country</OrdersHead>
                <OrdersHead>Postal Code</OrdersHead>
                <OrdersHead>Actions</OrdersHead>
              </OrdersTableRow>
            </OrdersTableHead>
            <OrdersTableBody>
              {orders.map((order: OrderDetails, index: number) => (
                // orderGroup.map(
                //   (order: any, subIndex: number) => (
                // order?.orderItem?.map((item: any, itemIndex: number) => (
                <OrdersTableRow key={index}>
                  <OrdersTableData>
                    {index === 0 &&
                      (order?.accountBasicDTO?.accountType === "B2B"
                        ? order?.accountBasicDTO?.accountName
                        : `${order?.accountBasicDTO?.firstName} ${order?.accountBasicDTO?.lastName}`)}
                  </OrdersTableData>
                  <OrdersTableData>
                    {order.orderItem.map((item: any, subIndex: number) => (
                      <div key={subIndex}>{item.product.productName}</div>
                    ))}
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
                  <OrdersTableData>
                    <EditIcon
                      onClick={() => handleEdit(order)}
                      style={{ cursor: "pointer" }}
                    />

                    <DeleteIcon
                      onClick={() => handleDeleteOrder(order.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </OrdersTableData>
                </OrdersTableRow>
                // )
                // ))
              ))}
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
        headerContent={<EditOrderTableName>Edit Order</EditOrderTableName>}
        bodyContent={
          <>
            {selectedItem && (
              <>
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
