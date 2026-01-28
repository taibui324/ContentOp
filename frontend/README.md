# RankPot Frontend

React + TypeScript + Vite frontend for the RankPot social media intelligence platform.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Charts**: Recharts
- **Calendar**: React Big Calendar
- **Testing**: Vitest, React Testing Library, fast-check

## Setup

1. **Install Node.js 18+**

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment**:
```bash
cp .env.example .env
# Edit .env if needed
```

4. **Start development server**:
```bash
npm run dev
```

The app will be available at http://localhost:5173

## Development

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage
npm run typecheck    # Check TypeScript types
```

## Project Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── auth/        # Authentication components
│   │   ├── search/      # Search & content discovery
│   │   ├── analytics/   # Analytics dashboard
│   │   ├── tracking/    # Account tracking
│   │   ├── ai/          # AI features
│   │   ├── scheduling/  # Content calendar
│   │   ├── team/        # Team management
│   │   ├── common/      # Shared components
│   │   └── layout/      # Layout components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── stores/          # Zustand stores
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── index.html           # HTML template
```

## Features

- **Trending Content Discovery**: Search and browse viral content from TikTok and Instagram
- **Account Tracking**: Monitor competitor accounts and get viral alerts
- **Analytics Dashboard**: Track your own account performance
- **AI-Powered Insights**: Virality scoring, content analysis, and generation
- **Content Scheduling**: Plan and schedule posts with optimal timing
- **Team Collaboration**: Workspaces, roles, and client management

## Design System

The app uses a custom purple/violet theme with TailwindCSS. See `src/index.css` for theme variables.
