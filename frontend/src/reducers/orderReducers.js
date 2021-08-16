import {
  ORDER_CREATE_BEGIN,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_ERROR,
  ORDER_DETAILS_BEGIN,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_ERROR,
  ORDER_PAY_BEGIN,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_ERROR,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_USER_BEGIN,
  ORDER_LIST_MY_USER_SUCCESS,
  ORDER_LIST_MY_USER_ERROR,
  ORDER_LIST_MY_USER_RESET,
} from '../constants/orderConstants';

export const orderDetailsReducer = (
  state = { loading: false, order: {}, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_BEGIN:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, order: action.payload, loading: false };
    case ORDER_DETAILS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderCreateReducer = (
  state = { loading: true, success: null, order: null, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_CREATE_BEGIN:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case ORDER_CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (
  state = { loading: false, success: null, error: null },
  action
) => {
  switch (action.type) {
    case ORDER_PAY_BEGIN:
      return { ...state, loading: true };
    case ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true };
    case ORDER_PAY_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return { ...state, loading: false, success: null, error: null };
    default:
      return state;
  }
};

export const orderListMyUserReducer = (
  state = { loading: false, orders: [], error: null },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_MY_USER_BEGIN:
      return { ...state, loading: true };
    case ORDER_LIST_MY_USER_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case ORDER_LIST_MY_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ORDER_LIST_MY_USER_RESET:
      return { ...state, loading: false, orders: [], error: null };
    default:
      return state;
  }
};
