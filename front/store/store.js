import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./productsSlice";
import { categoriesReducer } from "./categoriesSlice";
import { filtersReducer } from "./filtersSlice";
import { userReducer } from "./userSlice";
import { modalsReducer } from "./modalSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    modals: modalsReducer,
    filters: filtersReducer,
    categories: categoriesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
