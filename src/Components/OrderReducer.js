import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, cancelOrder, addOrder } from "./OrderActions"; // Import the addOrder thunk

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    selectedProducts: [],
    selectedAddress: null, // Add selectedProducts to the state
    loading: false,
    error: null,
  },
  reducers: {
    // Action to update selected products
    updateSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    updateSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling cancelOrder
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Update the orders state with the canceled order
        state.orders = state.orders.map(order =>
          order.orderId === action.payload.orderId ? action.payload : order
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling addOrder
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and the action
export const { updateSelectedProducts, updateSelectedAddress } = ordersSlice.actions;
export default ordersSlice.reducer;
