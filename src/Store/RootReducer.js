import { combineReducers } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import ProductsReducer from '../Components/ProductsReducer';
import CartReducer from '../Components/CartReducer';
import ModalSlice from '../Components/ModalSlice';
import OrderReducer from '../Components/OrderReducer';
import ProfileReducer from '../Components/ProfileReducer';
import LoginAndSignUpReducer from '../Components/LoginAndSignUpReducer';

export const resetState = createAction('RESET_STATE');

const appReducer = combineReducers({
  products: ProductsReducer,
  auth : LoginAndSignUpReducer,
  cart: CartReducer,
  modal : ModalSlice,
  order : OrderReducer,
  profile : ProfileReducer
});

const rootReducer = (state, action) => {
  if (action.type === resetState.type) {
    state = undefined; // Reset state to undefined, triggering initial state
  }
  return appReducer(state, action);
};

export default rootReducer;
