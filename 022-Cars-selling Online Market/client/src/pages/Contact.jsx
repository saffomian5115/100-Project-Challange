import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <Row>
        <Col lg={6} className="mx-auto">
          <Card>
            <Card.Body>
              {sent ? (
                <Alert variant="success">Thank you! We have received your message and will get back to you soon.</Alert>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control name="name" value={form.name} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject *</Form.Label>
                    <Form.Control name="subject" value={form.subject} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control as="textarea" rows={4} name="message" value={form.message} onChange={handleChange} required />
                  </Form.Group>
                  <Button type="submit" variant="primary">Send Message</Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mt-4 mt-lg-0">
          <Card>
            <Card.Header>Other Ways to Reach Us</Card.Header>
            <Card.Body>
              <p className="mb-2"><strong>Email</strong><br />support@carmarket.com</p>
              <p className="mb-2"><strong>Phone</strong><br />+1 (555) 123-4567</p>
              <p className="mb-0"><strong>Address</strong><br />123 Auto Lane, City, State 12345</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
