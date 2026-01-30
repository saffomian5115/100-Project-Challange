import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const CarCard = ({ car }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(true);
    alert(`You liked the ${car.brand} ${car.name}! Added to your favorites.`);
    
    // Reset liked state after alert is closed
    setTimeout(() => {
      setLiked(false);
    }, 100);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className="h-100 shadow-sm border-0 car-card">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={car.image} 
          alt={`${car.brand} ${car.name}`}
          style={{ height: '200px', objectFit: 'cover' }}
          className="car-image"
        />
        <Badge 
          bg={car.fuelType === 'Electric' ? 'success' : 
              car.fuelType === 'Hybrid' ? 'warning' : 'secondary'}
          className="position-absolute top-0 end-0 m-2"
        >
          {car.fuelType}
        </Badge>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="light" text="dark" className="me-1">{car.year}</Badge>
          <Badge bg="info" text="dark" className="me-1">{car.transmission}</Badge>
          <Badge bg="light" text="dark">{car.mileage}</Badge>
        </div>
        
        <Card.Title className="mb-1">
          <span className="text-primary">{car.brand}</span> {car.name}
        </Card.Title>
        
        <Card.Text className="text-muted mb-3">
          {car.description}
        </Card.Text>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-success mb-0">{formatPrice(car.price)}</h4>
            <small className="text-muted">MSRP</small>
          </div>
          
          <div className="d-grid gap-2">
            <Button 
              variant={liked ? "success" : "outline-danger"}
              size="lg"
              onClick={handleLike}
              className="fw-bold"
            >
              {liked ? "✓ Added to Favorites" : "❤️ Save This Car"}
            </Button>
            <Button 
              variant="outline-primary"
              size="sm"
              onClick={() => alert(`Contact us about the ${car.brand} ${car.name}`)}
            >
              Request Info
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarCard;