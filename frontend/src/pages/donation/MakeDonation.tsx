import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MakeDonation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [amount, setAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');

  const presetAmounts = [10, 25, 50, 100, 250, 500];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process donation
    console.log('Donation:', { amount, isAnonymous, message });
  };

  return (
    <div className="make-donation">
      <h1>Make a Donation</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Preset Amounts */}
        <div className="preset-amounts">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset.toString())}
              className={amount === preset.toString() ? 'active' : ''}
            >
              ${preset}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="form-group">
          <label htmlFor="amount">Custom Amount ($)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Anonymous Donation */}
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <label htmlFor="anonymous">Make this donation anonymous</label>
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="message">Message (Optional)</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message of support"
            rows={4}
          />
        </div>

        <Button type="submit">Proceed to Payment</Button>
      </form>
    </div>
  );
};

export default MakeDonation;
