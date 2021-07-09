import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Product, Loader, Message } from '../components';
import { getListProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(getListProducts());
  }, [dispatch]);

  return (
    <main className="py-3 mt-2">
      <Container>
        <h1>Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {products.map((product) => {
              const { _id } = product;
              return (
                <Col key={_id} sm={12} md={6} lg={4} xl={3}>
                  <Product {...product} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </main>
  );
};

export default Home;
