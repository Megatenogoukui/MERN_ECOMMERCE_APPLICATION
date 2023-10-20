export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

export const updateCart = (state) => {
    state.itemsPrice = addDecimals(
        state.cartitems.reduce((acc, item) => {
          return acc + item.price * item.qty;
        }, 0)
      );

      //Calculating the Shipping Price (0 if itemsPrice > 100 else 10$)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);

      //Calculating the Tax Price
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );

      //Calculating the Total Price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      localStorage.setItem('cart', JSON.stringify(state));
}