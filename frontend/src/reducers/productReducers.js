import {
  PRODUCT_LIST_BEGIN,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
} from '../constants/productConstants';

export const productListReducer = (
  state = { loading: true, products: [], error: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_BEGIN:
      return { ...state, loading: true };

    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case PRODUCT_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
