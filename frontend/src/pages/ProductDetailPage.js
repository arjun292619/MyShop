import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from 'react-bootstrap';

import { Stars } from '../components';

const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      const { data } = res.data;
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const { name, description, price, image, rating, countInStock, numReviews } =
    product;

  return (
    <Container className="main-height main-clearance">
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={image} alt={name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Stars rating={rating} reviews={numReviews} color="#FFC300" />
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>$ {price}</h3>
            </ListGroup.Item>
            <ListGroup.Item>{description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>
                    <strong>$ {price}</strong>{' '}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    <strong>{`${
                      countInStock ? 'In Stock' : 'Out of Stock'
                    }`}</strong>{' '}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button
                    type="button"
                    variant="primary"
                    block
                    className="py-3"
                    disabled={countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
