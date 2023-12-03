import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//components
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

//style
import {
  EditButton,
  IconLink,
  Table,
  TableAndDatepickerHolder,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "Components/ProductsTable/style/ProductsTable.style";
import {
  AddNewOrderButton,
  AddOrderNameContainerPlusIcon,
  InputsOfModalHolder,
  ModalInputHolder,
  OrderButtonName,
  OrderH2,
  OrdersTableContainer,
  TableBody,
} from "./style/OrdersTable.style";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  OrderDetails,
  deleteOrder,
  fetchOrderDetails,
} from "redux/Pages/Orders/OrdersSlice";

const OrdersTable: FC<{}> = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  console.log(orders);

  //get order api
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(fetchOrderDetails());
        if (fetchOrderDetails.fulfilled.match(result)) {
          // const orders = result.payload;

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

  //delete order
  const handleDelete = async (orderId: number) => {
    try {
      const result = await dispatch(deleteOrder(orderId));
      if (deleteOrder.fulfilled.match(result)) {
        console.log("Order deleted successfully!");
        setOrders((prevState) =>
          prevState.filter((order) => order.id !== orderId)
        );
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  //edit button click
  const handleEdit = (rental: any) => {
    console.log(rental);
    setIsModalOpen(true);
    setSelectedItem(rental);
  };

  // const handleSave = async () => {
  //   if (!orderId || !selectedItem) {
  //     console.error("User is not authenticated or no item is selected");
  //     return;
  //   }

  const orderButtonName = (
    <AddOrderNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <OrderButtonName>Add order</OrderButtonName>
    </AddOrderNameContainerPlusIcon>
  );

  return (
    <OrdersTableContainer>
      <AddNewOrderButton>
        <GenericButton
          name={orderButtonName}
          onClick={() => navigate("/orderForm")}
        />
      </AddNewOrderButton>
      <TableAndDatepickerHolder>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Product Name</th>
                <th>Total Amount</th>
                <th>Order Notes</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Postal Code</th>
                <th>Quantity</th>
                <th>Total Price </th>
                <th>Actions</th>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((orderGroup: any, index: number) =>
                orderGroup.map((order: OrderDetails, subIndex: number) =>
                  order?.orderItem?.map((item: any, itemIndex: number) => (
                    <TableRow key={`${index}-${subIndex}-${itemIndex}`}>
                      <TableCell>{order?.userDTO?.firstName}</TableCell>
                      <TableCell>{order?.userDTO?.lastName}</TableCell>
                      <TableCell>{item?.product?.productName}</TableCell>
                      <TableCell>${order?.totalAmount}</TableCell>
                      <TableCell>{order?.orderNotes}</TableCell>
                      <TableCell>{order?.shippingAddress?.street}</TableCell>
                      <TableCell>{order?.shippingAddress?.city}</TableCell>
                      <TableCell>{order?.shippingAddress?.state}</TableCell>
                      <TableCell>
                        {order?.shippingAddress?.postalCode}
                      </TableCell>
                      <TableCell>{item?.quantity}</TableCell>
                      <TableCell>${item?.totalPrice}</TableCell>
                      <TableCell>
                        <EditButton onClick={() => handleEdit(order)}>
                          Edit
                        </EditButton>
                        <IconLink to="" onClick={() => handleDelete(order.id)}>
                          <DeleteIcon />
                        </IconLink>
                      </TableCell>
                    </TableRow>
                  ))
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Popup
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          headerContent={<OrderH2>Edit Order</OrderH2>}
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
                  </InputsOfModalHolder>
                  <InputsOfModalHolder>
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
                        input_label="Quantity"
                        value={selectedItem?.orderItem[0]?.quantity || ""}
                        type="number"
                        onChange={(e: any) => {
                          setSelectedItem({
                            ...selectedItem,
                            orderItem: [
                              {
                                ...selectedItem.orderItem[0],
                                quantity: e.target.value,
                              },
                              ...selectedItem.orderItem.slice(1),
                            ],
                          });
                        }}
                      />
                    </ModalInputHolder>
                  </InputsOfModalHolder>
                  <InputsOfModalHolder>
                    <ModalInputHolder>
                      <GenericInput
                        input_label="Unit Price"
                        value={selectedItem?.orderItem[0]?.unitPrice || ""}
                        type="number"
                        onChange={(e: any) => {
                          setSelectedItem({
                            ...selectedItem,
                            orderItem: [
                              {
                                ...selectedItem.orderItem[0],
                                unitPrice: e.target.value,
                              },
                              ...selectedItem.orderItem.slice(1),
                            ],
                          });
                        }}
                      />
                    </ModalInputHolder>
                    <ModalInputHolder>
                      <GenericInput
                        input_label="Total Price"
                        value={selectedItem?.orderItem[0]?.totalPrice || ""}
                        type="number"
                        onChange={(e: any) => {
                          setSelectedItem({
                            ...selectedItem,
                            orderItem: [
                              {
                                ...selectedItem.orderItem[0],
                                totalPrice: e.target.value,
                              },
                              ...selectedItem.orderItem.slice(1),
                            ],
                          });
                        }}
                      />
                    </ModalInputHolder>
                  </InputsOfModalHolder>
                </>
              )}
            </>
          }
          footerContent={<GenericButton name="Save" />}
        />
      </TableAndDatepickerHolder>
    </OrdersTableContainer>
  );
};

export default OrdersTable;
