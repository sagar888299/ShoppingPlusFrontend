import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action for sending OTP
const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (phoneNumber, thunkAPI) => {
    try {
      const response = await axios.post('http://shoppingplusbackend-production.up.railway.app/api/otp/send', { phoneNumber });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Action for verifying OTP
const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ phoneNumber, otp, name }, thunkAPI) => {
    try {
      const response = await axios.post('http://shoppingplusbackend-production.up.railway.app/api/otp/verify', { phoneNumber, otp, name });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export { sendOtp, verifyOtp };
