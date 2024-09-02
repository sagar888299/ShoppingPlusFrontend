import { createSelector } from "@reduxjs/toolkit";

// Select the products state slice
const selectProductsState = (state) => state.products;

// Create a selector to get the products
 const selectProducts = createSelector(
    [selectProductsState],
    (products) => products.list
);

// Create a selector to get the loading state
 const selectLoading = createSelector(
    [selectProductsState],
    (products) => products.loading
);

// Create a selector to get the error state
 const selectError = createSelector(
    [selectProductsState],
    (products) => products.error
);
export  {selectLoading, selectError, selectProducts};