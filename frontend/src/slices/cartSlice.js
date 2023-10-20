import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils.js";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartitems: [] ,shippingAddress : {} , paymentMethod : 'paypal'};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //add to cart functionality
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartitems.find((x) => x._id === item._id);

      if (existingItem) {
        state.cartitems = state.cartitems.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        state.cartitems = [...state.cartitems, item];
      }
      //Calculating the itemsPrice
      return updateCart(state);
    },
    removeFromCart : (state, action) => {
      state.cartitems = state.cartitems.filter((x) => x._id !== action.payload) 
      return updateCart(state)
    },
    saveShippingAddress : (state ,action) => {
      state.shippingAddress = action.payload

      return updateCart(state)
    },
    savePaymentMethod : (state , action) => {
      state.paymentMethod = action.payload
      return updateCart(state)
    },
    clearCartItems : (state ,action) =>{
      state.cartitems = []
      return updateCart(state)
    }
  },
});

export const {addToCart ,clearCartItems ,removeFromCart ,saveShippingAddress ,savePaymentMethod} = cartSlice.actions
export default cartSlice.reducer;
