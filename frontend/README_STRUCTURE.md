# Aloka Frontend

This is the frontend application for Aloka, a crowdfunding platform.

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── app/            # App configuration and providers
│   ├── features/       # Feature-based modules
│   ├── components/     # Shared components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility libraries
│   ├── types/          # TypeScript type definitions
│   ├── config/         # Configuration files
│   ├── routes/         # Routing configuration
│   └── styles/         # Global styles
└── ...
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Features

- Authentication (Sign in, Sign up, Password recovery)
- Campaign browsing and filtering
- Campaign creation and management
- Donation processing
- User dashboards (Donor and Creator)
- Real-time fund tracking
- Responsive design with Tailwind CSS
- Type-safe development with TypeScript

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- TanStack Query (React Query)
- Tailwind CSS
- Shadcn/ui components
- Axios

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

Please follow the established project structure when adding new features.
