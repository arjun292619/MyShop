import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container>
      <Row>
        <Col className="text-center py-3">
          <p>
            Copyright <i className="fa fa-copyright">{'  '}</i>
            <span> Proshop</span>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
