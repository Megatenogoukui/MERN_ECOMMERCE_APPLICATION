// Utility function to round a number to two decimal places
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Utility function to update cart-related values in the state object
export const updateCart = (state) => {
  // Calculate the total price of all items in the cart
  state.itemsPrice = addDecimals(
      state.cartitems.reduce((acc, item) => {
          return acc + item.price * item.qty;
      }, 0)
  );

  // Calculate the shipping price
  // If itemsPrice is greater than 100, shipping is free (0), otherwise, it's $10
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price (15% of the itemsPrice)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
  
  // Calculate the total price (items price + shipping price + tax price)
  state.totalPrice = (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  ).toFixed(2);

  // Update the cart state in local storage to persist changes
  localStorage.setItem('cart', JSON.stringify(state));
};