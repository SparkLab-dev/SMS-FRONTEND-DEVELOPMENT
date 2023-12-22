import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//mui icons
import ForwardIcon from "@mui/icons-material/Forward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//components
import Popup from "Components/Popup/Popup.component";
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

//style
import {
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
  EditOrderButton,
  InputsOfModalHolder,
  ModalInputHolder,
  ModalSaveButtonHolder,
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
  fetchOrderDetails,
} from "redux/Pages/Orders/OrdersSlice";
 
const OrdersTable: FC<{}> = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [error, setError] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  console.log("orders", orders);

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

  const orderButtonName = (
    <AddOrderNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <OrderButtonName>Add order</OrderButtonName>
    </AddOrderNameContainerPlusIcon>
  );

  const handleGoToOrderLinkClick = (order: OrderDetails) => {
    console.log(order);
    navigate(`/orderDetails/${order.id}`);
    
  };

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
                <th>Account Name</th>
                <th>Product Name</th>
                <th>Order Notes</th>
                <th>Order Status</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Postal Code</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((orderGroup: any, index: number) =>
                orderGroup.map(
                  (order: any, subIndex: number) => (
                    // order?.orderItem?.map((item: any, itemIndex: number) => (
                    <TableRow key={`${index}-${subIndex}`}>
                      <TableCell>
                        {order?.accountBasicDTO?.accountType === "B2B"
                          ? order?.accountBasicDTO?.accountName
                          : `${order?.accountBasicDTO?.firstName} ${order?.accountBasicDTO?.lastName}`}
                      </TableCell>


                      <TableCell>
                        {order.orderItem.map((item: any) => (
                          <div key={item.id}>{item.product.productName}</div>
                        ))}
                      </TableCell>

                      <TableCell>{order?.orderNotes}</TableCell>
                      <TableCell>{order?.orderStatus}</TableCell>
                      <TableCell>{order?.shippingAddress?.street}</TableCell>
                      <TableCell>{order?.shippingAddress?.city}</TableCell>
                      <TableCell>{order?.shippingAddress?.state}</TableCell>
                      <TableCell>{order?.shippingAddress?.country}</TableCell>
                      <TableCell>
                        {order?.shippingAddress?.postalCode}
                      </TableCell>
                      <TableCell>${order?.totalAmount}</TableCell>
                      <TableCell>
                        <ForwardIcon
                          color="primary"
                          fontSize="large"
                          onClick={() => handleGoToOrderLinkClick(order)}
                          style={{ cursor: "pointer" }}
                        />
                      </TableCell>
                    </TableRow>
                  )
                  // ))
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TableAndDatepickerHolder>
    </OrdersTableContainer>
  );
};

export default OrdersTable;
