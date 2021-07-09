import {
  PRODUCT_LIST_BEGIN,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
} from '../constants/productConstants';
import axios from 'axios';

export const getListProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BEGIN });

    const res = await axios.get('/api/products');
    const { data } = res.data;

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_LIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};