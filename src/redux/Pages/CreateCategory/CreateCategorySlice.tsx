import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Category {
  name: string;
  image: string;
}

export type CreateCategoryState = {
  category: Category | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: CreateCategoryState = {
  category: null,
  isAuthenticated: false,
  error: null,
};

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (
    { categoryCredentials }: { categoryCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/productcategory",
        categoryCredentials
      );

      const responseRegData = response.data;
      console.log("", responseRegData);

      if (response.status !== 200) {
        return rejectWithValue(responseRegData.error);
      }

      return responseRegData;
    } catch (error: any) {
      console.log("Error in register category:", error);

      return rejectWithValue("Category register failed");
    }
  }
);

const createCategorySlice = createSlice({
  name: "createCategory",
  initialState,
  reducers: {
    setCreateCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.category = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { setCreateCategory } = createCategorySlice.actions;
export default createCategorySlice.reducer;
