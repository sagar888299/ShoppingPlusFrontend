import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action for sending OTP
const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (phoneNumber, thunkAPI) => {
    try {
      const response = await axios.post('https://shoppingplusbackend-production.up.railway.app/api/otp/send', { phoneNumber });
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);


// Action for verifying OTP
const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ phoneNumber, otp, name }, thunkAPI) => {
    try {
      const response = await axios.post('https://shoppingplusbackend-production.up.railway.app/api/otp/verify', { phoneNumber, otp, name });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export { sendOtp, verifyOtp };
