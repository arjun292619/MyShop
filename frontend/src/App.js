import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, Products, ProductDetail } from './pages';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/product">
          <Products />
        </Route>
        <Route exact path="/product/:id" children={<ProductDetail />} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
