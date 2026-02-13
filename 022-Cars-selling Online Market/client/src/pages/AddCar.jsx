import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { carsApi } from '../api';

const initial = {
  title: '',
  description: '',
  brand: '',
  model: '',
  year: '',
  price: '',
  mileage: '',
  fuelType: 'Petrol',
  transmission: 'Automatic',
  condition: 'Used',
  location: '',
  contactEmail: '',
  contactPhone: '',
};

const MAX_IMAGES = 5;
const ACCEPT_IMAGES = 'image/jpeg,image/jpg,image/png,image/gif,image/webp';

export default function AddCar() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files || []).slice(0, MAX_IMAGES);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (images.length > 0) {
        const formData = new FormData();
        Object.entries(form).forEach(([k, v]) => formData.append(k, v));
        images.forEach((file) => formData.append('images', file));
        const car = await carsApi.createWithImages(formData);
        navigate(`/cars/${car._id}`);
      } else {
        const body = {
          ...form,
          year: Number(form.year),
          price: Number(form.price),
          mileage: Number(form.mileage),
        };
        const car = await carsApi.create(body);
        navigate(`/cars/${car._id}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4 py-lg-5">
      <h1 className="mb-4 fw-bold animate-fade-in">Sell Your Car</h1>
      <Card className="border-0 shadow-sm animate-fade-in-up">
        <Card.Body className="p-4">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control name="title" value={form.title} onChange={handleChange} required placeholder="e.g. 2020 Toyota Camry" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} required />
            </Form.Group>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand *</Form.Label>
                  <Form.Control name="brand" value={form.brand} onChange={handleChange} required placeholder="Toyota" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Model *</Form.Label>
                  <Form.Control name="model" value={form.model} onChange={handleChange} required placeholder="Camry" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Year *</Form.Label>
                  <Form.Control type="number" name="year" value={form.year} onChange={handleChange} required min="1900" max="2030" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Price ($) *</Form.Label>
                  <Form.Control type="number" name="price" value={form.price} onChange={handleChange} required min="0" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Mileage (km) *</Form.Label>
                  <Form.Control type="number" name="mileage" value={form.mileage} onChange={handleChange} required min="0" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fuel Type</Form.Label>
                  <Form.Select name="fuelType" value={form.fuelType} onChange={handleChange}>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="CNG">CNG</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Transmission</Form.Label>
                  <Form.Select name="transmission" value={form.transmission} onChange={handleChange}>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Condition</Form.Label>
              <Form.Select name="condition" value={form.condition} onChange={handleChange}>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Certified">Certified</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control name="location" value={form.location} onChange={handleChange} placeholder="City, State" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control name="contactPhone" value={form.contactPhone} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Car Images (up to {MAX_IMAGES}, JPEG/PNG/GIF/WebP, max 5MB each)</Form.Label>
              <Form.Control type="file" accept={ACCEPT_IMAGES} multiple onChange={handleImages} />
              {images.length > 0 && <small className="text-muted d-block mt-1">{images.length} file(s) selected</small>}
            </Form.Group>
            <Button type="submit" variant="primary" className="btn-hover-lift" disabled={loading}>{loading ? 'Creating...' : 'Create Listing'}</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
