import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { carsApi } from '../api';

export default function Profile() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadListings = () => {
    carsApi.myListings()
      .then(setListings)
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    loadListings();
  }, []);

  const handleDelete = async (car) => {
    if (!confirm(`Delete listing "${car.title}"? It will be removed from the site.`)) return;
    try {
      await carsApi.delete(car._id);
      loadListings();
    } catch (e) {
      alert(e.message || 'Failed to delete');
    }
  };

  return (
    <Container className="py-4 py-lg-5">
      <h1 className="mb-4 fw-bold animate-fade-in">My Profile</h1>
      <Row>
        <Col lg={4} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm h-100 animate-fade-in-up">
            <Card.Header className="bg-white fw-semibold border-bottom">Account Info</Card.Header>
            <Card.Body>
              <p><strong>Name</strong><br />{user?.name}</p>
              <p><strong>Email</strong><br />{user?.email}</p>
              <p><strong>Phone</strong><br />{user?.phone || '—'}</p>
              <Button as={Link} to="/add-car" variant="primary" size="sm" className="btn-hover-lift">Sell a Car</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8}>
          <Card className="border-0 shadow-sm animate-fade-in-up">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white fw-semibold border-bottom">
              <span>My Listings</span>
              <Button as={Link} to="/add-car" variant="outline-primary" size="sm" className="btn-hover-lift">+ Add Car</Button>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4"><Spinner animation="border" className="spinner-glow" /></div>
              ) : listings.length === 0 ? (
                <p className="text-muted mb-0">You haven't listed any cars yet. <Link to="/add-car">List your first car</Link>.</p>
              ) : (
                <div className="list-group list-group-flush">
                  {listings.map((car) => (
                    <div key={car._id} className="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2 py-3 listing-item">
                      <div>
                        <strong>{car.title}</strong>
                        <span className="text-muted ms-2">${car.price?.toLocaleString()}</span>
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        <Button as={Link} to={`/cars/${car._id}`} variant="outline-secondary" size="sm" className="btn-hover-lift">View</Button>
                        <Button as={Link} to={`/cars/${car._id}/edit`} variant="outline-primary" size="sm" className="btn-hover-lift">Edit</Button>
                        <Button variant="outline-danger" size="sm" className="btn-hover-lift" onClick={() => handleDelete(car)}>Delete</Button>
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
