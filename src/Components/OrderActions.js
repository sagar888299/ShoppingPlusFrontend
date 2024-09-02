import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action for fetching orders by customerId
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (customerId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/orders/customer/${customerId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Action for canceling an order
export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (orderId, thunkAPI) => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/orders/${orderId}/cancel`);
      return response.data; // Return the updated order
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (orderData, thunkAPI) => {
    try {
      // Replace the URL with the actual endpoint for adding orders
      const response = await axios.post('http://localhost:4000/api/orders', orderData);
      return response.data; // Return the added orders
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Handle errors
    }
  }
);
