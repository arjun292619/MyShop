import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Message, CheckoutSteps } from '../components';
import { calculateAllPrices, createOrder } from '../actions';

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    cartItems,
    shippingAddress: { street, city, postalCode, country },
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state) => state.cart);

  const { success, order, error } = useSelector((state) => state.orderCreate);

  const placeOrderHandler = () => {
    const order = {
      orderItems: cartItems,
      shippingAddress: { street, city, postalCode, country },
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    dispatch(createOrder(order));
  };

  useEffect(() => {
    dispatch(calculateAllPrices());
    if (success) {
      history.push(`/orders/${order._id}`);
    }
  }, [dispatch, itemsPrice, success, history, order]);

  return (
    <Container className="main-height main-clearance">
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        {' '}
        <Col md={9}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {' '}
                Address: {street}, {city},{postalCode},{country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment method</h2>
              <p>Payment: {paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 && (
                <Message variant="info">Your cart is empty</Message>
              )}
              <ListGroup>
                {cartItems.map((item) => {
                  const { productId, name, image, price, qty } = item;

                  return (
                    <ListGroup.Item key={productId}>
                      <Row>
                        <Col md={1}>
                          <Image src={image} alt={name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/products/${productId}`}>{name}</Link>
                        </Col>
                        <Col md={4}>
                          {qty} x ${price} = ${(qty * price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>order summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>$ {shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>$ {totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <Button
                type="button"
                block
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderPage;
