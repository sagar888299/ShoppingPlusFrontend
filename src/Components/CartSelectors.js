import { createSelector } from "@reduxjs/toolkit";

// Select the upper reducer state slice
const selectCartState = (state) => state.persistedReducer.cart;

// Create a selector to get the products
const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.cartItems
);

// Create a selector to get the loading state

export { selectCartItems };