import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_CALCULATE_PRICES,
} from '../constants/cartConstants';

export const cartReducer = (
  state = {
    cartItems: [],
    shippingAddress: null,
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find((item) => {
        return item.productId === action.payload.productId;
      });

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((current) => {
            if (current.productId === existItem.productId) {
              //   return { ...current, qty: current.qty + action.payload.qty };
              return action.payload;
            } else {
              return current;
            }
          }),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((cartItem) => {
          return cartItem.productId !== action.payload;
        }),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_CALCULATE_PRICES:
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        action.payload;
      return { ...state, itemsPrice, shippingPrice, taxPrice, totalPrice };
    default:
      return state;
  }
};
