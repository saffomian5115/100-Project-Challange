import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaSignInAlt, FaCar, FaShieldAlt, FaRobot, FaFingerprint } from 'react-icons/fa';
import { HiOutlineKey } from 'react-icons/hi';
import { RiLoginCircleLine } from 'react-icons/ri';
import './Auth.css'; // Create this CSS file

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'ACCESS DENIED');
    } finally {
      setLoading(false);
    }
  };

  // Generate random binary string for background effect
  const binaryBackground = () => {
    const chars = '01';
    let result = '';
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  return (
    <div className="auth-container cyberpunk-login">
      {/* Animated Background Grid */}
      <div className="cyber-grid">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="grid-line"></div>
        ))}
      </div>

      {/* Floating Binary Code */}
      <div className="binary-rain">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="binary-stream"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          >
            {binaryBackground()}
          </div>
        ))}
      </div>

      {/* Holographic Circuit Lines */}
      <div className="circuit-lines">
        <div className="circuit-h"></div>
        <div className="circuit-v"></div>
        <div className="circuit-node"></div>
        <div className="circuit-node-2"></div>
      </div>

      <Container className="py-5 position-relative">
        <div className="mx-auto animate-fade-in-up" style={{ maxWidth: 480 }}>
          {/* Logo/Brand Section */}
          <div className="cyber-brand-header text-center mb-5">
            <div className="neon-logo-container">
              <FaCar className="neon-logo-icon" />
              <div className="logo-glow"></div>
            </div>
            <div className="cyber-title">
              <h1 className="glitch-text" data-text="ACCESS PORTAL">ACCESS PORTAL</h1>
              <div className="title-scanner"></div>
            </div>
            <p className="neon-subtitle">Secure Vehicle Marketplace</p>
          </div>

          {/* Login Card */}
          <Card className="cyber-auth-card border-0">
            <div className="card-corner top-left"></div>
            <div className="card-corner top-right"></div>
            <div className="card-corner bottom-left"></div>
            <div className="card-corner bottom-right"></div>
            
            <Card.Body className="p-4 p-lg-5">
              {/* Status Indicator */}
              <div className="auth-status-bar">
                <div className="status-led online"></div>
                <span className="status-text">SECURE CONNECTION: ENCRYPTED</span>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="danger" className="cyber-alert">
                  <div className="alert-content">
                    <FaShieldAlt className="alert-icon" />
                    <span>⚠ {error}</span>
                  </div>
                  <div className="alert-scanner"></div>
                </Alert>
              )}

              {/* Form Header */}
              <div className="auth-header mb-4">
                <div className="auth-icon-container">
                  <FaFingerprint className="auth-icon-main" />
                </div>
                <h2 className="auth-title">IDENTITY VERIFICATION</h2>
                <div className="auth-divider">
                  <span className="divider-text">REQUIRED</span>
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Email Field */}
                <Form.Group className="mb-4 cyber-form-group">
                  <div className={`cyber-input-wrapper ${focusedField === 'email' ? 'focused' : ''}`}>
                    <div className="input-border-glow"></div>
                    <div className="input-icon-wrapper">
                      <FaEnvelope className="input-icon" />
                    </div>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="NEURAL_LINK@IDENTITY.SEC"
                      className="cyber-input"
                      required
                    />
                    <div className="input-scanner"></div>
                  </div>
                  <Form.Text className="input-hint">
                    ➤ Enter registered neural interface ID
                  </Form.Text>
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-4 cyber-form-group">
                  <div className={`cyber-input-wrapper ${focusedField === 'password' ? 'focused' : ''}`}>
                    <div className="input-border-glow"></div>
                    <div className="input-icon-wrapper">
                      <HiOutlineKey className="input-icon" />
                    </div>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••••••••"
                      className="cyber-input"
                      required
                    />
                    <div className="input-scanner"></div>
                  </div>
                  <Form.Text className="input-hint">
                    ➤ Decryption key required
                  </Form.Text>
                </Form.Group>

                {/* Remember/Forgot Options */}
                <div className="auth-options d-flex justify-content-between align-items-center mb-4">
                  <div className="cyber-checkbox">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">
                      <span className="check-glow"></span>
                      Remember ID
                    </label>
                  </div>
                  <Link to="/forgot-password" className="cyber-link">
                    <span className="link-text">FORGOT KEY?</span>
                    <span className="link-glow"></span>
                  </Link>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="cyber-submit-btn w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="loading-container">
                      <div className="cyber-spinner"></div>
                      <span className="loading-text">AUTHORIZING...</span>
                      <div className="spinner-glow"></div>
                    </div>
                  ) : (
                    <>
                      <RiLoginCircleLine className="btn-icon" />
                      <span className="btn-text">INITIALIZE ACCESS</span>
                      <div className="btn-glow"></div>
                      <div className="btn-scanner"></div>
                    </>
                  )}
                </Button>
              </Form>

              {/* Security Badge */}
              <div className="security-badge mt-4">
                <FaShieldAlt className="badge-icon" />
                <div className="badge-text">
                  <span className="encryption-level">AES-256 ENCRYPTION</span>
                  <span className="security-cert">✓ SECURE CONNECTION</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="auth-footer mt-4">
                <div className="footer-scanner"></div>
                <div className="register-prompt">
                  <span className="prompt-text">FIRST TIME ACCESS?</span>
                  <Link to="/register" className="cyber-register-link">
                    <span className="link-text">INITIALIZE ACCOUNT</span>
                    <span className="link-glow"></span>
                    <div className="link-arrow">→</div>
                  </Link>
                </div>
              </div>

              {/* AI Assistant */}
              <div className="ai-assistant">
                <FaRobot className="ai-icon" />
                <span className="ai-message">AI: Ready to assist with secure access</span>
                <div className="ai-pulse"></div>
              </div>
            </Card.Body>
          </Card>

          {/* System Status */}
          <div className="system-status mt-4">
            <div className="status-grid">
              <div className="status-item">
                <div className="status-dot green"></div>
                <span>MAINFRAME ONLINE</span>
              </div>
              <div className="status-item">
                <div className="status-dot green"></div>
                <span>SECURE LINK ACTIVE</span>
              </div>
              <div className="status-item">
                <div className="status-dot yellow"></div>
                <span>AWAITING INPUT</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}