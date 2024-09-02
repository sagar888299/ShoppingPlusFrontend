import { configureStore } from '@reduxjs/toolkit'
import RootReducer from './RootReducer'
import { loadState,saveState } from '../Util/localStorageUtils';
// Load initial state from localStorage
const preloadedState = loadState();

const store = configureStore({
  reducer: RootReducer,
  preloadedState, // Use the loaded state as the initial state
});

// Subscribe to store changes to save state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;