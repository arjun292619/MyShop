import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { Product } from '../components';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      const { data } = res.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="main-clearance main-height">
      <h1>All Products</h1>
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
    </Container>
  );
};

export default ProductsPage;
