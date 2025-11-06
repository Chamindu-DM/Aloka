import React, { useEffect, useState } from 'react';

const MyDonations: React.FC = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's donation history
    // setDonations(data);
    setLoading(false);
  }, []);

  return (
    <div className="my-donations">
      <h1>My Donation History</h1>

      {/* Summary Stats */}
      <div className="donation-stats">
        <div className="stat-card">
          <h3>Total Donated</h3>
          <p className="stat-value">$0</p>
        </div>
        <div className="stat-card">
          <h3>Total Donations</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Causes Supported</h3>
          <p className="stat-value">0</p>
        </div>
      </div>

      {/* Donations List */}
      <div className="donations-list">
        {loading ? (
          <p>Loading...</p>
        ) : donations.length === 0 ? (
          <p>You haven't made any donations yet.</p>
        ) : (
          donations.map((donation: any) => (
            <div key={donation.id} className="donation-item">
              {/* Donation details */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyDonations;
