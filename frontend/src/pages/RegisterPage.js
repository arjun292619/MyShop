import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Loader, Message, FormContainer } from '../components';
import { registerUser } from '../actions';

const RegisterPage = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { loading, userInfo, error } = useSelector(
    (state) => state.userRegistration
  );

  const history = useHistory();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.password !== input.confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(registerUser(input.name, input.email, input.password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [userInfo, history]);

  return (
    <FormContainer>
      <h1>Sign Up here</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="registration">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            value={input.name}
            onChange={inputChangeHandler}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={input.email}
            onChange={inputChangeHandler}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter password"
            value={input.password}
            onChange={inputChangeHandler}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Enter Confirm Password"
            value={input.confirmPassword}
            onChange={inputChangeHandler}
          />
        </Form.Group>

        <Button type="submit" className="w-100 p-4 mb-3">
          Register
        </Button>
      </Form>
      <Row>
        <Col className="text-center">
          Have an Account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
