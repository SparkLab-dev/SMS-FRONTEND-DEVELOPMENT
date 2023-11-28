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
  ModalInputHolder,
  OrderButtonName,
  OrderH2,
  OrdersTableContainer,
} from "./style/OrdersTable.style";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  OrderDetails,
  deleteOrder,
  fetchOrderDetails,
} from "redux/Pages/Orders/OrdersSlice";

const data = [
  {
    id: 1,
    orderName: null,
    orderDateTime: "2023-11-27T10:50:09.093916",
    totalAmount: 40.0,
    orderStatus: "Pending",
    orderNotes: "Order1 is the new order for this week",
    orderSource: "InStore",
    shippingAddress: {
      id: 1,
      street: "Rrruga e Elbasanit",
      city: "Tirane",
      state: "Albania",
      postalCode: "1001",
      country: "Albania",
    },
    deliveryDate: "2023-12-06",
    userDTO: {
      id: 1,
      firstName: "Blerta",
      lastName: "Prendi",
    },
    orderItem: [
      {
        quantity: 4,
        unitPrice: 50.0,
        totalPrice: 200.0,
        order: {
          id: 1,
          name: null,
        },
        product: {
          id: 1,
          productName: "Tulip",
        },
      },
    ],
  },
  {
    id: 2,
    orderName: null,
    orderDateTime: "2023-11-27T10:50:12.288273",
    totalAmount: 40.0,
    orderStatus: "Pending",
    orderNotes: "Order1 is the new order for this week",
    orderSource: "InStore",
    shippingAddress: {
      id: 2,
      street: "Rrruga e Elbasanit",
      city: "Tirane",
      state: "Albania",
      postalCode: "1001",
      country: "Albania",
    },
    deliveryDate: "2023-12-06",
    userDTO: {
      id: 1,
      firstName: "Blerta",
      lastName: "Prendi",
    },
    orderItem: [
      {
        quantity: 4,
        unitPrice: 50.0,
        totalPrice: 200.0,
        order: {
          id: 2,
          name: null,
        },
        product: {
          id: 1,
          productName: "Tulip",
        },
      },
    ],
  },
  {
    id: 3,
    orderName: null,
    orderDateTime: "2023-11-27T10:50:13.548029",
    totalAmount: 40.0,
    orderStatus: "Pending",
    orderNotes: "Order1 is the new order for this week",
    orderSource: "InStore",
    shippingAddress: {
      id: 3,
      street: "Rrruga e Elbasanit",
      city: "Tirane",
      state: "Albania",
      postalCode: "1001",
      country: "Albania",
    },
    deliveryDate: "2023-12-06",
    userDTO: {
      id: 1,
      firstName: "Blerta",
      lastName: "Prendi",
    },
    orderItem: [
      {
        quantity: 4,
        unitPrice: 50.0,
        totalPrice: 200.0,
        order: {
          id: 3,
          name: null,
        },
        product: {
          id: 1,
          productName: "Tulip",
        },
      },
    ],
  },
  {
    id: 4,
    orderName: null,
    orderDateTime: "2023-11-27T10:50:14.326258",
    totalAmount: 40.0,
    orderStatus: "Pending",
    orderNotes: "Order1 is the new order for this week",
    orderSource: "InStore",
    shippingAddress: {
      id: 4,
      street: "Rrruga e Elbasanit",
      city: "Tirane",
      state: "Albania",
      postalCode: "1001",
      country: "Albania",
    },
    deliveryDate: "2023-12-06",
    userDTO: {
      id: 1,
      firstName: "Blerta",
      lastName: "Prendi",
    },
    orderItem: [
      {
        quantity: 4,
        unitPrice: 50.0,
        totalPrice: 200.0,
        order: {
          id: 4,
          name: null,
        },
        product: {
          id: 1,
          productName: "Tulip",
        },
      },
    ],
  },
  {
    id: 5,
    orderName: null,
    orderDateTime: "2023-11-27T10:50:15.697724",
    totalAmount: 40.0,
    orderStatus: "Pending",
    orderNotes: "Order1 is the new order for this week",
    orderSource: "InStore",
    shippingAddress: {
      id: 5,
      street: "Rrruga e Elbasanit",
      city: "Tirane",
      state: "Albania",
      postalCode: "1001",
      country: "Albania",
    },
    deliveryDate: "2023-12-06",
    userDTO: {
      id: 1,
      firstName: "Blerta",
      lastName: "Prendi",
    },
    orderItem: [
      {
        quantity: 4,
        unitPrice: 50.0,
        totalPrice: 200.0,
        order: {
          id: 5,
          name: null,
        },
        product: {
          id: 1,
          productName: "Tulip",
        },
      },
    ],
  },
];
const OrdersTable: FC<{}> = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  //get order api
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(fetchOrderDetails());
        if (fetchOrderDetails.fulfilled.match(result)) {
          const orders = result.payload;
          setOrders(orders);
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

  //delete order
  const handleDelete = async (orderId: number) => {
    try {
      const result = await dispatch(deleteOrder(orderId));
      if (deleteOrder.fulfilled.match(result)) {
        console.log("Order deleted successfully!");
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
                <th>Unit Price</th>
                <th>Total Price </th>
                <th>Actions</th>
              </TableRow>
            </TableHead>
            <tbody>
              {data.map((rental: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{rental.userDTO.firstName}</TableCell>
                  <TableCell> {rental.userDTO.lastName} </TableCell>
                  <TableCell>
                    {rental.orderItem[0]?.product?.productName}
                  </TableCell>
                  <TableCell> ${rental.totalAmount} </TableCell>
                  <TableCell>{rental.orderNotes}</TableCell>
                  <TableCell> {rental.shippingAddress.street} </TableCell>
                  <TableCell> {rental.shippingAddress.city} </TableCell>
                  <TableCell> {rental.shippingAddress.state} </TableCell>
                  <TableCell> {rental.shippingAddress.postalCode} </TableCell>
                  <TableCell>{rental.orderItem[0]?.quantity}</TableCell>
                  <TableCell>${rental.orderItem[0]?.unitPrice}</TableCell>
                  <TableCell>${rental.orderItem[0]?.totalPrice}</TableCell>
                  <TableCell>
                    <EditButton onClick={() => handleEdit(rental)}>
                      Edit
                    </EditButton>
                    <IconLink to="" onClick={() => handleDelete(rental.id)}>
                      <DeleteIcon />
                    </IconLink>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
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
                  <div style={{ display: "flex" }}>
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
                  </div>
                  <div style={{ display: "flex" }}>
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
                  </div>
                  <div style={{ display: "flex" }}>
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
                  </div>
                  <div style={{ display: "flex" }}>
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
                  </div>
                  <div style={{ display: "flex" }}>
                    <ModalInputHolder>
                      <GenericInput
                        input_label="Postal Code "
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
                  </div>
                  <div style={{ display: "flex" }}>
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
                  </div>
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
