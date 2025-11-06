import React, { useState, useEffect } from 'react';

const BrowseDonations: React.FC = () => {
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fetch donations from API
    // setDonations(data);
  }, [filter]);

  return (
    <div className="browse-donations">
      <h1>Browse Donation Opportunities</h1>
      
      {/* Filter Section */}
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('education')}>Education</button>
        <button onClick={() => setFilter('health')}>Health</button>
        <button onClick={() => setFilter('environment')}>Environment</button>
      </div>

      {/* Donations Grid */}
      <div className="donations-grid">
        {/* Map through donations and display cards */}
      </div>
    </div>
  );
};

export default BrowseDonations;
