import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
  ListGroup,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { Message } from '../components';

import { addToCart, removeFromCart } from '../actions/cartActions';

const CartPage = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const qty = +search.split('=')[1] || 1;

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const history = useHistory();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    console.log('Checkout');
    history.push('/login?redirect=shipping');
    return;
  };

  return (
    <Container className="main-height main-clearance">
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty. <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((cartItem) => {
                const { productId, name, image, price, qty, countInStock } =
                  cartItem;
                return (
                  <ListGroup.Item key={productId}>
                    <Row>
                      <Col md={3}>
                        <Image src={image} alt={name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/products/${productId}`}>{name}</Link>
                      </Col>
                      <Col md={2}>${price}</Col>
                      <Col md={2}>
                        <FormControl
                          as="select"
                          size="lg"
                          custom
                          className="px-4 py-2"
                          value={qty}
                          onChange={(e) => {
                            dispatch(addToCart(productId, e.target.value));
                          }}
                        >
                          {Array.from({ length: countInStock }, (_, index) => {
                            return index + 1;
                          }).map((index) => {
                            return (
                              <option key={index} value={index}>
                                {index}
                              </option>
                            );
                          })}
                        </FormControl>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => {
                            removeItemHandler(productId);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((acc, current) => {
                    acc = acc + parseInt(current.qty);
                    return acc;
                  }, 0)}
                  ) items
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2 className="text-center">
                  Amount: $
                  {cartItems
                    .reduce((acc, current) => {
                      acc =
                        acc + parseInt(current.price) * parseInt(current.qty);
                      return acc;
                    }, 0)
                    .toFixed(2)}
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  variant="primary"
                  className="w-100"
                  block
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
