# RankPot Backend

FastAPI backend for the RankPot social media intelligence platform.

## Tech Stack

- **Framework**: FastAPI (Python 3.11+)
- **Database**: Supabase PostgreSQL with SQLAlchemy
- **Cache**: Redis (Upstash)
- **Background Jobs**: Celery
- **External APIs**: RapidAPI (TikTok/Instagram), OpenAI GPT-4
- **Testing**: pytest, hypothesis (property-based testing)

## Setup

1. **Install Python 3.11+**

2. **Create virtual environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
pip install -r requirements-dev.txt  # For development
```

4. **Configure environment**:
```bash
cp .env.example .env
# Edit .env with your credentials
```

5. **Run database migrations**:
```bash
alembic upgrade head
```

6. **Start development server**:
```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

## Development

### Run tests
```bash
pytest
pytest --cov=app  # With coverage
```

### Linting and formatting
```bash
ruff check .
ruff format .
mypy app
```

### Create migration
```bash
alembic revision --autogenerate -m "description"
alembic upgrade head
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── routers/             # API endpoints
│   ├── services/            # Business logic
│   └── tasks/               # Celery background tasks
├── tests/                   # Test suite
├── requirements.txt         # Production dependencies
└── requirements-dev.txt     # Development dependencies
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
