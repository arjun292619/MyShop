import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, Products, ProductDetail, Cart } from './pages';

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
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
