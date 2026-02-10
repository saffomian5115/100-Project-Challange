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
      <h1 className="text-center mb-4 fw-bold animate-fade-in">Contact Us</h1>
      <Row>
        <Col lg={6} className="mb-4 mb-lg-0">
          <Card className="border-0 shadow-sm animate-fade-in-up">
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
                  <Button type="submit" variant="primary" className="btn-hover-lift">Send Message</Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card.Header className="bg-white fw-semibold border-bottom">Other Ways to Reach Us</Card.Header>
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
