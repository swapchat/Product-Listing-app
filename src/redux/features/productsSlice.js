import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  errorMsg: "",
  data: [],
};

export const getProducts = createAsyncThunk("products", async (category) => {
  const { data } = await axios.get("/products.json");
  const products = data.filter((product) => product.category === category);
  return products;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
      state.errorMsg = "";
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
      state.errorMsg =
        "Error occurred while getting list of products. Please try again";
    });
  },
});

export default productsSlice.reducer;
