import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner, Pagination } from 'react-bootstrap';
import { carsApi, getImageUrl } from '../api';

export default function Cars() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    fuelType: searchParams.get('fuelType') || '',
    transmission: searchParams.get('transmission') || '',
    page: searchParams.get('page') || '1',
  });

  useEffect(() => {
    setLoading(true);
    const params = { page: filters.page, limit: 12 };
    if (filters.search) params.search = filters.search;
    if (filters.brand) params.brand = filters.brand;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.fuelType) params.fuelType = filters.fuelType;
    if (filters.transmission) params.transmission = filters.transmission;
    setSearchParams(params, { replace: true });
    carsApi.list(params)
      .then((res) => {
        setCars(res.cars);
        setTotal(res.total);
        setPages(res.pages);
      })
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value, page: '1' }));
  };

  const handlePageChange = (p) => setFilters((f) => ({ ...f, page: String(p) }));

  return (
    <Container className="py-4">
      <h1 className="mb-4">Browse Cars</h1>
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Header>Filters</Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  placeholder="Brand, model..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Min Price</Form.Label>
                <Form.Control type="number" placeholder="0" value={filters.minPrice} onChange={(e) => handleFilterChange('minPrice', e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Max Price</Form.Label>
                <Form.Control type="number" placeholder="Any" value={filters.maxPrice} onChange={(e) => handleFilterChange('maxPrice', e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fuel Type</Form.Label>
                <Form.Select value={filters.fuelType} onChange={(e) => handleFilterChange('fuelType', e.target.value)}>
                  <option value="">All</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="CNG">CNG</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Transmission</Form.Label>
                <Form.Select value={filters.transmission} onChange={(e) => handleFilterChange('transmission', e.target.value)}>
                  <option value="">All</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </Form.Select>
              </Form.Group>
              <Button variant="outline-secondary" onClick={() => setFilters({ search: '', brand: '', minPrice: '', maxPrice: '', fuelType: '', transmission: '', page: '1' })}>Clear</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          {loading ? (
            <div className="text-center py-5"><Spinner animation="border" /></div>
          ) : cars.length === 0 ? (
            <p className="text-muted">No cars found. Try adjusting filters.</p>
          ) : (
            <>
              <p className="text-muted mb-3">{total} car(s) found</p>
              <Row xs={1} md={2} className="g-4">
                {cars.map((car) => (
                  <Col key={car._id}>
                    <Card className="h-100 shadow-sm">
                      <Card.Img variant="top" src={getImageUrl(car.images?.[0]) || 'https://placehold.co/400x200?text=No+Image'} alt={car.title} style={{ height: 200, objectFit: 'cover' }} />
                      <Card.Body>
                        <Card.Title className="text-truncate">{car.title}</Card.Title>
                        <p className="text-muted small">{car.brand} {car.model} • {car.year} • {car.fuelType} • {car.transmission}</p>
                        <p className="fw-bold text-primary">${car.price?.toLocaleString()}</p>
                        <Button as={Link} to={`/cars/${car._id}`} variant="primary" size="sm">View Details</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              {pages > 1 && (
                <Pagination className="mt-4 justify-content-center">
                  <Pagination.Prev disabled={Number(filters.page) <= 1} onClick={() => handlePageChange(Number(filters.page) - 1)} />
                  {[...Array(pages)].map((_, i) => (
                    <Pagination.Item key={i} active={i + 1 === Number(filters.page)} onClick={() => handlePageChange(i + 1)}>{i + 1}</Pagination.Item>
                  ))}
                  <Pagination.Next disabled={Number(filters.page) >= pages} onClick={() => handlePageChange(Number(filters.page) + 1)} />
                </Pagination>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
