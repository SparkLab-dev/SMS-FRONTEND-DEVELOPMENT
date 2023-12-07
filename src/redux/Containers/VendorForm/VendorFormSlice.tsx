import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Vendor {
    companyName: string;
    email: string;
    phoneNumber: string;
    contactPersonName: string;
    notes: string;
    paymentTerms: string;
    bankName: string;
    createdBy: {
        id: number;
    };
    modifiedBy: {
        id: number;
    };
}


export type VendorFormState = {
  vendor: Vendor | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: VendorFormState = {
  vendor: null,
  isAuthenticated: false,
  error: null,
};

export const vendorForm = createAsyncThunk(
  "vendor/vendorForm",
  async (
    { vendorCredentials }: { vendorCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/vendor",
        vendorCredentials
      );

      const responseRegData = response.data;
      console.log("", responseRegData);

      if (response.status !== 200) {
        return rejectWithValue(responseRegData.error);
      }

      return responseRegData;
    } catch (error: any) {
      console.log("Error in register vendor:", error);

      return rejectWithValue("Vendor register failed");
    }
  }
);

const vendorFormSlice = createSlice({
  name: "vendorForm",
  initialState,
  reducers: {
    setVendorForm: (state, action: PayloadAction<Vendor>) => {
      state.vendor = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(vendorForm.fulfilled, (state, action) => {
        state.vendor = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(vendorForm.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.vendor = null;
        state.error = action.payload as string | null;
      });
  },
});

export const { setVendorForm } = vendorFormSlice.actions;
export default vendorFormSlice.reducer;