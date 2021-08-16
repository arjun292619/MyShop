import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Loader, Message } from '../components';
import { useHistory } from 'react-router-dom';
import { getListProducts } from '../actions';

const AdminProductListPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, products, error } = useSelector(
    (state) => state.productList
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const deleteHandler = () => {
    console.log('Delete product by ID');
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getListProducts());
    } else {
      history.push('/');
    }
  }, [userInfo, dispatch, history]);

  return (
    <Container className="main-height main-clearance">
      <h1>Products</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const { _id, name, price, category, brand } = product;
            return (
              <tr key={_id}>
                <td>{_id}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{category}</td>
                <td>{brand}</td>
                <td>
                  <LinkContainer to={`/admin/products/${_id}/edit`}>
                    <Button variant="info" sz="sm">
                      {' '}
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button sz="sm" variant="danger" onClick={deleteHandler}>
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

export default AdminProductListPage;
