// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Generic API call function
async function apiCall(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

// Auth service
export const authService = {
  login: async (email: string, password: string) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  signup: async (name: string, email: string, password: string) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },
};

// Donation service
export const donationService = {
  getAllDonations: async (filter?: string) => {
    const query = filter ? `?category=${filter}` : '';
    return apiCall(`/donations${query}`);
  },

  getDonationById: async (id: string) => {
    return apiCall(`/donations/${id}`);
  },

  createDonation: async (donationData: any) => {
    return apiCall('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  },

  makeDonation: async (donationId: string, amount: number, isAnonymous: boolean, message?: string) => {
    return apiCall('/donations/contribute', {
      method: 'POST',
      body: JSON.stringify({ donationId, amount, isAnonymous, message }),
    });
  },

  getUserDonations: async () => {
    return apiCall('/donations/my-donations');
  },
};
