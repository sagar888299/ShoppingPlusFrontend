import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Update getProducts to accept a category ID parameter
const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({ category, search }, { rejectWithValue }) => {
    try {
      let url = 'https://dummyjson.com/products/';
      if (category) {
        url += `category/${category}`;
      } else if (search) {
        url += `search?q=${search}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, thunkAPI) => {
    const url = `https://dummyjson.com/products/${productId}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export default getProducts ;

export { getProducts, getProductById };
