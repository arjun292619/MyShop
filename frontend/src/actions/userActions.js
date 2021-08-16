import {
  USER_LOGIN_BEGIN,
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_BEGIN,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_GET_PROFILE_BEGIN,
  USER_GET_PROFILE_SUCCESS,
  USER_GET_PROFILE_ERROR,
  USER_GET_PROFILE_RESET,
  USER_UPDATE_PROFILE_BEGIN,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_ERROR,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_BEGIN,
  USER_LIST_SUCCESS,
  USER_LIST_ERROR,
  USER_LIST_RESET,
  USER_DELETE_BEGIN,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR,
} from '../constants/userConstants';
import { ORDER_LIST_MY_USER_RESET } from '../constants/orderConstants';
import axios from 'axios';

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOGIN_BEGIN });

    const config = { headers: { 'content-type': 'application/json' } };

    const res = await axios.post(
      `/api/auth/login`,
      { email, password },
      config
    );
    const { data } = res.data;

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_GET_PROFILE_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: ORDER_LIST_MY_USER_RESET });
};

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_BEGIN });

    const config = {
      headers: { 'content-type': 'application/json' },
    };

    const res = await axios.post(
      `/api/auth/register`,
      { name, email, password },
      config
    );

    const { data } = res.data;

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserProfile =
  (id = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_GET_PROFILE_BEGIN });

      const {
        userInfo: { token },
      } = getState().userLogin;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const url = id ? `/api/admin/users/${id}` : `/api/auth/profile`;

      const res = await axios.get(url, config);

      const { data } = res.data;

      dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_GET_PROFILE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserProfile =
  (user = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_BEGIN });

      const {
        userInfo: { token },
      } = getState().userLogin;

      const config = {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };
      const url = user ? `/api/admin/users/${user.id}` : `/api/auth/profile`;
      console.log(user, url);

      // const res = await axios.put('/api/auth/profile', user, config);
      const res = await axios.put(url, user, config);

      const { data } = res.data;
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

      if (!user) {
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserProfileReset = () => (dispatch) => {
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
};

export const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_BEGIN });

    const {
      userInfo: { token },
    } = getState().userLogin;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`/api/admin/users`, config);
    const { data } = res.data;

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_BEGIN });

    const {
      userInfo: { token },
    } = getState().userLogin;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.delete(`/api/admin/users/${id}`, config);
    const { success } = res.data;

    dispatch({ type: USER_DELETE_SUCCESS, payload: success });
  } catch (error) {
    dispatch({
      type: USER_DELETE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
