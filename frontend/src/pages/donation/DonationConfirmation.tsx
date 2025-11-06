import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DonationConfirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="donation-confirmation">
      <div className="confirmation-card">
        {/* Success Icon */}
        <div className="success-icon">
          ✓
        </div>
        
        <h1>Thank You for Your Donation!</h1>
        <p>Your generous contribution will make a difference.</p>

        {/* Donation Summary */}
        <div className="donation-summary">
          <h3>Donation Summary</h3>
          <div className="summary-item">
            <span>Amount:</span>
            <span>$100.00</span>
          </div>
          <div className="summary-item">
            <span>Transaction ID:</span>
            <span>#TXN123456789</span>
          </div>
          <div className="summary-item">
            <span>Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <p className="receipt-info">
          A receipt has been sent to your email address.
        </p>

        <div className="actions">
          <Button onClick={() => navigate('/donations')}>
            Browse More Donations
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationConfirmation;
