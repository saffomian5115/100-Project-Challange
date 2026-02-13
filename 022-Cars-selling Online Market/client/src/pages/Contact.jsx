import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { 
  FaEnvelope, 
  FaUser, 
  FaHeading, 
  FaComment, 
  FaPaperPlane, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaRobot,
  FaShieldAlt,
  FaSatellite,
  FaGlobe,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { RiRadarLine } from 'react-icons/ri';
import './Contact.css'; // Create this CSS file

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '' 
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  // Generate random binary for background
  const binaryBackground = () => {
    const chars = '01';
    let result = '';
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  return (
    <div className="contact-container cyberpunk-contact">
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

      {/* Radar Scanner Effect */}
      <div className="radar-scanner">
        <RiRadarLine className="radar-icon" />
        <div className="radar-pulse"></div>
      </div>

      {/* Communication Satellite Dish */}
      <div className="satellite-dish">
        <div className="dish-antenna"></div>
        <div className="dish-reflector"></div>
        <div className="dish-wave"></div>
        <div className="dish-wave-2"></div>
      </div>

      <Container className="py-5 position-relative">
        <div className="cyber-header text-center mb-5">
          <div className="neon-comm-logo">
            <FaSatellite className="comm-icon" />
            <div className="comm-glow"></div>
          </div>
          <h1 className="glitch-text" data-text="COMMUNICATION CENTER">COMMUNICATION CENTER</h1>
          <div className="title-scanner"></div>
          <p className="neon-subtitle">Secure Quantum-Encrypted Transmission</p>
          <div className="frequency-badge">
            <span className="freq-label">FREQ:</span>
            <span className="freq-value">24.98 GHz</span>
            <span className="freq-status">🟢 ONLINE</span>
          </div>
        </div>

        <Row className="g-4">
          {/* Main Communication Form */}
          <Col lg={7} className="mb-4 mb-lg-0">
            <Card className="cyber-comm-card">
              <div className="card-corner top-left"></div>
              <div className="card-corner top-right"></div>
              <div className="card-corner bottom-left"></div>
              <div className="card-corner bottom-right"></div>
              
              <div className="comm-header">
                <div className="header-left">
                  <div className="status-indicator">
                    <div className="status-led transmitting"></div>
                    <span className="status-text">{sent ? 'TRANSMISSION COMPLETE' : 'AWAITING INPUT'}</span>
                  </div>
                </div>
                <div className="header-right">
                  <div className="encryption-badge">
                    <FaShieldAlt className="encrypt-icon" />
                    <span>AES-256</span>
                  </div>
                </div>
              </div>

              <Card.Body className="p-4 p-lg-5">
                {sent ? (
                  <div className="transmission-success">
                    <div className="success-animation">
                      <div className="success-circle">
                        <FaCheckCircle className="success-icon" />
                      </div>
                      <div className="success-pulse"></div>
                    </div>
                    <h2 className="success-title glow-text">MESSAGE TRANSMITTED</h2>
                    <div className="success-details">
                      <div className="transmission-stats">
                        <div className="stat">
                          <span className="stat-label">DESTINATION</span>
                          <span className="stat-value">COMMAND CENTER</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">ENCRYPTION</span>
                          <span className="stat-value">QUANTUM-SAFE</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">ETA</span>
                          <span className="stat-value">&lt; 2 SEC</span>
                        </div>
                      </div>
                    </div>
                    <Alert variant="success" className="cyber-success-alert">
                      <FaCheckCircle className="alert-icon" />
                      <span>Thank you! Your quantum-encrypted message has been received. Response time: 2-4 hours.</span>
                    </Alert>
                    <Button 
                      onClick={() => setSent(false)} 
                      className="cyber-button send-another"
                    >
                      <FaPaperPlane className="btn-icon" />
                      <span>SEND ANOTHER</span>
                    </Button>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    {/* Transmission Protocol Header */}
                    <div className="protocol-header mb-4">
                      <div className="protocol-tag">TRANSMISSION PROTOCOL V2.0</div>
                      <div className="protocol-lines">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                      </div>
                    </div>

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
                          placeholder="TRANSMITTER IDENTITY"
                          className="cyber-input"
                          required
                        />
                        <div className="input-scanner"></div>
                      </div>
                      <Form.Text className="input-hint">
                        ➤ Full designation / call sign
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
                          placeholder="COMMS@IDENTITY.NET"
                          className="cyber-input"
                          required
                        />
                        <div className="input-scanner"></div>
                      </div>
                      <Form.Text className="input-hint">
                        ➤ Primary quantum communication channel
                      </Form.Text>
                    </Form.Group>

                    {/* Subject Field */}
                    <Form.Group className="mb-4 cyber-form-group">
                      <div className={`cyber-input-wrapper ${focusedField === 'subject' ? 'focused' : ''}`}>
                        <div className="input-border-glow"></div>
                        <div className="input-icon-wrapper">
                          <FaHeading className="input-icon" />
                        </div>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="TRANSMISSION CLASSIFICATION"
                          className="cyber-input"
                          required
                        />
                        <div className="input-scanner"></div>
                      </div>
                      <Form.Text className="input-hint">
                        ➤ Brief transmission identifier
                      </Form.Text>
                    </Form.Group>

                    {/* Message Field */}
                    <Form.Group className="mb-4 cyber-form-group">
                      <div className={`cyber-input-wrapper ${focusedField === 'message' ? 'focused' : ''}`}>
                        <div className="input-border-glow"></div>
                        <div className="input-icon-wrapper">
                          <FaComment className="input-icon" />
                        </div>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="ENCRYPTED MESSAGE CONTENT"
                          className="cyber-input cyber-textarea"
                          required
                        />
                        <div className="input-scanner"></div>
                      </div>
                      <div className="message-stats">
                        <Form.Text className="input-hint">
                          ➤ Maximum transmission length: 5000 characters
                        </Form.Text>
                        <span className="char-counter">
                          {form.message.length}/5000
                        </span>
                      </div>
                    </Form.Group>

                    {/* Priority Level */}
                    <div className="priority-selector mb-4">
                      <span className="priority-label">TRANSMISSION PRIORITY:</span>
                      <div className="priority-options">
                        <div className="priority-option">
                          <input type="radio" name="priority" id="standard" defaultChecked />
                          <label htmlFor="standard">STANDARD</label>
                        </div>
                        <div className="priority-option">
                          <input type="radio" name="priority" id="urgent" />
                          <label htmlFor="urgent">URGENT</label>
                        </div>
                        <div className="priority-option">
                          <input type="radio" name="priority" id="critical" />
                          <label htmlFor="critical">CRITICAL</label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="cyber-submit-btn comm-submit w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="loading-container">
                          <div className="cyber-spinner"></div>
                          <span className="loading-text">ENCRYPTING & TRANSMITTING...</span>
                          <div className="spinner-glow"></div>
                        </div>
                      ) : (
                        <>
                          <IoMdSend className="btn-icon" />
                          <span className="btn-text">TRANSMIT MESSAGE</span>
                          <div className="btn-glow"></div>
                          <div className="btn-scanner"></div>
                        </>
                      )}
                    </Button>

                    {/* Security Note */}
                    <div className="security-note mt-3">
                      <FaShieldAlt className="note-icon" />
                      <span>All transmissions are quantum-encrypted and securely routed</span>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Communication Channels & Info */}
          <Col lg={5}>
            <div className="cyber-sidebar">
              {/* Quantum Communication Channels */}
              <Card className="cyber-channels-card mb-4">
                <div className="card-corner top-left"></div>
                <div className="card-corner top-right"></div>
                <div className="card-corner bottom-left"></div>
                <div className="card-corner bottom-right"></div>
                
                <Card.Header className="cyber-card-header">
                  <div className="header-icon">
                    <FaGlobe className="icon" />
                  </div>
                  <h3 className="header-title">QUANTUM CHANNELS</h3>
                  <div className="header-scanner"></div>
                </Card.Header>
                
                <Card.Body className="p-4">
                  <div className="channel-item">
                    <div className="channel-icon">
                      <FaEnvelope />
                    </div>
                    <div className="channel-info">
                      <span className="channel-label">PRIMARY COMMS</span>
                      <span className="channel-value">support@carmarket.quantum</span>
                    </div>
                    <div className="channel-status online">
                      <span className="dot"></span>
                      <span className="status">SECURE</span>
                    </div>
                  </div>

                  <div className="channel-divider"></div>

                  <div className="channel-item">
                    <div className="channel-icon">
                      <FaPhoneAlt />
                    </div>
                    <div className="channel-info">
                      <span className="channel-label">VOICE COMMS</span>
                      <span className="channel-value">+1 (555) 123-4567</span>
                    </div>
                    <div className="channel-status encrypted">
                      <span className="dot"></span>
                      <span className="status">ENCRYPTED</span>
                    </div>
                  </div>

                  <div className="channel-divider"></div>

                  <div className="channel-item">
                    <div className="channel-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="channel-info">
                      <span className="channel-label">PHYSICAL ADDRESS</span>
                      <span className="channel-value">123 Auto Lane, Sector 7</span>
                    </div>
                    <div className="channel-status">
                      <span className="dot warning"></span>
                      <span className="status">VERIFIED</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Operating Hours */}
              <Card className="cyber-hours-card">
                <div className="card-corner top-left"></div>
                <div className="card-corner top-right"></div>
                <div className="card-corner bottom-left"></div>
                <div className="card-corner bottom-right"></div>
                
                <Card.Header className="cyber-card-header">
                  <div className="header-icon">
                    <FaClock className="icon" />
                  </div>
                  <h3 className="header-title">SYSTEM STATUS</h3>
                </Card.Header>
                
                <Card.Body className="p-4">
                  <div className="status-grid">
                    <div className="status-row">
                      <span className="label">COMMAND CENTER:</span>
                      <span className="value online">🟢 ACTIVE</span>
                    </div>
                    <div className="status-row">
                      <span className="label">RESPONSE TEAM:</span>
                      <span className="value online">🟢 STANDBY</span>
                    </div>
                    <div className="status-row">
                      <span className="label">AVG RESPONSE:</span>
                      <span className="value">&lt; 2.5 HOURS</span>
                    </div>
                    <div className="status-row">
                      <span className="label">CURRENT LOAD:</span>
                      <span className="value">23% CAPACITY</span>
                    </div>
                  </div>
                  
                  <div className="availability-meter mt-3">
                    <div className="meter-label">
                      <span>SYSTEM AVAILABILITY</span>
                      <span className="percentage">99.97%</span>
                    </div>
                    <div className="meter-bar">
                      <div className="meter-fill" style={{ width: '99.97%' }}></div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* AI Assistant */}
              <div className="ai-assistant comm-assistant mt-4">
                <FaRobot className="ai-icon" />
                <div className="ai-message-container">
                  <span className="ai-message">AI COMMS OFFICER: Ready to assist with your transmission</span>
                  <span className="ai-tip">Tip: Include your VIN for vehicle-specific inquiries</span>
                </div>
                <div className="ai-pulse"></div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Quantum Encryption Footer */}
        <div className="quantum-footer mt-5">
          <div className="encryption-strip">
            <span className="strip-text">⚡ QUANTUM ENCRYPTION ACTIVE</span>
            <span className="strip-text">🛰️ SATELLITE LINK ESTABLISHED</span>
            <span className="strip-text">🔐 POST-QUANTUM SECURE</span>
          </div>
        </div>
      </Container>
    </div>
  );
}