import {
  PRODUCT_LIST_BEGIN,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_DETAILS_BEGIN,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DELETE_BEGIN,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR,
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

export const productDetailsReducer = (
  state = { loading: false, product: { reviews: [] }, error: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_BEGIN:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_DETAILS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = { loading: false, success: null, error: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_DELETE_BEGIN:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case PRODUCT_DELETE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
