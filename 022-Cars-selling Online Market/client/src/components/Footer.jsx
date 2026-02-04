import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5>CarMarket</h5>
            <p className="small text-secondary">Your trusted platform for buying and selling cars online.</p>
          </Col>
          <Col md={2}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
              <li><Link to="/cars" className="text-secondary text-decoration-none">Browse Cars</Link></li>
              <li><Link to="/about" className="text-secondary text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-secondary text-decoration-none">Contact</Link></li>
            </ul>
          </Col>
          <Col md={2}>
            <h6>Account</h6>
            <ul className="list-unstyled small">
              <li><Link to="/login" className="text-secondary text-decoration-none">Login</Link></li>
              <li><Link to="/register" className="text-secondary text-decoration-none">Register</Link></li>
            </ul>
          </Col>
          <Col md={4} className="text-md-end">
            <h6>Contact</h6>
            <p className="small text-secondary mb-0">support@carmarket.com</p>
            <p className="small text-secondary">+1 (555) 123-4567</p>
          </Col>
        </Row>
        <hr className="border-secondary my-3" />
        <p className="small text-center text-secondary mb-0">&copy; {new Date().getFullYear()} CarMarket. All rights reserved.</p>
      </Container>
    </footer>
  );
}
