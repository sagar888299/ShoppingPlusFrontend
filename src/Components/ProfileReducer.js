import { createSlice } from "@reduxjs/toolkit";
import { updateCustomer, fetchCustomer } from "./ProfileAction";

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customer: null,
    selectedTab: "profile",
    status: 'idle',
    error: null,
  },
  reducers: {
    setTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    updateCustomerDetails: (state, action) => {
      state.customer = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Handle fetching customer details
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customer = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
      
    // Handle updating customer details
    builder
      .addCase(updateCustomer.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update customer details in state
        state.customer = { ...state.customer, ...action.payload };
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setTab, updateCustomerDetails } = customerSlice.actions;

export default customerSlice.reducer;
