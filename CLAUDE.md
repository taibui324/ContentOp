# RankPot - Claude Code Instructions

## Project Overview

Social media trending content discovery app built with:
- **Backend:** FastAPI (Python 3.11+)
- **Frontend:** React + Vite + TailwindCSS
- **Database:** Supabase (PostgreSQL)
- **External APIs:** RapidAPI (TikTok, Instagram)

## Directory Structure

```
rankpot/
├── backend/           # FastAPI Python backend
│   ├── app/
│   ├── tests/
│   ├── requirements.txt
│   └── pyproject.toml
├── frontend/          # React Vite frontend
│   ├── src/
│   ├── tests/
│   └── package.json
└── PROJECT-PLAN.md    # Full project roadmap
```

---

## Commands

### Backend (Python/FastAPI)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Run development server
uvicorn app.main:app --reload --port 8000

# Run linting
ruff check .
ruff format .

# Run type checking
mypy app/

# Run tests
pytest
pytest --cov=app --cov-report=term-missing

# Run single test file
pytest tests/test_search.py -v
```

### Frontend (React/Vite)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Run linting
npm run lint
npm run lint:fix

# Run type checking (if using TypeScript)
npm run typecheck

# Run tests
npm run test
npm run test:coverage

# Build for production
npm run build
npm run preview
```

### Full Stack

```bash
# Run both backend and frontend (from root)
# Terminal 1:
cd backend && source venv/bin/activate && uvicorn app.main:app --reload

# Terminal 2:
cd frontend && npm run dev
```

---

## Code Quality Rules

### Python (Backend)

**Linter:** Ruff (replaces flake8, isort, black)
**Type Checker:** mypy
**Test Framework:** pytest

#### Style Guidelines:
- Use type hints for all function parameters and return types
- Docstrings for public functions (Google style)
- Max line length: 88 characters
- Use async/await for I/O operations
- Prefer Pydantic models for request/response schemas

#### Example Function:
```python
async def search_content(
    query: str,
    platform: Platform,
    limit: int = 50,
) -> list[ContentResult]:
    """Search for trending content by hashtag or keyword.

    Args:
        query: Search term (hashtag or keyword)
        platform: Target platform (tiktok or instagram)
        limit: Maximum results to return

    Returns:
        List of content results with metrics
    """
    ...
```

### JavaScript/React (Frontend)

**Linter:** ESLint with Prettier
**Test Framework:** Vitest + React Testing Library

#### Style Guidelines:
- Use functional components with hooks
- Prefer named exports over default exports
- Use React Query for server state
- Keep components small and focused
- Co-locate tests with components

#### Example Component:
```jsx
// SearchBar.jsx
export function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search hashtag or keyword..."
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !query.trim()}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
```

---

## Testing Requirements

### Before Committing:
1. All tests must pass: `pytest` (backend), `npm run test` (frontend)
2. No linting errors: `ruff check .` (backend), `npm run lint` (frontend)
3. Type checks pass: `mypy app/` (backend)

### Test Coverage Targets:
- Backend: 80% minimum
- Frontend: 70% minimum

### What to Test:
- **Backend:** API endpoints, service functions, data transformations
- **Frontend:** User interactions, component rendering, hooks

---

## Git Workflow

### Branch Naming:
- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code improvements

### Commit Messages:
```
type(scope): description

feat(search): add TikTok hashtag search endpoint
fix(auth): handle expired token refresh
refactor(api): extract common error handling
test(search): add unit tests for content service
docs(readme): update setup instructions
```

### Pre-commit Checks:
```bash
# Backend
ruff check . && ruff format --check . && mypy app/ && pytest

# Frontend
npm run lint && npm run test
```

---

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://...
RAPIDAPI_KEY=your_key_here
JWT_SECRET=your_secret_here
CORS_ORIGINS=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

---

## Common Patterns

### API Error Handling (Backend)
```python
from fastapi import HTTPException

async def get_content(content_id: str) -> Content:
    content = await content_service.get(content_id)
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return content
```

### API Calls (Frontend)
```javascript
// Use React Query for data fetching
import { useQuery } from '@tanstack/react-query';

export function useSearch(query) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => api.search(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
```

### Caching Pattern (Backend)
```python
from functools import lru_cache
from datetime import timedelta

# Cache search results for 1 hour
@cached(ttl=timedelta(hours=1))
async def search_trending(query: str, platform: str) -> list[dict]:
    return await rapidapi_client.search(query, platform)
```

---

## Debugging

### Backend Logs
```bash
# Run with debug logging
LOG_LEVEL=debug uvicorn app.main:app --reload
```

### Frontend DevTools
- React DevTools for component inspection
- React Query DevTools for cache inspection
- Network tab for API calls

---

## Deployment Checklist

- [ ] All tests passing
- [ ] No linting errors
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] CORS configured for production domain
- [ ] Rate limiting enabled
- [ ] Error tracking configured (Sentry)
