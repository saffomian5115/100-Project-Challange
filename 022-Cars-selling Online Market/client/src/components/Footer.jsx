import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">CarMarket</h5>
            <p className="small text-secondary mb-0">Your trusted platform for buying and selling cars online.</p>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="text-uppercase fw-semibold mb-3 opacity-75">Quick Links</h6>
            <ul className="list-unstyled small footer-links">
              <li className="mb-2"><Link to="/" className="text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/cars" className="text-decoration-none">Browse Cars</Link></li>
              <li className="mb-2"><Link to="/about" className="text-decoration-none">About</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-decoration-none">Contact</Link></li>
            </ul>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="text-uppercase fw-semibold mb-3 opacity-75">Account</h6>
            <ul className="list-unstyled small footer-links">
              <li className="mb-2"><Link to="/login" className="text-decoration-none">Login</Link></li>
              <li className="mb-2"><Link to="/register" className="text-decoration-none">Register</Link></li>
            </ul>
          </Col>
          <Col md={4} className="text-md-end">
            <h6 className="text-uppercase fw-semibold mb-3 opacity-75">Contact</h6>
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
