import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Update customer details
export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ phoneNumber, customerData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/customers/${phoneNumber}`, customerData);
      return response.data; // Return the updated customer data
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'An error occurred');
    }
  }
);

export const fetchCustomer = createAsyncThunk(
  'customers/fetchCustomer',
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/customers/${phoneNumber}`);
      return response.data; // Return the fetched customer data
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'An error occurred');
    }
  }
);