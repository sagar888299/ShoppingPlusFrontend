import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for adding an item to the cart
const addCartToBackend = createAsyncThunk(
  'cart/addCartToBackend',
  async ({ phoneNumber, orderId, quantity }, thunkAPI) => {
    try {
      // Adjust the endpoint based on your Spring Boot configuration
      const response = await axios.post('http://shoppingplusbackend-production.up.railway.app/api/cart/add', {
        phoneNumber,
        orderId,
        quantity
      });
      console.log(orderId,"odrderId");
      console.log(phoneNumber,"phone");
      return response.data; // Assuming the response contains the updated cart
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error occurred');
    }
  }
);

// Thunk for getting cart items based on phone number
const getCartFromBackend = createAsyncThunk(
  'cart/getCartFromBackend',
  async ({ phoneNumber }, thunkAPI) => {
    try {
      const response = await axios.get(`http://shoppingplusbackend-production.up.railway.app/api/cart/get/${phoneNumber}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error occurred');
    }
  }
);

const fetchCartWithProducts = createAsyncThunk(
  'cart/fetchCartWithProducts',
  async (cartItems, thunkAPI) => {
    try {
      // Check if cartItems is an array
      if (!Array.isArray(cartItems)) {
        throw new Error('cartItems is not an array');
      }

      let cartWithProducts = [];
      const errors = [];

      console.log("Starting to fetch products for cart items", cartItems);

      for (const item of cartItems) {
        console.log("Fetching product for item:", item);

        try {
          const productResponse = await axios.get(`https://dummyjson.com/products/${item.orderId}`);
          const product = productResponse.data;

          console.log("Product fetched:", product);

          cartWithProducts.push({
            ...product,
            quantity: item.quantity,
          });
        } catch (error) {
          console.error(`Error fetching product with id ${item.orderId}:`, error);
          errors.push({ item, error: error.message });
        }
      }

      console.log("Processed cart with products:", cartWithProducts);

      // Return both the cartWithProducts and any errors encountered
      return { cartWithProducts, errors };
    } catch (error) {
      console.error("Error processing cart:", error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export default fetchCartWithProducts;


export { addCartToBackend, getCartFromBackend , fetchCartWithProducts};
