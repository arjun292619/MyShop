import React from 'react';
import { Card } from 'react-bootstrap';
import Stars from './Stars';
import { Link } from 'react-router-dom';

const Product = ({
  _id,
  name,
  description,
  price,
  image,
  rating,
  countInStock,
  numReviews,
}) => {
  return (
    <Card className="p-2 my-3">
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title>{name}</Card.Title>
        </Link>
        <Card.Text as="div" className="my-3">
          <Stars rating={rating} reviews={numReviews} color="#FFC300" />
        </Card.Text>
        <Card.Text as="div">
          <h3 className="my-3">${price}</h3>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
