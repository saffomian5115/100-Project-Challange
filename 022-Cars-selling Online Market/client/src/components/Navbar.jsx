import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container, Navbar as BSNavbar, Nav, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { 
  FaCar, 
  FaHome, 
  FaInfo, 
  FaEnvelope, 
  FaPlus, 
  FaShieldAlt,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaList,
  FaCrown
} from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import './Navbar.css'; // Create this CSS file

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BSNavbar 
      expand="lg" 
      className="cyber-navbar sticky-top"
      variant="dark"
    >
      <Container>
        {/* Brand with Futuristic Logo */}
        <BSNavbar.Brand as={Link} to="/" className="cyber-brand">
          <div className="brand-container">
            <FaCar className="brand-icon" />
            <span className="brand-text">
              CAR<span className="neon-text">MARKET</span>
            </span>
            <div className="brand-glow"></div>
          </div>
        </BSNavbar.Brand>

        <BSNavbar.Toggle 
          aria-controls="navbar-nav" 
          className="cyber-toggle"
        >
          <FiMenu className="toggle-icon" />
        </BSNavbar.Toggle>

        <BSNavbar.Collapse id="navbar-nav">
          {/* Main Navigation */}
          <Nav className="me-auto">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `cyber-nav-link ${isActive ? 'active' : ''}`
              }
              end
            >
              <FaHome className="nav-icon" />
              <span className="nav-text">HOME</span>
              <span className="link-glow"></span>
            </NavLink>

            <NavLink 
              to="/cars" 
              className={({ isActive }) => 
                `cyber-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaCar className="nav-icon" />
              <span className="nav-text">BROWSE</span>
              <span className="link-glow"></span>
            </NavLink>

            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `cyber-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaInfo className="nav-icon" />
              <span className="nav-text">ABOUT</span>
              <span className="link-glow"></span>
            </NavLink>

            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `cyber-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaEnvelope className="nav-icon" />
              <span className="nav-text">CONTACT</span>
              <span className="link-glow"></span>
            </NavLink>

            {user && (
              <>
                <NavLink 
                  to="/add-car" 
                  className={({ isActive }) => 
                    `cyber-nav-link sell-link ${isActive ? 'active' : ''}`
                  }
                >
                  <FaPlus className="nav-icon" />
                  <span className="nav-text">SELL</span>
                  <span className="link-glow"></span>
                </NavLink>
                
                {user.role === 'admin' && (
                  <NavLink 
                    to="/admin" 
                    className={({ isActive }) => 
                      `cyber-nav-link admin-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <FaCrown className="nav-icon" />
                    <span className="nav-text">ADMIN</span>
                    <span className="link-glow"></span>
                  </NavLink>
                )}
              </>
            )}
          </Nav>

          {/* User Section */}
          <Nav className="cyber-user-section">
            {user ? (
              <div className="cyber-dropdown-wrapper">
                <div className="user-badge">
                  <div className="user-avatar-mini">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <NavDropdown 
                    title={
                      <span className="user-name">
                        {user.name.split(' ')[0]}
                      </span>
                    } 
                    align="end"
                    className="cyber-dropdown"
                  >
                    <div className="dropdown-header-glow">
                      <div className="user-info-preview">
                        <div className="user-avatar-large">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                          <span className="user-fullname">{user.name}</span>
                          <span className="user-email">{user.email}</span>
                          {user.role === 'admin' && (
                            <span className="user-role-badge">ADMIN</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <NavDropdown.Divider className="dropdown-divider-cyber" />
                    
                    <NavDropdown.Item as={Link} to="/profile" className="dropdown-cyber-item">
                      <FaUser className="dropdown-icon" />
                      <span>PROFILE</span>
                    </NavDropdown.Item>
                    
                    <NavDropdown.Item as={Link} to="/my-listings" className="dropdown-cyber-item">
                      <FaList className="dropdown-icon" />
                      <span>MY LISTINGS</span>
                    </NavDropdown.Item>
                    
                    <NavDropdown.Divider className="dropdown-divider-cyber" />
                    
                    <NavDropdown.Item onClick={handleLogout} className="dropdown-cyber-item logout-item">
                      <FaSignOutAlt className="dropdown-icon" />
                      <span>LOGOUT</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </div>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className="cyber-nav-link auth-link"
                >
                  <FaSignInAlt className="nav-icon" />
                  <span className="nav-text">LOGIN</span>
                  <span className="link-glow"></span>
                </NavLink>
                
                <NavLink 
                  to="/register" 
                  className="cyber-nav-link auth-link register-link"
                >
                  <FaUserPlus className="nav-icon" />
                  <span className="nav-text">REGISTER</span>
                  <span className="link-glow"></span>
                </NavLink>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
      
      {/* Animated Scanner Effect */}
      <div className="navbar-scanner"></div>
    </BSNavbar>
  );
}