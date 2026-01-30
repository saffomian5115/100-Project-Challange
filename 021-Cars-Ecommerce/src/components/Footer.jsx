import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-warning">AutoElite Motors</h5>
            <p className="text-muted small">
              Your trusted partner for luxury and premium vehicles since 1995.
            </p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="text-light">Contact Info</h6>
            <p className="text-muted small mb-1">
              📍 123 Luxury Lane, Beverly Hills, CA 90210
            </p>
            <p className="text-muted small mb-1">
              📞 (555) 123-4567
            </p>
            <p className="text-muted small">
              ✉️ info@autoelite.com
            </p>
          </div>
          <div className="col-md-4">
            <h6 className="text-light">Business Hours</h6>
            <p className="text-muted small mb-1">
              Mon-Fri: 9:00 AM - 8:00 PM
            </p>
            <p className="text-muted small mb-1">
              Saturday: 10:00 AM - 6:00 PM
            </p>
            <p className="text-muted small">
              Sunday: 12:00 PM - 5:00 PM
            </p>
          </div>
        </div>
        
        <hr className="border-secondary my-3" />
        
        <div className="text-center">
          <p className="mb-2">
            © {currentYear} AutoElite Motors. All rights reserved.
          </p>
          <p className="text-muted small mb-0">
            All vehicles subject to prior sale. Prices do not include tax, title, and license fees.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;