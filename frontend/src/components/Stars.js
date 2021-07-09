import React from 'react';

const Stars = ({ rating, reviews, color }) => {
  const tempArray = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index} style={{ color }}>
        {rating >= index + 1 ? (
          <i className="fa fa-star"></i>
        ) : rating >= index + 0.5 ? (
          <i className="fas fa-star-half-alt    "></i>
        ) : (
          <i className="far fa-star"></i>
        )}
      </span>
    );
  });
  return (
    <>
      <span>{tempArray}</span>{' '}
      <span>{reviews && `(${reviews} customer reviews)`}</span>
    </>
  );
};

export default Stars;
