import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer, Loader, Message } from '../components';
import { useParams, useHistory, Link } from 'react-router-dom';
import {
  getUserProfile,
  updateUserProfile,
  updateUserProfileReset,
} from '../actions';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    isAdmin: '',
    role: '',
  });

  const { loading, userProfile, error } = useSelector(
    (state) => state.userProfile
  );

  //Extract success adn error values from update handler/submission and redirect to users and display update errors
  const { success: successUpdate, error: errorUpdate } = useSelector(
    (state) => state.updateProfile
  );

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditUser({ ...editUser, [name]: value });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    console.log('Update user Profile');
    dispatch(
      updateUserProfile({
        id,
        name: editUser.name,
        email: editUser.email,
        isAdmin: editUser.isAdmin,
        role: editUser.role,
      })
    );
  };

  useEffect(() => {
    if (!userProfile) {
      dispatch(getUserProfile(id));
    } else if (id !== userProfile._id) {
      dispatch(getUserProfile(id));
    } else {
      const { name, email, isAdmin, role } = userProfile;
      setEditUser({ name, email, isAdmin, role });
    }

    if (successUpdate) {
      dispatch(updateUserProfileReset());
      dispatch(getUserProfile(id));
      history.push('/admin/users');
    }
  }, [id, userProfile, successUpdate, dispatch, history]);
  return (
    <>
      <Link to="/admin/users" className="btn btn-dark mt-5 ms-5">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={updateHandler}>
            <Form.Group controlId="name">
              <Form.Label>
                <h4>name</h4>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editUser.name}
                onChange={inputChangeHandler}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                <h4>Email</h4>
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={editUser.email}
                onChange={inputChangeHandler}
              />
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Label>
                <h4>Is Admin</h4>
              </Form.Label>
              <Form.Control
                as="select"
                name="isAdmin"
                value={editUser.isAdmin}
                onChange={inputChangeHandler}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>
                <h4>Role</h4>
              </Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={editUser.role}
                onChange={inputChangeHandler}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              sz="lg"
              block
              className="w-100 p-3"
            >
              Update User
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditUser;
