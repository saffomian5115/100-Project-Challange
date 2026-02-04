import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { carsApi, getImageUrl } from '../api';

const MAX_IMAGES = 5;
const ACCEPT_IMAGES = 'image/jpeg,image/jpg,image/png,image/gif,image/webp';

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    carsApi.get(id)
      .then((car) => {
        setForm({
          title: car.title,
          description: car.description,
          brand: car.brand,
          model: car.model,
          year: String(car.year),
          price: String(car.price),
          mileage: String(car.mileage),
          fuelType: car.fuelType,
          transmission: car.transmission,
          condition: car.condition,
          location: car.location || '',
          contactEmail: car.contactEmail || '',
          contactPhone: car.contactPhone || '',
        });
        setExistingImages(car.images || []);
      })
      .catch(() => setError('Car not found'))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files || []).slice(0, MAX_IMAGES - existingImages.length);
    setNewImages(files);
  };

  const removeExistingImage = (idx) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (newImages.length > 0) {
        const formData = new FormData();
        Object.entries(form).forEach(([k, v]) => formData.append(k, v));
        formData.append('existingImages', JSON.stringify(existingImages));
        newImages.forEach((file) => formData.append('images', file));
        await carsApi.updateWithImages(id, formData);
      } else {
        const body = {
          ...form,
          year: Number(form.year),
          price: Number(form.price),
          mileage: Number(form.mileage),
          images: existingImages,
        };
        await carsApi.update(id, body);
      }
      navigate(`/cars/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }
  if (error && !form) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button as={Link} to="/cars">Back</Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Edit Listing</h1>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control name="title" value={form.title} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} required />
            </Form.Group>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand *</Form.Label>
                  <Form.Control name="brand" value={form.brand} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Model *</Form.Label>
                  <Form.Control name="model" value={form.model} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Year *</Form.Label>
                  <Form.Control type="number" name="year" value={form.year} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Price ($) *</Form.Label>
                  <Form.Control type="number" name="price" value={form.price} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Mileage (km) *</Form.Label>
                  <Form.Control type="number" name="mileage" value={form.mileage} onChange={handleChange} required />
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
              <Form.Control name="location" value={form.location} onChange={handleChange} />
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
              <Form.Label>Car Images (up to {MAX_IMAGES} total)</Form.Label>
              {existingImages.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {existingImages.map((src, idx) => (
                    <div key={idx} className="position-relative">
                      <img src={getImageUrl(src)} alt="" style={{ height: 60, width: 80, objectFit: 'cover', borderRadius: 4 }} />
                      <Button type="button" variant="danger" size="sm" className="position-absolute top-0 end-0" style={{ fontSize: 10 }} onClick={() => removeExistingImage(idx)}>×</Button>
                    </div>
                  ))}
                </div>
              )}
              {existingImages.length + newImages.length < MAX_IMAGES && (
                <Form.Control type="file" accept={ACCEPT_IMAGES} multiple onChange={handleNewImages} />
              )}
              {newImages.length > 0 && <small className="text-muted d-block mt-1">{newImages.length} new file(s) selected</small>}
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
