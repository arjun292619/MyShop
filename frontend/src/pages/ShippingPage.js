import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer, CheckoutSteps } from '../components';
import { useHistory } from 'react-router-dom';
import { saveShippingAddress } from '../actions';

const ShippingPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddress({ ...address, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(address));
    history.push('/payment');
  };

  useEffect(() => {
    //BUG fix needed here Form not populating after refresh
    if (shippingAddress && shippingAddress.street) {
      const { street, city, postalCode, country } = shippingAddress;
      setAddress({ street, city, postalCode, country });
    }
  }, [shippingAddress]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Container className="main-clearance">
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="street">
            <Form.Label>
              <h5>Street</h5>
            </Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={address.street}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>
              <h5>City</h5>
            </Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={address.city}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>
              <h5>Postal Code</h5>
            </Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>
              <h5>Country</h5>
            </Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={address.country}
              onChange={inputHandler}
            />
          </Form.Group>
          <Button type="submit">Continue</Button>
        </Form>
      </Container>
    </FormContainer>
  );
};

export default ShippingPage;
