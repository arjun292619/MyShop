import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
} from 'react-bootstrap';

import { Stars, Loader, Message } from '../components';
import { getSingleProduct } from '../actions/productActions';

const ProductDetailPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((state) => {
    return state.productDetails;
  });

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id, dispatch]);

  const { name, description, price, image, rating, countInStock, numReviews } =
    product;

  const options = Array.from({ length: countInStock }, (_, index) => {
    return index + 1;
  });

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Container className="main-height main-clearance">
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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

                {countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty: </Col>
                      <Col>
                        <FormControl
                          as="select"
                          size="lg"
                          custom
                          className="px-4 py-2"
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {options.map((index) => {
                            return (
                              <option key={index} value={index}>
                                {index}
                              </option>
                            );
                          })}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row>
                    <Button
                      type="button"
                      variant="primary"
                      block
                      className="w-100"
                      disabled={countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetailPage;
