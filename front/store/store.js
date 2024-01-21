import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productsReducer } from "./productsSlice";
import { categoriesReducer } from "./categoriesSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
