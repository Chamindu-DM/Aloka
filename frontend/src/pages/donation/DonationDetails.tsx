import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DonationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [donation, setDonation] = useState<any>(null);

  useEffect(() => {
    // Fetch donation details by id
    // setDonation(data);
  }, [id]);

  const handleDonate = () => {
    // Navigate to donation form
  };

  return (
    <div className="donation-details">
      <h1>Donation Details</h1>
      
      {/* Donation Image */}
      <div className="donation-image">
        {/* Display main image */}
      </div>

      {/* Donation Info */}
      <div className="donation-info">
        <h2>{donation?.title}</h2>
        <p>{donation?.description}</p>
        
        {/* Progress Bar */}
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
        
        <div className="donation-stats">
          <span>Goal: ${donation?.goal}</span>
          <span>Raised: ${donation?.raised}</span>
        </div>

        <Button onClick={handleDonate}>Donate Now</Button>
      </div>

      {/* Recent Donations */}
      <div className="recent-donations">
        <h3>Recent Donations</h3>
        {/* List of recent donors */}
      </div>
    </div>
  );
};

export default DonationDetails;
