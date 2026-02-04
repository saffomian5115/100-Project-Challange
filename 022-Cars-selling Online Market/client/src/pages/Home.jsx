import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Carousel, Spinner } from 'react-bootstrap';
import { carsApi, getImageUrl } from '../api';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carsApi.featured()
      .then(setFeatured)
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="bg-dark text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <h1 className="display-4 fw-bold">Find Your Dream Car</h1>
              <p className="lead mb-4">Browse thousands of quality used and new cars. Buy or sell with confidence.</p>
              <Button as={Link} to="/cars" variant="primary" size="lg" className="me-2">Browse Cars</Button>
              <Button as={Link} to="/add-car" variant="outline-light" size="lg">Sell Your Car</Button>
            </Col>
            <Col lg={5} className="d-none d-lg-block text-center">
              <span className="display-1">🚗</span>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <h2 className="text-center mb-4">Featured Listings</h2>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : featured.length === 0 ? (
          <p className="text-center text-muted">No featured cars yet. Be the first to list!</p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {featured.map((car) => (
              <Col key={car._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={getImageUrl(car.images?.[0]) || 'https://placehold.co/400x200?text=No+Image'} alt={car.title} style={{ height: 200, objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title className="text-truncate">{car.title}</Card.Title>
                    <p className="text-muted small mb-1">{car.brand} {car.model} • {car.year}</p>
                    <p className="fw-bold text-primary mb-2">${car.price?.toLocaleString()}</p>
                    <Button as={Link} to={`/cars/${car._id}`} variant="outline-primary" size="sm">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <div className="text-center mt-4">
          <Button as={Link} to="/cars" variant="primary">View All Listings</Button>
        </div>
      </Container>

      <div className="bg-light py-5">
        <Container>
          <Row className="g-4">
            <Col md={4} className="text-center">
              <div className="fs-1 mb-2">🔒</div>
              <h5>Secure & Trusted</h5>
              <p className="text-muted small">Verified sellers and secure transactions</p>
            </Col>
            <Col md={4} className="text-center">
              <div className="fs-1 mb-2">📋</div>
              <h5>Wide Selection</h5>
              <p className="text-muted small">New, used, and certified pre-owned cars</p>
            </Col>
            <Col md={4} className="text-center">
              <div className="fs-1 mb-2">💬</div>
              <h5>Easy Contact</h5>
              <p className="text-muted small">Connect directly with sellers</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
