import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  FaBullseye, 
  FaShieldAlt, 
  FaHandshake, 
  FaCar, 
  FaSearch, 
  FaUserShield,
  FaRocket,
  FaCrown,
  FaMicrochip,
  FaBrain,
  FaNetworkWired,
  FaGlobeAmericas
} from 'react-icons/fa';
import { GiCyberEye, GiArtificialIntelligence, GiCarWheel } from 'react-icons/gi';
import { HiOutlineChip } from 'react-icons/hi';
import { RiRadarLine, RiTeamLine } from 'react-icons/ri';
import './About.css'; // Create this CSS file

export default function About() {
  // Company stats for holographic display
  const companyStats = [
    { label: 'VEHICLES SOLD', value: '15K+', icon: <FaCar /> },
    { label: 'VERIFIED USERS', value: '50K+', icon: <FaUserShield /> },
    { label: 'TRUST SCORE', value: '4.98', icon: <FaShieldAlt /> },
    { label: 'ACTIVE LISTINGS', value: '2.5K+', icon: <RiRadarLine /> }
  ];

  // Core values data
  const coreValues = [
    {
      icon: <FaBullseye />,
      title: 'QUANTUM PRECISION',
      description: 'To revolutionize vehicle commerce through neural network integration and quantum-secure transactions.',
      color: '#00f3ff'
    },
    {
      icon: <FaShieldAlt />,
      title: 'HOLOGRAPHIC VERIFICATION',
      description: 'Multi-layered validation protocols ensuring every listing meets our quantum-certified standards.',
      color: '#9d00ff'
    },
    {
      icon: <FaHandshake />,
      title: 'NEURAL CONNECTION',
      description: 'Direct synaptic interface between buyers and sellers, eliminating legacy intermediaries.',
      color: '#ff3366'
    }
  ];

  // Features data
  const features = [
    {
      icon: <GiCarWheel />,
      title: 'NEURAL VEHICLE SCAN',
      description: 'Quantum-powered vehicle analysis with real-time holographic rendering',
      glow: '#00f3ff'
    },
    {
      icon: <FaSearch />,
      title: 'PREDICTIVE ALGORITHM',
      description: 'AI-driven search that learns your preferences through neural pattern recognition',
      glow: '#9d00ff'
    },
    {
      icon: <FaUserShield />,
      title: 'BIO-IDENTITY VERIFICATION',
      description: 'Biometric authentication and encrypted digital identity protection',
      glow: '#00ff88'
    },
    {
      icon: <FaRocket />,
      title: 'LIGHTSPEED LISTING',
      description: 'Instant vehicle listing with automated holographic imaging',
      glow: '#ff3366'
    }
  ];

  return (
    <div className="about-container cyberpunk-about">
      {/* Animated Grid Background */}
      <div className="cyber-grid">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="grid-line"></div>
        ))}
      </div>

      {/* Floating Neural Network */}
      <div className="neural-network">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="neural-node"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          ></div>
        ))}
        <div className="neural-connections"></div>
      </div>

      {/* Holographic Scanner */}
      <div className="holographic-scanner">
        <div className="scanner-beam"></div>
        <div className="scanner-grid"></div>
      </div>

      <Container className="py-5 position-relative">
        {/* Cyber Header with Glitch Effect */}
        <div className="cyber-about-header text-center mb-5">
          <div className="hologram-logo">
            <FaCar className="hologram-icon" />
            <div className="hologram-rings">
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
            </div>
            <div className="hologram-glow"></div>
          </div>
          
          <h1 className="glitch-title" data-text="CARMARKET QUANTUM">CARMARKET QUANTUM</h1>
          <div className="title-scanner"></div>
          
          <div className="corporate-tagline">
            <span className="neon-text">✦ </span>
            NEXT-GENERATION VEHICLE NEURAL INTERFACE
            <span className="neon-text"> ✦</span>
          </div>
          
          <div className="version-badge">
            <HiOutlineChip className="chip-icon" />
            <span>QUANTUM CORE v2.5.0</span>
          </div>
        </div>

        {/* Quantum Mission Statement */}
        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <div className="quantum-mission-card">
              <div className="mission-grid">
                <div className="mission-content">
                  <div className="mission-badge">
                    <FaBrain className="badge-icon" />
                    <span>QUANTUM CONSCIOUSNESS</span>
                  </div>
                  <p className="mission-text">
                    CarMarket Quantum represents the evolution of vehicle commerce through 
                    advanced neural interfaces and quantum-secure transactions. We bridge 
                    the gap between traditional dealerships and tomorrow's holographic 
                    marketplace, creating an immersive, trustworthy, and lightning-fast 
                    vehicle acquisition matrix.
                  </p>
                  <div className="mission-stats">
                    {companyStats.map((stat, index) => (
                      <div key={index} className="stat-hologram">
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-info">
                          <span className="stat-value">{stat.value}</span>
                          <span className="stat-label">{stat.label}</span>
                        </div>
                        <div className="stat-glow"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mission-hologram">
                  <div className="floating-car">
                    <FaCar className="car-icon" />
                    <div className="car-scanlines"></div>
                  </div>
                </div>
              </div>
              <div className="mission-scanner"></div>
            </div>
          </Col>
        </Row>

        {/* Core Values - Neural Network Cards */}
        <h2 className="section-title text-center mb-4">
          <span className="neon-text">◈</span> QUANTUM CORE DIRECTIVES <span className="neon-text">◈</span>
        </h2>
        <div className="section-scanner"></div>
        
        <Row className="g-4 mb-5">
          {coreValues.map((value, index) => (
            <Col md={4} key={index}>
              <div className="neural-card" style={{ borderColor: value.color }}>
                <div className="card-corner top-left"></div>
                <div className="card-corner top-right"></div>
                <div className="card-corner bottom-left"></div>
                <div className="card-corner bottom-right"></div>
                
                <div className="neural-icon" style={{ background: `radial-gradient(circle, ${value.color}20, transparent)` }}>
                  <div className="icon-glow" style={{ color: value.color }}>{value.icon}</div>
                  <div className="icon-pulse" style={{ borderColor: value.color }}></div>
                </div>
                
                <h3 className="neural-title" style={{ color: value.color }}>{value.title}</h3>
                <p className="neural-description">{value.description}</p>
                
                <div className="neural-lines">
                  <span className="line"></span>
                  <span className="line"></span>
                  <span className="line"></span>
                </div>
                
                <div className="neural-frequency" style={{ background: `linear-gradient(90deg, transparent, ${value.color}, transparent)` }}></div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Advanced Features Grid */}
        <h2 className="section-title text-center mb-4">
          <span className="neon-text">⚡</span> QUANTUM CAPABILITIES <span className="neon-text">⚡</span>
        </h2>
        
        <Row className="g-4 mb-5">
          {features.map((feature, index) => (
            <Col lg={3} md={6} key={index}>
              <div className="capability-card">
                <div className="capability-hologram">
                  <div className="capability-icon" style={{ color: feature.glow }}>
                    {feature.icon}
                  </div>
                  <div className="capability-ring"></div>
                </div>
                <h4 className="capability-title">{feature.title}</h4>
                <p className="capability-description">{feature.description}</p>
                <div className="capability-status">
                  <span className="status-dot" style={{ background: feature.glow, boxShadow: `0 0 10px ${feature.glow}` }}></span>
                  <span className="status-text">ACTIVE</span>
                </div>
                <div className="capability-scanner" style={{ background: `linear-gradient(90deg, transparent, ${feature.glow}, transparent)` }}></div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Why Choose Us - Neural Network Grid */}
        <Row className="mb-5">
          <Col lg={12}>
            <div className="why-choose-card">
              <div className="cyber-card-header">
                <div className="header-icon">
                  <FaNetworkWired className="icon" />
                </div>
                <h2 className="header-title">NEURAL ADVANTAGE MATRIX</h2>
                <div className="header-scanner"></div>
              </div>
              
              <div className="advantage-grid">
                <div className="advantage-item">
                  <div className="advantage-number">01</div>
                  <div className="advantage-content">
                    <h4>QUANTUM VEHICLE DATABASE</h4>
                    <p>Access our neural network of new, quantum-certified, and holographic-pre-owned vehicles</p>
                  </div>
                </div>
                
                <div className="advantage-item">
                  <div className="advantage-number">02</div>
                  <div className="advantage-content">
                    <h4>ADVANCED NEURAL SEARCH</h4>
                    <p>Multi-dimensional filters with predictive AI that anticipates your vehicle requirements</p>
                  </div>
                </div>
                
                <div className="advantage-item">
                  <div className="advantage-number">03</div>
                  <div className="advantage-content">
                    <h4>BIO-ENCRYPTED SECURITY</h4>
                    <p>Biometric authentication and quantum-entangled verification protocols</p>
                  </div>
                </div>
                
                <div className="advantage-item">
                  <div className="advantage-number">04</div>
                  <div className="advantage-content">
                    <h4>INSTANT HOLOGRAPHIC LISTING</h4>
                    <p>Real-time vehicle holography with automated 360° neural scanning</p>
                  </div>
                </div>
                
                <div className="advantage-item">
                  <div className="advantage-number">05</div>
                  <div className="advantage-content">
                    <h4>QUANTUM SUPPORT MATRIX</h4>
                    <p>24/7 AI-enhanced support with sub-second response latency</p>
                  </div>
                </div>
              </div>
              
              <div className="advantage-visualization">
                <div className="visualization-node"></div>
                <div className="visualization-node"></div>
                <div className="visualization-node"></div>
                <div className="visualization-node"></div>
                <div className="visualization-node"></div>
                <div className="visualization-connection"></div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Future Vision Statement */}
        <Row>
          <Col lg={12}>
            <div className="vision-card">
              <div className="vision-content">
                <GiCyberEye className="vision-icon" />
                <div className="vision-text">
                  <h3 className="vision-title">QUANTUM TOMORROW</h3>
                  <p className="vision-description">
                    We're developing the next generation of vehicle commerce through quantum computing, 
                    neural interfaces, and holographic display technology. The future of car buying isn't 
                    just digital—it's quantum.
                  </p>
                </div>
              </div>
              <div className="vision-pulse"></div>
              <div className="vision-scanner"></div>
            </div>
          </Col>
        </Row>

        {/* Corporate Footer */}
        <div className="quantum-footer mt-5">
          <div className="footer-scanlines"></div>
          <div className="footer-content">
            <div className="footer-brand">
              <FaCar className="brand-icon" />
              <span className="brand-name">CAR<span className="neon-text">MARKET</span></span>
              <span className="brand-version">QUANTUM EDITION</span>
            </div>
            <div className="footer-copyright">
              <FaMicrochip className="copyright-icon" />
              <span>© 2026 CARMARKET QUANTUM. ALL RIGHTS RESERVED. PATENTED NEURAL TECHNOLOGY.</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}