import { createSelector } from 'reselect';

// Selectors
const selectProductsState = state => state.persistedReducer.filter;

export const selectFilteredProducts = createSelector(
  [selectProductsState],
  products => products.filteredProducts
);

export const selectPriceFilter = createSelector(
  [selectProductsState],
  products => products.priceFilter
);
