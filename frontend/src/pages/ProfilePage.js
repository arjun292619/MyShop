import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Loader, Message } from '../components';
import {
  getUserProfile,
  updateUserProfile,
  updateUserProfileReset,
  listMyOrder,
} from '../actions';
import { LinkContainer } from 'react-router-bootstrap';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();

  const { loading, userProfile, error } = useSelector(
    (state) => state.userProfile
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success, error: errorUpdate } = useSelector(
    (state) => state.updateProfile
  );

  const {
    loading: loadingOrders,
    orders,
    error: errorOrders,
  } = useSelector((state) => state.orderMyUserList);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProfile({ ...profile, [name]: value });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (profile.password !== profile.confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          name: profile.name,
          email: profile.email,
          password: profile.password,
        })
      );
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (!userProfile || success) {
      dispatch(updateUserProfileReset());
      dispatch(getUserProfile());
      dispatch(listMyOrder());
    } else {
      const { name, email } = userProfile;
      setProfile({ name, email, password: '', confirmPassword: '' });
    }
  }, [dispatch, userInfo, userProfile, history, success]);

  return (
    <Container className="main-height main-clearance">
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          <Form onSubmit={updateHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profile.name}
                onChange={inputHandler}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                onChange={inputHandler}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={profile.password}
                onChange={inputHandler}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={profile.confirmPassword}
                onChange={inputHandler}
              />
            </Form.Group>
            <Button type="submit">Update</Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders List</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const {
                    _id,
                    isPaid,
                    isDelivered,
                    totalPrice,
                    createdAt,
                    paidAt,
                    deliveredAt,
                  } = order;
                  return (
                    <tr key={_id}>
                      <td>{_id}</td>
                      <td>{createdAt.substring(0, 10)}</td>
                      <td>$ {totalPrice}</td>
                      <td style={{ textAlign: 'center' }}>
                        {isPaid ? (
                          paidAt && paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {isDelivered ? (
                          deliveredAt && deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/orders/${_id}`}>
                          <Button variant="info" size="sm">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
