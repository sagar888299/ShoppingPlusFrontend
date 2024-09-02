import { createSlice } from "@reduxjs/toolkit";
import { addCartToBackend, getCartFromBackend, fetchCartWithProducts } from "./CartActions"; // Adjust the path if necessary

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    fetchItems: [],         // Array to store cart items
    statusItems: "idle",  
    statusFecth : "idle"  ,     // Possible values: 'idle', 'loading', 'succeeded', 'failed'
    error: null             // To store error messages
  },
  reducers: {
    increaseQuantity: (state, action) => {
      const { orderId } = action.payload;
      const item = state.fetchItems.cartWithProducts.find(item => item.orderId === orderId);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
   
      const { orderId } = action.payload;
      const item = state.fetchItems.cartWithProducts.find(item => item.orderId === orderId);
      if (item && item.quantity > 1) { // Prevent going below 1
        item.quantity -= 1;
      }
    },
    addProductToCart: (state, action) => {
     
      const newProduct = action.payload;
      state.fetchItems.cartWithProducts.push(newProduct);
    }
  },
  extraReducers: (builder) => {
    builder
      // Add item to cart
      .addCase(addCartToBackend.pending, (state) => {
        state.statusItems = "loading";
      })
      .addCase(addCartToBackend.fulfilled, (state, action) => {
        state.statusItems = "false";
      })
      .addCase(addCartToBackend.rejected, (state, action) => {
        state.statusItems = "failed";
        state.error = action.payload;
      })
      // Get cart from backend
      .addCase(getCartFromBackend.pending, (state) => {
        state.statusItems = "loading";
      })
      .addCase(getCartFromBackend.fulfilled, (state, action) => {
        state.statusItems = "false";
        state.items = action.payload; // Assuming payload contains cart items
      })
      .addCase(getCartFromBackend.rejected, (state, action) => {
        state.statusItems = "failed";
        state.error = action.payload;
      })
      // Fetch cart with products
      .addCase(fetchCartWithProducts.pending, (state) => {
        state.statusFecth = "loading";
        state.error = null;
      })
      .addCase(fetchCartWithProducts.fulfilled, (state, action) => {
        state.statusFecth = "false";
        state.fetchItems = action.payload; // Store fetched items with products in fetchItems
      })
      .addCase(fetchCartWithProducts.rejected, (state, action) => {
        state.statusFecth = "failed";
        state.error = action.payload || 'Failed to fetch cart with products';
      });
  }
});

export const { increaseQuantity, decreaseQuantity, addProductToCart} = cartSlice.actions;
export default cartSlice.reducer;
