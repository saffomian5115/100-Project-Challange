import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { carsApi, getImageUrl } from '../api';
import { useAuth } from '../context/AuthContext';

export default function CarDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carsApi.get(id)
      .then(setCar)
      .catch((e) => setError(e.message || 'Car not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }
  if (error || !car) {
    return (
      <Container className="py-5">
        <p className="text-danger">{error || 'Car not found.'}</p>
        <Button as={Link} to="/cars">Back to Listings</Button>
      </Container>
    );
  }

  const isOwner = user && car.seller && car.seller._id === user._id;
  const contactEmail = car.contactEmail || (car.seller && car.seller.email);
  const contactPhone = car.contactPhone || (car.seller && car.seller.phone);

  return (
    <Container className="py-4">
      <Button as={Link} to="/cars" variant="outline-secondary" className="mb-3">
        Back to Listings
      </Button>
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src={getImageUrl(car.images?.[0]) || 'https://placehold.co/800x400?text=No+Image'}
              alt={car.title}
              style={{ maxHeight: 400, objectFit: 'cover' }}
            />
            <Card.Body>
              <h1>{car.title}</h1>
              <p className="text-muted h4">${car.price ? car.price.toLocaleString() : 0}</p>
              <hr />
              <p>{car.description}</p>
              <Row className="mt-3">
                <Col xs={6} md={3}><strong>Brand</strong><br />{car.brand}</Col>
                <Col xs={6} md={3}><strong>Model</strong><br />{car.model}</Col>
                <Col xs={6} md={3}><strong>Year</strong><br />{car.year}</Col>
                <Col xs={6} md={3}><strong>Mileage</strong><br />{car.mileage ? car.mileage.toLocaleString() : 0} km</Col>
                <Col xs={6} md={3}><strong>Fuel</strong><br />{car.fuelType}</Col>
                <Col xs={6} md={3}><strong>Transmission</strong><br />{car.transmission}</Col>
                <Col xs={6} md={3}><strong>Condition</strong><br />{car.condition}</Col>
                <Col xs={6} md={3}><strong>Location</strong><br />{car.location || '-'}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header>Seller Info</Card.Header>
            <Card.Body>
              <p className="mb-1"><strong>{car.seller && car.seller.name}</strong></p>
              {contactEmail && <p className="mb-1 small">Email: {contactEmail}</p>}
              {contactPhone && <p className="mb-2 small">Phone: {contactPhone}</p>}
              {!isOwner && (contactEmail || contactPhone) && (
                <Button href={'mailto:' + contactEmail} variant="primary" className="w-100">
                  Contact Seller
                </Button>
              )}
              {isOwner && (
                <Button as={Link} to={'/cars/' + car._id + '/edit'} variant="outline-primary" className="w-100">
                  Edit Listing
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
