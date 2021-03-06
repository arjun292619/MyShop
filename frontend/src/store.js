import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  cartReducer,
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  userLoginReducer,
  userRegisterReducer,
  userGetProfileReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  orderDetailsReducer,
  orderCreateReducer,
  orderPayReducer,
  orderListMyUserReducer,
} from './reducers';

//fetch items from local storage for initial state
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

//fetch userInfo from local storage for initial state
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

//fetch Shipping Address from local Storage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegistration: userRegisterReducer,
  userProfile: userGetProfileReducer,
  updateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderDetails: orderDetailsReducer,
  orderCreate: orderCreateReducer,
  orderPay: orderPayReducer,
  orderMyUserList: orderListMyUserReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
