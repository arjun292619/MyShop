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

export const userLoginReducer = (
  state = { loading: false, userInfo: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_BEGIN:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: true, userInfo: action.payload };
    case USER_LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return { ...state, loading: false, userInfo: null, error: null };
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = { loading: false, userInfo: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_BEGIN:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_REGISTER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userGetProfileReducer = (
  state = { loading: true, userProfile: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_GET_PROFILE_BEGIN:
      return { ...state, loading: true };
    case USER_GET_PROFILE_SUCCESS:
      return { ...state, loading: false, userProfile: action.payload };
    case USER_GET_PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case USER_GET_PROFILE_RESET:
      return { loading: false, userProfile: null, error: false };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = {
    loading: false,
    updatedProfile: null,
    success: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_BEGIN:
      return { ...state, loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        updatedProfile: action.payload,
      };
    case USER_UPDATE_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_UPDATE_PROFILE_RESET:
      return {
        ...state,
        loading: false,
        userInfo: null,
        success: false,
        error: false,
      };
    default:
      return state;
  }
};

export const userListReducer = (
  state = { loading: false, users: [], error: false },
  action
) => {
  switch (action.type) {
    case USER_LIST_BEGIN:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case USER_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { loading: false, users: [], error: false };
    default:
      return state;
  }
};

export const userDeleteReducer = (
  state = { loading: false, success: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_DELETE_BEGIN:
      return { ...state, loading: true };
    case USER_DELETE_SUCCESS:
      return { ...state, loading: false, success: action.payload };
    case USER_DELETE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
