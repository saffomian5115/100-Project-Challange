import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { carsApi, getImageUrl } from '../api';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCar, FaShieldAlt, FaSearch, FaStar, FaBolt, FaChevronRight } from 'react-icons/fa';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  useEffect(() => {
    carsApi.featured()
      .then(setFeatured)
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Futuristic Hero Section with Particle Background */}
      <motion.div 
        ref={heroRef}
        className="futuristic-hero text-white position-relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Animated Background Elements */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }} />
          ))}
        </div>

        <Container className="position-relative z-3">
          <Row className="align-items-center">
            <Col lg={7} className="mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="display-3 fw-bold mb-4 gradient-text">
                  Discover Your <span className="text-primary">Dream Car</span>
                </h1>
                <p className="lead mb-4 opacity-85" style={{ fontSize: '1.25rem' }}>
                  Immerse yourself in the future of automotive shopping. 
                  <span className="d-block mt-2">AI-powered matches, VR previews, and seamless transactions.</span>
                </p>
                
                <div className="d-flex flex-wrap gap-3 mt-5">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      as={Link} 
                      to="/cars" 
                      variant="primary" 
                      size="lg"
                      className="px-5 py-3 rounded-pill btn-glow"
                      style={{
                        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        fontWeight: '600'
                      }}
                    >
                      <FaSearch className="me-2" />
                      Explore Cars
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      as={Link} 
                      to="/add-car" 
                      variant="outline-light" 
                      size="lg"
                      className="px-5 py-3 rounded-pill btn-hover-lift border-2"
                      style={{ fontWeight: '600' }}
                    >
                      <FaBolt className="me-2" />
                      Sell Instantly
                    </Button>
                  </motion.div>
                </div>

                {/* Stats Bar */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-5 pt-4"
                >
                  <Row className="g-4">
                    <Col xs={4}>
                      <div className="text-center">
                        <h3 className="fw-bold mb-1 display-5">10K+</h3>
                        <p className="text-light opacity-75 mb-0">Premium Cars</p>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="text-center">
                        <h3 className="fw-bold mb-1 display-5">99%</h3>
                        <p className="text-light opacity-75 mb-0">Satisfaction</p>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="text-center">
                        <h3 className="fw-bold mb-1 display-5">24/7</h3>
                        <p className="text-light opacity-75 mb-0">AI Support</p>
                      </div>
                    </Col>
                  </Row>
                </motion.div>
              </motion.div>
            </Col>
            
            <Col lg={5} className="d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="position-relative"
                style={{ perspective: '1000px' }}
              >
                <div className="floating-car-container">
                  <FaCar className="floating-car" style={{ fontSize: '20rem', color: '#667eea' }} />
                  <div className="car-glow"></div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.div>

      {/* Featured Listings with Parallax */}
      <div ref={containerRef} className="py-6 position-relative">
        <Container>
          <motion.div 
            style={{ opacity, scale, y }}
            className="text-center mb-6"
          >
            <h2 className="display-5 fw-bold mb-3">
              <span className="gradient-text">Featured</span> Vehicles
            </h2>
            <p className="lead text-muted">Curated selection of premium automotive excellence</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-6">
              <Spinner animation="border" className="spinner-glow" style={{ width: '3rem', height: '3rem' }} />
            </div>
          ) : featured.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6"
            >
              <div className="empty-state">
                <FaCar className="display-1 text-muted mb-4" />
                <h4 className="mb-3">No featured cars available</h4>
                <p className="text-muted mb-4">Be the first to list your premium vehicle</p>
                <Button as={Link} to="/add-car" variant="primary" className="rounded-pill px-4">
                  List Your Car
                </Button>
              </div>
            </motion.div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {featured.map((car, index) => (
                <Col key={car._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    onMouseEnter={() => setHoveredCard(car._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Link to={`/cars/${car._id}`} className="text-decoration-none">
                      <Card className="h-100 border-0 shadow-lg futuristic-card overflow-hidden">
                        <div className="card-image-container position-relative overflow-hidden">
                          <motion.div
                            animate={hoveredCard === car._id ? { scale: 1.1 } : { scale: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Card.Img
                              variant="top"
                              src={getImageUrl(car.images?.[0]) || 'https://placehold.co/600x400/1a1a2e/00b4d8?text=Premium+Car'}
                              alt={car.title}
                              className="card-img"
                              style={{ 
                                height: '250px', 
                                objectFit: 'cover',
                                filter: hoveredCard === car._id ? 'brightness(1.1)' : 'brightness(1)'
                              }}
                            />
                          </motion.div>
                          <div className="card-overlay"></div>
                          <div className="card-badge">
                            <FaStar className="text-warning" />
                            <span className="ms-1">FEATURED</span>
                          </div>
                        </div>
                        
                        <Card.Body className="p-4">
                          <Card.Title className="fw-bold mb-2 text-dark">{car.title}</Card.Title>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="badge bg-primary bg-gradient px-3 py-2 rounded-pill">
                              {car.brand} • {car.year}
                            </span>
                            <motion.div
                              animate={hoveredCard === car._id ? { x: 5 } : { x: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <FaChevronRight className="text-primary" />
                            </motion.div>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center mt-4">
                            <div>
                              <h4 className="fw-bold text-primary mb-0">
                                ${car.price?.toLocaleString()}
                              </h4>
                              <small className="text-muted">Negotiable</small>
                            </div>
                            <Button 
                              variant="outline-primary" 
                              className="rounded-pill px-4 btn-hover-lift"
                            >
                              View Details
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6 pt-4"
          >
            <Button 
              as={Link} 
              to="/cars" 
              variant="primary" 
              size="lg"
              className="px-5 py-3 rounded-pill btn-glow"
              style={{
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                fontWeight: '600'
              }}
            >
              Explore All Vehicles
              <FaChevronRight className="ms-2" />
            </Button>
          </motion.div>
        </Container>
      </div>

      {/* Futuristic Features Section */}
      <div className="py-6 position-relative" style={{ 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: 'white'
      }}>
        <Container>
          <div className="text-center mb-6">
            <h2 className="display-5 fw-bold mb-3">
              Why Choose <span className="gradient-text">FutureAuto</span>
            </h2>
            <p className="lead opacity-75">Revolutionizing car buying with cutting-edge technology</p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="feature-card p-4 rounded-4 text-center h-100"
              >
                <div className="icon-wrapper mb-4">
                  <div className="icon-container">
                    <FaShieldAlt className="fs-1" />
                  </div>
                </div>
                <h4 className="fw-bold mb-3">Blockchain Security</h4>
                <p className="opacity-75">
                  Immutable blockchain records ensure every transaction is secure, transparent, and verifiable.
                </p>
                <div className="mt-3">
                  <span className="badge bg-primary bg-opacity-25 text-primary px-3 py-2">
                    AI-Verified
                  </span>
                </div>
              </motion.div>
            </Col>
            
            <Col md={4}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="feature-card p-4 rounded-4 text-center h-100"
              >
                <div className="icon-wrapper mb-4">
                  <div className="icon-container" style={{ background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)' }}>
                    <span className="fs-1">🔮</span>
                  </div>
                </div>
                <h4 className="fw-bold mb-3">VR Showrooms</h4>
                <p className="opacity-75">
                  Experience cars in immersive virtual reality. Test drive from the comfort of your home.
                </p>
                <div className="mt-3">
                  <span className="badge bg-primary bg-opacity-25 text-primary px-3 py-2">
                    AR Ready
                  </span>
                </div>
              </motion.div>
            </Col>
            
            <Col md={4}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="feature-card p-4 rounded-4 text-center h-100"
              >
                <div className="icon-wrapper mb-4">
                  <div className="icon-container" style={{ background: 'linear-gradient(45deg, #00b894, #00a085)' }}>
                    <span className="fs-1">🤖</span>
                  </div>
                </div>
                <h4 className="fw-bold mb-3">AI Matchmaking</h4>
                <p className="opacity-75">
                  Our AI analyzes your preferences to find your perfect vehicle match with 98% accuracy.
                </p>
                <div className="mt-3">
                  <span className="badge bg-primary bg-opacity-25 text-primary px-3 py-2">
                    Smart Match
                  </span>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes particleFloat {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        .gradient-text {
          background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .floating-car {
          animation: float 6s ease-in-out infinite;
          filter: drop-shadow(0 10px 20px rgba(102, 126, 234, 0.4));
        }
        
        .car-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }
        
        .futuristic-card {
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .futuristic-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(102, 126, 234, 0.1) !important;
        }
        
        .card-image-container {
          position: relative;
          overflow: hidden;
        }
        
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.7));
          pointer-events: none;
        }
        
        .card-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          backdrop-filter: blur(10px);
        }
        
        .btn-glow {
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .btn-glow:hover {
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
        }
        
        .spinner-glow {
          filter: drop-shadow(0 0 8px rgba(13, 110, 253, 0.5));
        }
        
        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
        }
        
        .icon-container {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          color: white;
          font-size: 2rem;
        }
        
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: particleFloat linear infinite;
        }
        
        .empty-state {
          padding: 4rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  );
}