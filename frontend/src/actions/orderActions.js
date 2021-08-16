import axios from 'axios';
import {
  ORDER_DETAILS_BEGIN,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_ERROR,
  ORDER_CREATE_BEGIN,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_ERROR,
  ORDER_PAY_BEGIN,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_ERROR,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_USER_BEGIN,
  ORDER_LIST_MY_USER_SUCCESS,
  ORDER_LIST_MY_USER_ERROR,
} from '../constants/orderConstants';

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_BEGIN });

    const {
      userInfo: { token },
    } = getState().userLogin;

    const config = { headers: { authorization: `Bearer ${token}` } };

    const url = `/api/orders/${orderId}`;

    const res = await axios.get(url, config);
    const { data } = res.data;

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_BEGIN });

    const {
      userInfo: { token },
    } = getState().userLogin;

    const config = {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post('/api/orders', order, config);
    const { data } = res.data;

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_BEGIN });

      const {
        userInfo: { token },
      } = getState().userLogin;

      const config = {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      const { data } = res.data;

      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const resetOrderPay = () => async (dispatch) => {
  dispatch({ type: ORDER_PAY_RESET });
};

export const listMyOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_USER_BEGIN });

    const {
      userInfo: { token },
    } = getState().userLogin;

    const config = {
      headers: { authorization: `Bearer ${token}` },
    };

    const res = await axios.get(`/api/orders/myorders`, config);

    const { data } = res.data;

    dispatch({ type: ORDER_LIST_MY_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
