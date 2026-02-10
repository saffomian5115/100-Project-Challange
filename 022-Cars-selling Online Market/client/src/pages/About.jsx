import { Container, Row, Col, Card } from 'react-bootstrap';

export default function About() {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 fw-bold animate-fade-in">About CarMarket</h1>
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <p className="lead text-center animate-fade-in-up">CarMarket is your trusted online platform for buying and selling cars. We connect buyers with verified sellers and make the process simple, transparent, and secure.</p>
        </Col>
      </Row>
      <Row className="g-4 mb-5 stagger-children">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm card-hover">
            <Card.Body className="text-center p-4">
              <div className="display-4 mb-3">🎯</div>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text className="text-muted">To make car buying and selling easy, transparent, and stress-free for everyone.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm card-hover">
            <Card.Body className="text-center p-4">
              <div className="display-4 mb-3">✓</div>
              <Card.Title>Quality Listings</Card.Title>
              <Card.Text className="text-muted">We encourage detailed listings with clear photos and honest descriptions so you can buy with confidence.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm card-hover">
            <Card.Body className="text-center p-4">
              <div className="display-4 mb-3">🤝</div>
              <Card.Title>Direct Contact</Card.Title>
              <Card.Text className="text-muted">Connect directly with sellers. No middlemen, no hidden fees—just straightforward deals.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <h2 className="mb-4 fw-semibold">Why Choose Us?</h2>
          <ul className="list-unstyled">
            <li className="mb-2">• Wide selection of new, used, and certified pre-owned vehicles</li>
            <li className="mb-2">• Advanced search and filters to find the perfect car</li>
            <li className="mb-2">• Secure user accounts and verified contact options</li>
            <li className="mb-2">• Easy listing process for sellers</li>
            <li className="mb-2">• Responsive support when you need it</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
