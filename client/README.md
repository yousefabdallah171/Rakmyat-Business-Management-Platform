# Raqmena Client

This is the frontend application for the Raqmena business management platform.

## Features

- **Dashboard**: Overview of business metrics and activities
- **Accounting**: Invoice and expense management
- **Chat**: Real-time messaging system
- **Employees**: Employee management and HR functions
- **HR**: Human resources management
- **Projects**: Project management with Kanban board
- **Settings**: Application configuration

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Context
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Update environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
client/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components
│   ├── projects/          # Project-specific components
│   └── ui/                # Reusable UI components
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## Authentication

The application uses a mock authentication system. To integrate with the Laravel backend:

1. Update the auth context to use real API calls
2. Configure Laravel Sanctum for token-based authentication
3. Implement proper error handling and loading states

## Development

- Follow the existing component patterns
- Use TypeScript for all new code
- Follow the established naming conventions
- Test components before committing 