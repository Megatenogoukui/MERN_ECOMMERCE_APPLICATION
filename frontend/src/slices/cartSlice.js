import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils.js";

// Check if there are cart items stored in localStorage, use them as initial state if available
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartitems: [], shippingAddress: {}, paymentMethod: "paypal" };

// Create a cart slice using createSlice from Redux Toolkit
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action for adding items to the cart
    addToCart: (state, action) => {
      const item = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.cartitems.find((x) => x._id === item._id);

      if (existingItem) {
        // If the item exists, update it in the cart
        state.cartitems = state.cartitems.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        // If the item doesn't exist, add it to the cart
        state.cartitems = [...state.cartitems, item];
      }
      // Update the cart state and recalculate cart-related values
      return updateCart(state);
    },
    // Action for removing items from the cart
    removeFromCart: (state, action) => {
      // Remove the item from the cart based on its ID
      state.cartitems = state.cartitems.filter((x) => x._id !== action.payload);
      // Update the cart state and recalculate cart-related values
      return updateCart(state);
    },
    // Action for saving shipping address
    saveShippingAddress: (state, action) => {
      // Save the provided shipping address in the cart state
      state.shippingAddress = action.payload;
      // Update the cart state and recalculate cart-related values
      return updateCart(state);
    },
    // Action for saving payment method
    savePaymentMethod: (state, action) => {
      // Save the provided payment method in the cart state
      state.paymentMethod = action.payload;
      // Update the cart state and recalculate cart-related values
      return updateCart(state);
    },
    // Action for clearing cart items
    clearCartItems: (state) => {
      // Clear all cart items
      state.cartitems = [];
      // Update the cart state and recalculate cart-related values
      return updateCart(state);
    },
  },
});

// Export individual actions for use in components
export const {
  addToCart,
  clearCartItems,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

// Export the cart reducer to be used in the Redux store
export default cartSlice.reducer;
