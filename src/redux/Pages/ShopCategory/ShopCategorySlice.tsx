//redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//axios
import axios from "axios";

interface Attribute {
  id: number;
  attributeName: string;
  attributeValue: string;
}

interface ProductCategory {
  id: number;
  name: string;
}

export interface ShopCategoryProductProps {
  id: number;
  name: string;
  barcode: string | null;
  description: string;
  stockQuantity: number;
  price: number;
  threshold: number;
  creationDate: string;
  modificationDate: string;
  attributes: Attribute[];
  productCategory: ProductCategory;
}

export type ShopProductPropsState = {
  user: ShopCategoryProductProps[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: ShopProductPropsState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

//get product details
export const fetchShopProductCategory = createAsyncThunk<
  ShopCategoryProductProps[],
  number
>("shopProduct/shopProductCategory", async (productId: number) => {
  try {
    const response = await axios.get(
      `http://192.168.10.210:8081/SMS/productcategory/${productId}/products`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});


const shopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopProductCategory.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchShopProductCategory.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string | null;
      });
  },
});

export default shopProductSlice.reducer;
