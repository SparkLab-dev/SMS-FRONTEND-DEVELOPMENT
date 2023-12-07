//redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//axios
import axios from "axios";

export interface ProductImage {
  id: number;
  image: string;
  imageName: string;
  imageType: string;
  productId: number;
}

export type ProductImageState = {
  image: ProductImage[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: ProductImageState = {
  image: null,
  isAuthenticated: false,
  error: null,
};

//get product details
export const fetchImageCategory = createAsyncThunk<ProductImage[], number>(
  "image/imageCategory",
  async (productId: number) => {
    try {
      const response = await axios.get(
        `http://192.168.10.210:8081/SMS/product/${productId}/images`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const imageCategorySlice = createSlice({
  name: "imageCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageCategory.fulfilled, (state, action) => {
        state.image = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchImageCategory.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.image = null;
        state.error = action.payload as string | null;
      });
  },
});

export default imageCategorySlice.reducer;
