import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsInfo = createAsyncThunk(
  "products/fetchFromDB",
  async () => {
    //todo change to then and catch chain instead of try catch block
    try {
      const res = await axios.get(`/products/`);

      return { products: res.data };
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }
);

//todo delete unneccesary state variables
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    activeProducts: null,
    activeIndiProduct: null,
    status: "idle",
    error: null,
  },
  reducers: {
    set: (state, action) => {
      state.products = action.payload;
    },
    setActive: (state, action) => {
      state.activeProducts = action.payload;
    },
    setActiveIndi: (state, action) => {
      state.activeIndiProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
      })
      .addCase(getProductsInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { set, setActive, setActiveIndi } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
