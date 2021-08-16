import React, { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from '../components';
import { useHistory } from 'react-router-dom';
import { getUserList, deleteUser } from '../actions';

const UserListPage = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { loading, users, error } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: successDelete, error: errorDelete } = useSelector(
    (state) => state.userDelete
  );

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push('/');
    }
  }, [dispatch, history, successDelete, userInfo]);

  return (
    <Container className="main-height main-clearance">
      <h1>Users</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { _id, name, email, isAdmin } = user;
            return (
              <tr key={_id}>
                <td>{_id}</td>
                <td>{name}</td>
                <td>
                  <a href="mailto:{email}">{email}</a>
                </td>
                <td>
                  {isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${_id}/edit`}>
                    <Button variant="info" sz="sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteUserHandler(_id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserListPage;
