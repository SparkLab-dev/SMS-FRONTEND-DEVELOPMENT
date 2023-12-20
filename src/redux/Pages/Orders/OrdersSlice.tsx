//redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//axios
import axios from "axios";

interface ShippingAddress {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
}

interface OrderItem {
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  order: {
    id: number;
    name: string | null;
  };
  product: {
    id: number;
    productName: string;
  };
}

export interface OrderDetails {
  id: number;
  orderName: string | null;
  orderDateTime: string;
  totalAmount: number;
  orderStatus: string;
  orderNotes: string;
  orderSource: string;
  shippingAddress: ShippingAddress;
  accountBasicDTO: {
    accountName?: string;
    accountType?: string;
    firstName?: string;
    id?: number;
    lastName?: string;
  };
  deliveryDate: string;
  userDTO: UserDTO;
  orderItem: OrderItem[];
}

export type OrderState = {
  product: OrderDetails[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: OrderState = {
  product: null,
  isAuthenticated: false,
  error: null,
};

//get order details
export const fetchOrderDetails = createAsyncThunk<OrderDetails[]>(
  "order/orderProp",
  async () => {
    try {
      const response = await axios.get("http://192.168.10.210:8081/SMS/order");
      console.log(response);
      return [response.data];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//delete order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId: number) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.210:8081/SMS/order/${orderId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.product = null;
        state.error = action.payload as string | null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.product = null;
        state.error = action.payload as string | null;
      });
  },
});

export default orderSlice.reducer;
