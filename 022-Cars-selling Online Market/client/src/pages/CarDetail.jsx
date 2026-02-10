import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { carsApi, getImageUrl } from '../api';
import { useAuth } from '../context/AuthContext';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        <Spinner animation="border" className="spinner-glow" />
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

  const handleDelete = async () => {
    if (!confirm(`Delete listing "${car.title}"? It will be removed from the site.`)) return;
    try {
      await carsApi.delete(car._id);
      navigate('/profile');
    } catch (e) {
      alert(e.message || 'Failed to delete');
    }
  };
  const contactEmail = car.contactEmail || (car.seller && car.seller.email);
  const contactPhone = car.contactPhone || (car.seller && car.seller.phone);

  return (
    <Container className="py-4 py-lg-5">
      <Button as={Link} to="/cars" variant="outline-secondary" className="mb-4 btn-hover-lift animate-fade-in">
        ← Back to Listings
      </Button>
      <Row>
        <Col lg={8}>
          <Card className="mb-4 border-0 shadow-sm overflow-hidden animate-fade-in-up">
            <div className="card-img-hover">
            <Card.Img
              variant="top"
              src={getImageUrl(car.images?.[0]) || 'https://placehold.co/800x400?text=No+Image'}
              alt={car.title}
              style={{ maxHeight: 400, objectFit: 'cover', width: '100%' }}
            />
            </div>
            <Card.Body>
              <h1>{car.title}</h1>
              <p className="text-muted h4">${car.price ? car.price.toLocaleString() : 0}</p>
              <hr />
              <p>{car.description}</p>
              <Row className="mt-3 g-2">
                {[
                  ['Brand', car.brand],
                  ['Model', car.model],
                  ['Year', car.year],
                  ['Mileage', car.mileage ? car.mileage.toLocaleString() + ' km' : '-'],
                  ['Fuel', car.fuelType],
                  ['Transmission', car.transmission],
                  ['Condition', car.condition],
                  ['Location', car.location || '-'],
                ].map(([label, val]) => (
                  <Col xs={6} md={3} key={label}>
                    <div className="p-2 rounded bg-light">
                      <strong className="text-muted small d-block">{label}</strong>
                      <span>{val}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card.Header className="bg-white fw-semibold">Seller Info</Card.Header>
            <Card.Body>
              <p className="mb-1"><strong>{car.seller && car.seller.name}</strong></p>
              {contactEmail && <p className="mb-1 small">Email: {contactEmail}</p>}
              {contactPhone && <p className="mb-2 small">Phone: {contactPhone}</p>}
              {!isOwner && (contactEmail || contactPhone) && (
                <Button href={'mailto:' + contactEmail} variant="primary" className="w-100 btn-hover-lift">
                  Contact Seller
                </Button>
              )}
              {isOwner && (
                <div className="d-grid gap-2">
                  <Button as={Link} to={'/cars/' + car._id + '/edit'} variant="outline-primary" className="btn-hover-lift">
                    Edit Listing
                  </Button>
                  <Button variant="outline-danger" className="btn-hover-lift" onClick={handleDelete}>
                    Delete Listing
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
