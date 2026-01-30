import React from 'react';
import { Form, FormControl, Container, Row, Col } from 'react-bootstrap';

const Header = ({ onSearch }) => {
  return (
    <header className="bg-dark text-white py-3 sticky-top shadow">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="mb-3 mb-md-0">
            <div className="d-flex align-items-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/744/744465.png" 
                alt="AutoElite Logo" 
                className="img-fluid"
                style={{ height: '50px', marginRight: '15px' }}
              />
              <div>
                <h1 className="h3 mb-0">AutoElite Motors</h1>
                <small className="text-warning">Premium Car Dealership</small>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className="d-flex">
              <Form className="w-100 me-3">
                <FormControl
                  type="search"
                  placeholder="Search cars by name or brand..."
                  className="w-100"
                  aria-label="Search cars"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </Form>
              <div className="text-end d-none d-md-block">
                <div className="text-warning">(555) 123-4567</div>
                <small className="text-muted">24/7 Support</small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;