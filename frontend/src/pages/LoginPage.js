import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader, FormContainer } from '../components';
import { loginUser } from '../actions';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const redirect = location.search ? location.search.split('?')[1] : '';

  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector((state) => state.userLogin);

  const history = useHistory();

  useEffect(() => {
    if (userInfo) {
      // console.log(redirect);
      history.push(`/${redirect}`);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mt-5">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-5 w-100 p-3">
          Sign In
        </Button>
      </Form>

      <Row className="py-4">
        <Col className="text-center">
          New Customer? {'  '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>{' '}
          <i className="fa fa-user-plus"></i>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
