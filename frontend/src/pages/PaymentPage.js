import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer, CheckoutSteps } from '../components';
import { useHistory } from 'react-router-dom';
import { savePaymentMethod } from '../actions';
const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const [check, setCheck] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    //improve the conditional part of code as it checks only for street
    if (shippingAddress && !shippingAddress.street) {
      history.push('/shipping');
    }
  }, [shippingAddress, history]);

  const inputHandler = (e) => {
    setPaymentMethod(e.target.value);
    setCheck(!check);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Container className="main-clearance">
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="paymentMethod">
            <Form.Label>
              <h5>Select Payment Method</h5>
            </Form.Label>
            <Col>
              <Form.Check
                type="radio"
                name="paymentMethod"
                value="Paypal"
                label="Paypal or Credit Card"
                onChange={inputHandler}
                checked={check}
              />
              <Form.Check
                type="radio"
                label="Stripe"
                name="paymentMethod"
                value="Stripe"
                onChange={inputHandler}
              />
            </Col>
          </Form.Group>
          <Button type="submit">continue</Button>
        </Form>
      </Container>
    </FormContainer>
  );
};

export default PaymentPage;
