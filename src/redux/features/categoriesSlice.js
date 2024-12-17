import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  errorMsg: "",
  data: [],
};

export const getCategories = createAsyncThunk(
  "categories",
  async (_, thunkApi) => {
    const response = await axios.get("/categories.json");
    if (response.headers["content-type"] === "application/json") {
      return response.data;
    } else {
      return thunkApi.rejectWithValue();
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
      state.errorMsg = "";
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
      state.errorMsg =
        "Error occurred while getting list of categories. Please try again";
    });
  },
});

export default categoriesSlice.reducer;
