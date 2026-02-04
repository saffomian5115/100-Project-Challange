import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { carsApi } from '../api';

export default function Profile() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carsApi.myListings()
      .then(setListings)
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="py-4">
      <h1 className="mb-4">My Profile</h1>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>Account Info</Card.Header>
            <Card.Body>
              <p><strong>Name</strong><br />{user?.name}</p>
              <p><strong>Email</strong><br />{user?.email}</p>
              <p><strong>Phone</strong><br />{user?.phone || '—'}</p>
              <Button as={Link} to="/add-car" variant="primary" size="sm">Sell a Car</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>My Listings</span>
              <Button as={Link} to="/add-car" variant="outline-primary" size="sm">+ Add Car</Button>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4"><Spinner animation="border" /></div>
              ) : listings.length === 0 ? (
                <p className="text-muted mb-0">You haven't listed any cars yet. <Link to="/add-car">List your first car</Link>.</p>
              ) : (
                <div className="list-group list-group-flush">
                  {listings.map((car) => (
                    <div key={car._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{car.title}</strong>
                        <span className="text-muted ms-2">${car.price?.toLocaleString()}</span>
                      </div>
                      <div>
                        <Button as={Link} to={`/cars/${car._id}`} variant="outline-secondary" size="sm" className="me-1">View</Button>
                        <Button as={Link} to={`/cars/${car._id}/edit`} variant="outline-primary" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
