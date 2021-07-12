import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
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

    default:
      return state;
  }
};
