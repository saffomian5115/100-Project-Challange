import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import CarCard from './components/CarCard';
import Footer from './components/Footer';
import { cars } from './constants/cars';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState(cars);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    console.log('Car Catalog Loaded');
    console.log(`Total cars: ${cars.length}`);
  }, []);

  useEffect(() => {
    let filtered = cars.filter(car =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter !== 'all') {
      filtered = filtered.filter(car => car.fuelType.toLowerCase() === filter.toLowerCase());
    }

    setFilteredCars(filtered);
  }, [searchTerm, filter]);

  const getUniqueFuelTypes = () => {
    const fuelTypes = [...new Set(cars.map(car => car.fuelType))];
    return ['all', ...fuelTypes];
  };

  return (
    <div className="d-flex flex-column min-vh-100 vw-100">
      <Header onSearch={setSearchTerm} />
      
      <main className="flex-grow-1 py-4 bg-light">
        <Container>
          {/* Filter Section */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="mb-0">Premium Car Collection</h2>
              <Badge bg="primary" pill>
                {filteredCars.length} Cars Available
              </Badge>
            </div>
            
            <div className="mb-4">
              <p className="text-muted mb-2">Filter by Fuel Type:</p>
              <div className="d-flex flex-wrap gap-2">
                {getUniqueFuelTypes().map((fuelType) => (
                  <Button
                    key={fuelType}
                    variant={filter === fuelType ? "primary" : "outline-primary"}
                    size="sm"
                    onClick={() => setFilter(fuelType)}
                  >
                    {fuelType === 'all' ? 'All Cars' : fuelType}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Search Results Summary */}
            <div className="alert alert-info">
              <p className="mb-0">
                Showing {filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''}
                {searchTerm && ` for "${searchTerm}"`}
                {filter !== 'all' && ` (${filter} only)`}
              </p>
            </div>
          </div>
          
          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {filteredCars.map((car) => (
                <Col key={car.id}>
                  <CarCard car={car} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <div className="display-1 text-muted mb-4">🚗</div>
              <h4 className="text-muted">No cars found matching your criteria</h4>
              <p className="text-muted">Try adjusting your search or filter</p>
              <Button 
                variant="outline-primary"
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
          
          {/* Statistics */}
          {filteredCars.length > 0 && (
            <div className="mt-5 pt-4 border-top">
              <Row className="text-center">
                <Col md={3} className="mb-3">
                  <h4 className="text-primary">{cars.length}</h4>
                  <p className="text-muted mb-0">Total Cars</p>
                </Col>
                <Col md={3} className="mb-3">
                  <h4 className="text-success">
                    ${Math.min(...cars.map(c => c.price)).toLocaleString()}
                  </h4>
                  <p className="text-muted mb-0">Starting Price</p>
                </Col>
                <Col md={3} className="mb-3">
                  <h4 className="text-warning">
                    {new Set(cars.map(c => c.brand)).size}
                  </h4>
                  <p className="text-muted mb-0">Brands</p>
                </Col>
                <Col md={3} className="mb-3">
                  <h4 className="text-info">2024</h4>
                  <p className="text-muted mb-0">Latest Models</p>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;