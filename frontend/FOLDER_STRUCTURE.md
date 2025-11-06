# Frontend Folder Structure Documentation

## Overview
This document outlines the folder structure for the Aloka donation platform frontend.

## Folder Structure

```
src/
├── assets/              # Static assets (images, fonts, etc.)
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
│       └── button.tsx
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication context and provider
├── hooks/              # Custom React hooks
│   └── useDonations.ts # Hook for fetching donations
├── layouts/            # Layout components
│   ├── MainLayout.tsx  # Main app layout with header/footer
│   └── AuthLayout.tsx  # Authentication pages layout
├── lib/                # Utility libraries
│   └── utils.ts
├── pages/              # Page components (screens)
│   ├── auth/           # Authentication pages
│   │   ├── Login.tsx       # Login page
│   │   ├── Signup.tsx      # Signup page
│   │   └── index.ts        # Auth pages exports
│   ├── donation/       # Donation flow pages
│   │   ├── BrowseDonations.tsx       # Browse all donations
│   │   ├── DonationDetails.tsx       # View single donation details
│   │   ├── MakeDonation.tsx          # Make a donation form
│   │   ├── DonationConfirmation.tsx  # Donation success page
│   │   ├── MyDonations.tsx           # User's donation history
│   │   └── index.ts                  # Donation pages exports
│   └── LandingPage.tsx # Home/landing page
├── services/           # API services
│   └── api.ts         # API calls for auth and donations
├── types/              # TypeScript type definitions
│   └── index.ts       # Shared types and interfaces
├── App.tsx            # Main App component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Page Components

### Authentication Pages (`src/pages/auth/`)

#### Login.tsx
- User login form
- Email and password inputs
- Link to signup page
- Integrates with AuthContext

#### Signup.tsx
- User registration form
- Name, email, password, and confirm password inputs
- Link to login page
- Form validation

### Donation Flow Pages (`src/pages/donation/`)

#### BrowseDonations.tsx
- Display all available donations
- Filter by category (education, health, environment, etc.)
- Grid/list view of donation cards
- Search functionality placeholder

#### DonationDetails.tsx
- View detailed information about a specific donation
- Progress bar showing goal vs raised amount
- Recent donations list
- "Donate Now" button
- Uses URL parameter for donation ID

#### MakeDonation.tsx
- Donation amount selection (preset amounts + custom)
- Anonymous donation option
- Optional message field
- Proceeds to payment processing

#### DonationConfirmation.tsx
- Success message after donation
- Donation summary (amount, transaction ID, date)
- Receipt confirmation
- Navigation to browse more or dashboard

#### MyDonations.tsx
- User's donation history
- Summary statistics (total donated, number of donations, causes supported)
- List of past donations with details

### Other Pages

#### LandingPage.tsx
- Hero section
- Features overview
- How it works section
- Call to action

## Layouts (`src/layouts/`)

### MainLayout.tsx
- Wrapper for main application pages
- Contains header/navigation and footer
- Uses React Router's `<Outlet />` for nested routes

### AuthLayout.tsx
- Wrapper for authentication pages
- Split layout with branding sidebar
- Minimal design focused on forms

## Context (`src/contexts/`)

### AuthContext.tsx
- Manages user authentication state
- Provides `login`, `signup`, `logout` functions
- Stores user info and authentication status
- Persists authentication in localStorage

## Hooks (`src/hooks/`)

### useDonations.ts
- Custom hook for fetching donations
- Handles loading and error states
- Supports filtering by category
- Returns donations array with status

## Services (`src/services/`)

### api.ts
- Centralized API calls
- **authService**: login, signup, logout
- **donationService**: 
  - getAllDonations (with optional filter)
  - getDonationById
  - createDonation
  - makeDonation
  - getUserDonations

## Types (`src/types/`)

### index.ts
Type definitions for:
- `Donation`: Donation campaign data
- `DonationTransaction`: Individual donation record
- `User`: User account data
- `DonationFormData`: Form submission data

## Next Steps

1. **Install React Router**
   ```bash
   npm install react-router-dom
   ```

2. **Set up routing in App.tsx**
   - Configure routes for all pages
   - Implement protected routes for authenticated users
   - Add route guards

3. **Style the components**
   - Create CSS modules or use Tailwind CSS
   - Implement responsive design
   - Add animations and transitions

4. **Connect to backend API**
   - Update API service with correct endpoints
   - Implement error handling
   - Add loading states

5. **Add more UI components**
   - DonationCard component
   - Navigation/Header component
   - Footer component
   - Form input components
   - Modal/Dialog components

6. **Implement additional features**
   - Payment gateway integration
   - Image upload for donations
   - Social sharing
   - Email notifications
   - Search and advanced filtering

## Usage Examples

### Import a page component:
```typescript
import { Login, Signup } from '@/pages/auth';
import { BrowseDonations, DonationDetails } from '@/pages/donation';
```

### Use the AuthContext:
```typescript
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  // Use auth methods and state
};
```

### Use the donations hook:
```typescript
import { useDonations } from '@/hooks/useDonations';

const MyComponent = () => {
  const { donations, loading, error } = useDonations('education');
  // Use donations data
};
```
