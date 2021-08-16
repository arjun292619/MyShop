import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CALCULATE_PRICES,
} from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    const { data } = res.data;
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productId: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (address) => (dispatch, getState) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: address });

  localStorage.setItem(
    'shippingAddress',
    JSON.stringify(getState().cart.shippingAddress)
  );
};

export const savePaymentMethod = (payment) => async (dispatch, getState) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: payment });
  localStorage.setItem(
    'paymentMethod',
    JSON.stringify(getState().cart.paymentMethod)
  );
};

export const calculateAllPrices = () => async (dispatch, getState) => {
  const { cartItems } = getState().cart;

  const itemsPrice = cartItems
    .reduce((accumulator, cartItem) => {
      const { price, qty } = cartItem;
      accumulator += price * qty;
      return accumulator;
    }, 0)
    .toFixed(2);

  const taxRate = 0.0975;

  const taxPrice = (taxRate * itemsPrice).toFixed(2);

  const shippingPrice = (itemsPrice >= 100 ? 0 : 25).toFixed(2);
  let totalPrice =
    parseFloat(itemsPrice) + parseFloat(taxPrice) + parseFloat(shippingPrice);

  totalPrice = totalPrice.toFixed(2);

  dispatch({
    type: CART_CALCULATE_PRICES,
    payload: { itemsPrice, taxPrice, shippingPrice, totalPrice },
  });
};
