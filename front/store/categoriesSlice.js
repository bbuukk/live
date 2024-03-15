import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoriesInfo = createAsyncThunk(
  "categories/fetchFromDB",
  async () => {
    try {
      const res = await axios.get(`/categories/`);
      
      return { categories: res.data };
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  } 
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: null,
    activeCategory: null,

    categoriesPath: [], //todo what is this for?

    status: "idle",
    error: null,
  },
  reducers: {
    set: (state, action) => {
      state.categories = action.payload;
    },
    create: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    setCategoriesPath: (state, action) => {
      state.categoriesPath = action.payload;
    },
    addToCategoriesPath: (state, action) => {
      state.categoriesPath = [...state.categoriesPath, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategoriesInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.categories;
      })
      .addCase(getCategoriesInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { set, create, setCategoriesPath, addToCategoriesPath } =
  categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
