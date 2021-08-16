import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Message, Loader } from '../components';
import { getOrderDetails, payOrder, resetOrderPay } from '../actions';

const OrderPage = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, order, error } = useSelector((state) => state.orderDetails);

  const {
    orderItems,
    user,
    shippingAddress,
    paymentMethod,
    taxPrice,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    isDelivered,
  } = order;

  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );

  const addPaypalScript = async () => {
    const res = await axios.get('/api/orders/paypal');
    const { data } = res.data;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}&locale=en_US`;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
    dispatch(resetOrderPay());
  };

  useEffect(() => {
    addPaypalScript();
    dispatch(getOrderDetails(id));
    if (successPay) {
      dispatch(getOrderDetails(id));
    }
    if (order.isPaid) {
      addPaypalScript();
      setSdkReady(true);
    }
  }, [dispatch, id, successPay]);

  if (loading) {
    return (
      <Container className="main-height main-clearance">
        <Loader />
      </Container>
    );
  } else if (error) {
    return (
      <Container className="main-height main-clearance">
        <Message variant="danger">{error}</Message>
      </Container>
    );
  } else if (!loading) {
    return (
      <Container className="main-height main-clearance">
        <Row>
          {' '}
          <Col md={9}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order: {id}</h2>
                <p>Name: {user && user.name}</p>
                <p>
                  Email: <a href={user && user.email}>{user && user.email}</a>
                </p>
                <p>
                  {' '}
                  Address: {shippingAddress && shippingAddress.street},{' '}
                  {shippingAddress && shippingAddress.city},
                  {shippingAddress && shippingAddress.postalCode},
                  {shippingAddress && shippingAddress.country}
                </p>
                <div>
                  {isDelivered ? (
                    <Message variant="info">DELIVERED</Message>
                  ) : (
                    <Message variant="danger">NOT DELIVERED</Message>
                  )}
                </div>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment method</h2>
                <p>Payment: {paymentMethod}</p>
                <div>
                  {isPaid ? (
                    <Message variant="info">Paid</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {orderItems && orderItems.length === 0 && (
                  <Message variant="info">Your cart is empty</Message>
                )}
                <ListGroup>
                  {orderItems &&
                    orderItems.map((item) => {
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
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default OrderPage;
