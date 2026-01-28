# RankPot

A comprehensive social media intelligence platform for creators, businesses, and agencies to discover trending content, track competitors, analyze performance, and leverage AI-powered insights.

## Features

### 🔍 Trending Content Discovery
- Search viral content across TikTok and Instagram
- Filter by niche, platform, engagement level, and date range
- Sort by recency, engagement, virality score, or growth velocity
- Save and bookmark content for later reference

### 📊 Analytics Dashboard
- Connect your social media accounts via OAuth
- Track follower growth, engagement rates, and post performance
- Identify optimal posting times based on historical data
- View audience insights and demographics

### 👀 Account Tracking & Monitoring
- Monitor competitor accounts and industry leaders
- Get real-time alerts when tracked accounts post viral content
- Compare performance metrics side-by-side
- Analyze posting patterns and strategies

### 🤖 AI-Powered Features
- **Virality Scoring**: Predict content's viral potential (1-100 score)
- **Content Analysis**: Detailed breakdown of what makes content perform
- **Content Generation**: AI-generated ideas, captions, and hooks
- **Curated Feed**: Personalized content recommendations

### 📅 Content Scheduling
- Visual calendar for planning posts
- Schedule content to multiple platforms
- Get optimal posting time suggestions
- Track publishing status and history

### 👥 Team & Agency Features
- Create workspaces for different clients
- Invite team members with role-based permissions (Owner, Editor, Viewer)
- Manage multiple client accounts
- Collaborate on content strategy

## Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: Supabase PostgreSQL with SQLAlchemy
- **Cache**: Redis (Upstash)
- **Background Jobs**: Celery
- **External APIs**: RapidAPI (TikTok/Instagram), OpenAI GPT-4
- **Testing**: pytest, hypothesis

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Charts**: Recharts
- **Calendar**: React Big Calendar
- **Testing**: Vitest, React Testing Library, fast-check

## Project Structure

```
rankpot/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── routers/     # API endpoints
│   │   ├── services/    # Business logic
│   │   ├── models/      # Database models
│   │   ├── schemas/     # Pydantic schemas
│   │   └── tasks/       # Celery background jobs
│   └── tests/           # Backend tests
├── frontend/            # React frontend
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── hooks/       # Custom hooks
│       ├── services/    # API services
│       └── stores/      # State management
└── .kiro/
    └── specs/           # Project specifications
```

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (via Supabase)
- Redis (via Upstash)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

4. Configure environment:
```bash
cp .env.example .env
# Edit .env with your credentials
```

5. Run migrations:
```bash
alembic upgrade head
```

6. Start server:
```bash
uvicorn app.main:app --reload
```

API available at http://localhost:8000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

App available at http://localhost:5173

## Subscription Tiers

### Starter ($19/month)
- 100 searches/month
- 10 AI analyses/month
- 5 tracked accounts
- 1 connected account

### Pro ($49/month)
- 500 searches/month
- 50 AI analyses/month
- 20 tracked accounts
- 5 connected accounts

### Business ($99/month)
- Unlimited searches
- Unlimited AI analyses
- Unlimited tracked accounts
- 10 connected accounts
- 10 workspaces
- Team collaboration

## Development

### Run Tests

Backend:
```bash
cd backend
pytest
pytest --cov=app  # With coverage
```

Frontend:
```bash
cd frontend
npm run test
npm run test:coverage  # With coverage
```

### Code Quality

Backend:
```bash
ruff check .
ruff format .
mypy app
```

Frontend:
```bash
npm run lint
npm run format
npm run typecheck
```

## Documentation

- [Requirements](.kiro/specs/rankpot-full-application/requirements.md)
- [Design Document](.kiro/specs/rankpot-full-application/design.md)
- [Implementation Tasks](.kiro/specs/rankpot-full-application/tasks.md)
- [Backend API Docs](http://localhost:8000/docs) (when running)

## License

Proprietary - All rights reserved

## Contact

For questions or support, contact: support@rankpot.com
