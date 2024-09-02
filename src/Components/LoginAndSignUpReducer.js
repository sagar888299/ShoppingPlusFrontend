import { createSlice } from "@reduxjs/toolkit";
import { sendOtp, verifyOtp } from "./LoginAndSignUpAction";

const initialState = {
  user: null,
  status: 'idle', // Status can be 'idle', 'pending', 'succeeded', 'failed'
  loading: false,
  error: null,
  otpSent: false, // Track OTP sent state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUser(state) {
      state.user = null;
      state.status = 'idle';
      state.loading = false;
      state.error = null;
      state.otpSent = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.status = 'succeeded';
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.user = action.payload;
        state.otpSent = false; // Reset OTP sent state after verification
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetUser } = authSlice.actions;
export default authSlice.reducer;
