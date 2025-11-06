import { useState, useEffect } from 'react';
import { donationService } from '@/services/api';
import type { Donation } from '@/types';

export const useDonations = (filter?: string) => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const data = await donationService.getAllDonations(filter);
        setDonations(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch donations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [filter]);

  return { donations, loading, error };
};
