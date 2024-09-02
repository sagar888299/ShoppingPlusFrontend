import { createSelector } from "@reduxjs/toolkit";

// Select the authentication state slice
const selectAuthState = (state) => state.auth;

// Create a selector to get the user
const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

// Create a selector to get the loading state
const selectLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);

// Create a selector to get the error state
const selectError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

export { selectUser, selectLoading, selectError };
