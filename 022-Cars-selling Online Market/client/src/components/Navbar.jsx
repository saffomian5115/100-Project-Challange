import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container, Navbar as BSNavbar, Nav, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="md" className="navbar-glass shadow-sm sticky-top">
      <Container>
        <BSNavbar.Brand as={Link} to="/">CarMarket</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="navbar-nav" />
        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/cars" className={({ isActive }) => isActive ? 'active' : ''}>Browse Cars</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</Nav.Link>
            {user && (
              <>
                <Nav.Link as={NavLink} to="/add-car" className={({ isActive }) => isActive ? 'active' : ''}>Sell Car</Nav.Link>
                {user.role === 'admin' && <Nav.Link as={NavLink} to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>Admin</Nav.Link>}
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown title={user.name} align="end">
                <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/my-listings">My Listings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
