import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice.js";
import authSliceReducer from "./slices/authSlice.js";

// Create a Redux store using configureStore
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Configure the API slice reducer
    cart: cartSliceReducer, // Configure the cart slice reducer
    auth: authSliceReducer, // Configure the authentication slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Configure middleware to include API middleware
  devTools: true, // Enable Redux DevTools extensiozn for debugging
});

// Export the configured Redux store
export default store;
