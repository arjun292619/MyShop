import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import {
  Home,
  Products,
  ProductDetail,
  Cart,
  Login,
  Register,
  Profile,
  Shipping,
  Payment,
  PlaceOrder,
  AdminUserList,
  EditUser,
  AdminProductList,
  Order,
} from './pages';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products/:id" children={<ProductDetail />} />
        <Route path="/cart/:id?">
          <Cart />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/shipping">
          <Shipping />
        </Route>
        <Route exact path="/payment">
          <Payment />
        </Route>
        <Route exact path="/placeorder">
          <PlaceOrder />
        </Route>
        <Route path="/orders/:id" children={<Order />} />
        <Route exact path="/admin/users">
          <AdminUserList />
        </Route>
        <Route
          exact
          path="/admin/users/:id/edit"
          children={<EditUser />}
        ></Route>
        <Route path="/admin/products">
          <AdminProductList />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
