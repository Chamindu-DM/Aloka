export interface Donation {
  id: string;
  title: string;
  description: string;
  category: string;
  goal: number;
  raised: number;
  imageUrl: string;
  createdAt: string;
  organizationName: string;
}

export interface DonationTransaction {
  id: string;
  donationId: string;
  userId: string;
  amount: number;
  isAnonymous: boolean;
  message?: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface DonationFormData {
  amount: number;
  isAnonymous: boolean;
  message?: string;
}
