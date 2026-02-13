import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaUserPlus, 
  FaShieldAlt, 
  FaRobot,
  FaIdCard,
  FaFingerprint,
  FaCrown
} from 'react-icons/fa';
import { HiOutlineKey } from 'react-icons/hi';
import { RiUserSharedLine } from 'react-icons/ri';
import './Auth.css'; // Reuse the same Auth.css from Login

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    phone: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    
    if (name === 'password') {
      // Calculate password strength
      let strength = 0;
      if (value.length >= 6) strength += 1;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(Math.min(strength, 5));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setError('You must accept the security protocols');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      navigate('/');
    } catch (err) {
      setError(err.message || 'REGISTRATION FAILED');
    } finally {
      setLoading(false);
    }
  };

  // Generate random binary string for background
  const binaryBackground = () => {
    const chars = '01';
    let result = '';
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const getPasswordStrengthText = () => {
    const levels = ['CRITICAL', 'WEAK', 'FAIR', 'GOOD', 'STRONG', 'SECURE'];
    return levels[passwordStrength];
  };

  const getPasswordStrengthColor = () => {
    const colors = ['#ff3366', '#ff6633', '#ffcc00', '#00cc88', '#00f3ff', '#9d00ff'];
    return colors[passwordStrength];
  };

  return (
    <div className="auth-container cyberpunk-register">
      {/* Animated Background Grid */}
      <div className="cyber-grid">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="grid-line"></div>
        ))}
      </div>

      {/* Floating Binary Code */}
      <div className="binary-rain">
        {[...Array(15)].map((_, i) => (
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
        <div className="circuit-h-2"></div>
        <div className="circuit-v-2"></div>
        <div className="circuit-node"></div>
        <div className="circuit-node-2"></div>
      </div>

      <Container className="py-5 position-relative">
        <div className="mx-auto animate-fade-in-up" style={{ maxWidth: 520 }}>
          {/* Logo/Brand Section */}
          <div className="cyber-brand-header text-center mb-5">
            <div className="neon-logo-container register-logo">
              <RiUserSharedLine className="neon-logo-icon" />
              <div className="logo-glow"></div>
            </div>
            <div className="cyber-title">
              <h1 className="glitch-text" data-text="NEW IDENTITY">NEW IDENTITY</h1>
              <div className="title-scanner"></div>
            </div>
            <p className="neon-subtitle">Create Your Neural Interface</p>
          </div>

          {/* Registration Card */}
          <Card className="cyber-auth-card border-0">
            <div className="card-corner top-left"></div>
            <div className="card-corner top-right"></div>
            <div className="card-corner bottom-left"></div>
            <div className="card-corner bottom-right"></div>
            
            <Card.Body className="p-4 p-lg-5">
              {/* Status Indicator */}
              <div className="auth-status-bar">
                <div className="status-led initializing"></div>
                <span className="status-text">INITIALIZING REGISTRATION PROTOCOL</span>
                <div className="status-progress">
                  <div className="progress-bar"></div>
                </div>
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
                  <FaIdCard className="auth-icon-main" />
                </div>
                <h2 className="auth-title">NEURAL REGISTRATION</h2>
                <div className="auth-divider">
                  <span className="divider-text">IDENTITY INITIALIZATION</span>
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Name Field */}
                <Form.Group className="mb-4 cyber-form-group">
                  <div className={`cyber-input-wrapper ${focusedField === 'name' ? 'focused' : ''}`}>
                    <div className="input-border-glow"></div>
                    <div className="input-icon-wrapper">
                      <FaUser className="input-icon" />
                    </div>
                    <Form.Control
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="DESIGNATE IDENTITY"
                      className="cyber-input"
                      required
                    />
                    <div className="input-scanner"></div>
                  </div>
                  <Form.Text className="input-hint">
                    ➤ Full designation / legal identity
                  </Form.Text>
                </Form.Group>

                {/* Email Field */}
                <Form.Group className="mb-4 cyber-form-group">
                  <div className={`cyber-input-wrapper ${focusedField === 'email' ? 'focused' : ''}`}>
                    <div className="input-border-glow"></div>
                    <div className="input-icon-wrapper">
                      <FaEnvelope className="input-icon" />
                    </div>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="NEURAL_LINK@IDENTITY.NET"
                      className="cyber-input"
                      required
                    />
                    <div className="input-scanner"></div>
                  </div>
                  <Form.Text className="input-hint">
                    ➤ Primary neural interface identifier
                  </Form.Text>
                </Form.Group>

                {/* Password Field with Strength Meter */}
                <Form.Group className="mb-4 cyber-form-group">
                  <div className={`cyber-input-wrapper ${focusedField === 'password' ? 'focused' : ''}`}>
                    <div className="input-border-glow"></div>
                    <div className="input-icon-wrapper">
                      <HiOutlineKey className="input-icon" />
                    </div>
                    <Form.Control
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="ENCRYPTION KEY"
                      className="cyber-input"
                      required
                      minLength={6}
                    />
                    <div className="input-scanner"></div>
                  </div>
                  
                  {/* Password Strength Meter */}
                  {form.password && (
                    <div className="password-strength-meter mt-2">
                      <div className="strength-labels">
                        <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                          {getPasswordStrengthText()}
                        </span>
                        <span className="strength-requirements">
                          {passwordStrength < 3 ? 'INSUFFICIENT' : 'ACCEPTABLE'}
                        </span>
                      </div>
                      <div className="strength-bars">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i}
                            className={`strength-bar ${i < passwordStrength ? 'active' : ''}`}
                            style={{ 
                              backgroundColor: i < passwordStrength ? getPasswordStrengthColor() : 'rgba(255,255,255,0.1)',
                              boxShadow: i < passwordStrength ? `0 0 10px ${getPasswordStrengthColor()}` : 'none'
                            }}
                          ></div>
                        ))}
                      </div>
                      <div className="strength-advice">
                        {passwordStrength < 3 && (
                          <span>↳ Use uppercase, numbers & symbols for secure encryption</span>
                        )}
                      </div>
                    </div>
                  )}
                  <Form.Text className="input-hint">
                    ➤ Minimum 6 characters - stronger encryption recommended
                  </Form.Text>
                </Form.Group>

                {/* Phone Field */}
                <Form.Group className="mb-4 cyber-form-group">
                  <div className={`cyber-input-wrapper ${focusedField === 'phone' ? 'focused' : ''}`}>
                    <div className="input-border-glow"></div>
                    <div className="input-icon-wrapper">
                      <FaPhone className="input-icon" />
                    </div>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="COMMS FREQUENCY"
                      className="cyber-input"
                    />
                    <div className="input-scanner"></div>
                  </div>
                  <Form.Text className="input-hint">
                    ➤ Optional: Secondary contact frequency
                  </Form.Text>
                </Form.Group>

                {/* Terms and Conditions - Cyber Style */}
                <div className="cyber-terms mb-4">
                  <div className="cyber-checkbox">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                    <label htmlFor="terms">
                      <span className="check-glow"></span>
                      <span className="terms-text">
                        I accept the <Link to="/terms" className="cyber-link-inline">SECURITY PROTOCOLS</Link> and 
                        <Link to="/privacy" className="cyber-link-inline"> DATA HANDLING AGREEMENT</Link>
                      </span>
                    </label>
                  </div>
                  <div className="terms-scanner"></div>
                </div>

                {/* Registration Button */}
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="cyber-submit-btn w-100 register-btn"
                  disabled={loading || !acceptedTerms}
                >
                  {loading ? (
                    <div className="loading-container">
                      <div className="cyber-spinner"></div>
                      <span className="loading-text">INITIALIZING IDENTITY...</span>
                      <div className="spinner-glow"></div>
                    </div>
                  ) : (
                    <>
                      <FaCrown className="btn-icon" />
                      <span className="btn-text">CREATE IDENTITY</span>
                      <div className="btn-glow"></div>
                      <div className="btn-scanner"></div>
                    </>
                  )}
                </Button>
              </Form>

              {/* Security Clearance Badge */}
              <div className="security-badge mt-4">
                <FaShieldAlt className="badge-icon" />
                <div className="badge-text">
                  <span className="encryption-level">LEVEL 1 CLEARANCE</span>
                  <span className="security-cert">✓ REGISTRATION ENCRYPTED</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="auth-footer mt-4">
                <div className="footer-scanner"></div>
                <div className="register-prompt">
                  <span className="prompt-text">EXISTING IDENTITY?</span>
                  <Link to="/login" className="cyber-register-link">
                    <span className="link-text">ACCESS PORTAL</span>
                    <span className="link-glow"></span>
                    <div className="link-arrow">→</div>
                  </Link>
                </div>
              </div>

              {/* AI Assistant with Registration Tips */}
              <div className="ai-assistant registration-assistant">
                <FaRobot className="ai-icon" />
                <div className="ai-message-container">
                  <span className="ai-message">AI: Complete all required fields for identity initialization</span>
                  <span className="ai-tip">Tip: Strong encryption keys provide better security</span>
                </div>
                <div className="ai-pulse"></div>
              </div>
            </Card.Body>
          </Card>

          {/* System Requirements */}
          <div className="system-requirements mt-4">
            <div className="requirements-grid">
              <div className="requirement-item">
                <div className="requirement-icon">⚡</div>
                <div className="requirement-text">
                  <span className="req-label">MIN SECURITY</span>
                  <span className="req-value">LEVEL 2</span>
                </div>
              </div>
              <div className="requirement-item">
                <div className="requirement-icon">🔐</div>
                <div className="requirement-text">
                  <span className="req-label">ENCRYPTION</span>
                  <span className="req-value">AES-256</span>
                </div>
              </div>
              <div className="requirement-item">
                <div className="requirement-icon">⏱️</div>
                <div className="requirement-text">
                  <span className="req-label">SESSION</span>
                  <span className="req-value">24H</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}