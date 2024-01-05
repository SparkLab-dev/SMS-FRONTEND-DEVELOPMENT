import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//axios
import axios from "axios";

export interface LeadRequestBody {
  firstName: string;
  lastName: string;
  company: string | null;
  leadSource: {
    id: number;
    name: string;
  };
  annualRevenue: number;
  phone: string;
  email: string;
  website: string | null;
  description: string;
  leadStatus: {
    id: number;
    name: string;
  };
  numberOfEmployees: number;
  address: string | null;
  productInterest: {
    id: number;
    productName: string;
  };
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  modifiedBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export type LeadSourceState = {
  leadSource: LeadRequestBody[] | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: LeadSourceState = {
  leadSource: null,
  isAuthenticated: false,
  error: null,
};

//add new lead
export const addLead = createAsyncThunk(
  "lead/leadSource",
  async (
    { leadSouceCredentials }: { leadSouceCredentials: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.10.210:8081/SMS/lead",
        leadSouceCredentials
      );

      const responseLeadSourceCredentials = response.data;
      console.log("", responseLeadSourceCredentials);

      return responseLeadSourceCredentials;
    } catch (error: any) {
      console.log("Error in register LeadSource items:", error);

      return rejectWithValue("LeadSource item register failed");
    }
  }
);

//get all leads
export const fetchLeads = createAsyncThunk<LeadRequestBody[]>(
  "leads/getAllLeads",
  async () => {
    try {
      const response = await axios.get("http://192.168.10.210:8081/SMS/lead");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//get lead by id
export const fetchLeadById = createAsyncThunk(
  "lead/leadById",
  async (leadId: number) => {
    try {
      const response = await axios.get(
        `http://192.168.10.210:8081/SMS/lead/${leadId}`
      );
      console.log("Response from API:", response.data);
      return [response.data];
    } catch (error) {
      console.error("Error fetching lead details:", error);
      throw error;
    }
  }
);

//delete lead by id
export const deleteLead = createAsyncThunk(
  "lead/deleteLead",
  async (leadId: number) => {
    try {
      const response = await axios.delete(
        `http://192.168.10.210:8081/SMS/lead/${leadId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const leadSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLead.fulfilled, (state, action) => {
        state.leadSource = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(addLead.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.leadSource = null;
        state.error = action.payload as string | null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.leadSource = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.leadSource = null;
        state.error = action.payload as string | null;
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.leadSource = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.leadSource = null;
        state.error = action.payload as string | null;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.leadSource = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.leadSource = null;
        state.error = action.payload as string | null;
      });
  },
});

export default leadSlice.reducer;
