# RankPot - Social Media Intelligence Platform

## Project Overview

**App Name:** RankPot
**Concept:** All-in-one social media intelligence platform for creators and businesses to discover trending content, track competitors, analyze performance, and optimize their content strategy with AI
**Timeline:** 3-4 months (phased rollout)
**Developer:** Solo developer
**Budget:** $100-200/month infrastructure (scales with users)

---

## Target Markets & Niches

### Primary Verticals (5 Niches)

| Niche | Target Users | Content Focus |
|-------|--------------|---------------|
| **Fitness & Wellness** | Trainers, coaches, health influencers | Workout videos, nutrition tips, transformation content |
| **E-commerce & DTC** | Shopify stores, dropshippers, product brands | Product demos, UGC, promotional content |
| **Finance & Crypto** | Traders, investors, Web3 creators | Market analysis, tips, educational content |
| **Tech & SaaS** | Software companies, developers, tech reviewers | Tutorials, product launches, tech news |
| **Lifestyle & Travel** | Travel bloggers, food, fashion creators | Vlogs, reviews, aesthetic content |

### User Types
- Individual creators & influencers
- Small businesses & startups
- Marketing agencies (multi-client)
- Enterprise social media teams

---

## Supported Platforms

| Platform | Data Focus | Priority |
|----------|------------|----------|
| **Instagram** | Reels, posts, stories metrics | P0 - Launch |
| **TikTok** | Videos, trending sounds, hashtags | P0 - Launch |
| **LinkedIn** | Profile analytics, post performance | P1 - Phase 2 |

---

## MVP Scope (v1.0) - 5 Core Features

### Feature 1: Trending Content Discovery
**Priority:** P0 (Phase 1)

Search and discover viral content in your niche across platforms.

**Capabilities:**
- [ ] Hashtag/keyword search across Instagram, TikTok, LinkedIn
- [ ] Filter by niche, platform, date range, engagement level
- [ ] Sort by: most recent, most engaged, fastest growing
- [ ] Save/bookmark content for inspiration
- [ ] Export saved content to CSV
- [ ] Niche-specific trending feeds

**User Flow:**
1. User selects niche (e.g., "Fitness & Wellness")
2. Enters search query (e.g., "#homeworkout" or "meal prep")
3. Views results with metrics (views, likes, engagement rate)
4. Saves content they want to emulate
5. Gets AI analysis of why content performed well

---

### Feature 2: Analytics Dashboard
**Priority:** P0 (Phase 1)

Track your own accounts' performance with comprehensive metrics.

**Capabilities:**
- [ ] Connect accounts via OAuth (Instagram, TikTok, LinkedIn)
- [ ] Follower growth tracking over time
- [ ] Post-by-post performance metrics
- [ ] Best performing content identification
- [ ] Audience demographics & insights
- [ ] Optimal posting times analysis
- [ ] Revenue/conversion tracking (link clicks, swipe-ups)
- [ ] Week-over-week / month-over-month comparisons

**Dashboard Views:**
- Overview: Key metrics at a glance
- Content: Individual post performance
- Audience: Demographics & growth
- Revenue: Clicks, conversions, attribution

---

### Feature 3: Account Tracking (Competitor Monitoring)
**Priority:** P1 (Phase 2)

Monitor competitors and industry leaders to stay ahead.

**Capabilities:**
- [ ] Add unlimited accounts to track
- [ ] Real-time alerts when tracked accounts post
- [ ] Performance tracking over time (growth trends)
- [ ] Side-by-side competitor comparison
- [ ] Content categorization (what types perform best)
- [ ] Posting pattern analysis (frequency, timing)
- [ ] Engagement benchmarking against your account
- [ ] Export competitor reports

**Tracking Levels:**
- Basic: New post alerts
- Advanced: Performance trends + comparisons
- Full Suite: All above + content categorization + patterns

---

### Feature 4: AI Content Intelligence
**Priority:** P2 (Phase 3)

AI-powered analysis and content generation to optimize your strategy.

**Capabilities:**
- [ ] Virality Score (1-100) for any content
- [ ] Detailed breakdown of WHY content works:
  - Hook effectiveness
  - Visual quality signals
  - Caption/copy analysis
  - Hashtag optimization
  - Timing factors
- [ ] Actionable improvement suggestions
- [ ] AI content idea generation based on trends
- [ ] AI caption/hook writing
- [ ] Trend prediction (what's about to peak)

**AI Models:**
- OpenAI GPT-4 for text analysis/generation
- Custom scoring model for virality prediction
- Trend analysis using historical data patterns

---

### Feature 5: Content Calendar & Scheduling
**Priority:** P3 (Phase 4)

Plan, create, and publish content with a full workflow.

**Capabilities:**
- [ ] Visual calendar view of planned content
- [ ] Optimal posting time recommendations
- [ ] Draft content creation & storage
- [ ] Team review & approval workflow
- [ ] Multi-platform scheduling
- [ ] Auto-posting to connected accounts
- [ ] Content queue management
- [ ] Recurring post templates

**Workflow:**
```
Draft → Review → Approve → Schedule → Publish → Analyze
```

---

## Pricing Structure (3 Tiers)

| Tier | Price | Features |
|------|-------|----------|
| **Starter** | $19/month | Search + Dashboard (1 connected account, 100 searches/month) |
| **Pro** | $49/month | + Tracking + AI (5 accounts, 500 searches, 50 AI analyses) |
| **Business** | $99/month | + Calendar + Unlimited (10 accounts, unlimited searches, team features) |

**Free Trial:** 14 days of Pro tier

---

## Technical Architecture

### Tech Stack

```
┌──────────────────────────────────────────────────────────────┐
│                         FRONTEND                              │
│  React 18 + Vite + TailwindCSS + React Query + Zustand       │
│  Charts: Recharts | Calendar: react-big-calendar             │
│  Hosted on: Vercel                                           │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                         BACKEND                               │
│  FastAPI (Python 3.11+) + Celery (background jobs)           │
│  Hosted on: Railway or Render                                │
└──────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐   ┌─────────────────┐   ┌─────────────────────┐
│   DATABASE    │   │   CACHE/QUEUE   │   │   EXTERNAL APIS     │
│   Supabase    │   │   Redis         │   │   - RapidAPI        │
│   PostgreSQL  │   │   (Upstash)     │   │   - OpenAI          │
│               │   │                 │   │   - Platform APIs   │
└───────────────┘   └─────────────────┘   └─────────────────────┘
```

### Backend Structure (Expanded)

```
backend/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── models/
│   │   ├── user.py
│   │   ├── subscription.py
│   │   ├── connected_account.py
│   │   ├── saved_content.py
│   │   ├── tracked_account.py
│   │   ├── scheduled_post.py
│   │   └── analytics_snapshot.py
│   ├── schemas/
│   ├── routers/
│   │   ├── auth.py
│   │   ├── search.py
│   │   ├── dashboard.py
│   │   ├── tracking.py
│   │   ├── ai.py
│   │   ├── calendar.py
│   │   └── billing.py
│   ├── services/
│   │   ├── platforms/
│   │   │   ├── tiktok.py
│   │   │   ├── instagram.py
│   │   │   └── linkedin.py
│   │   ├── ai/
│   │   │   ├── scoring.py
│   │   │   ├── generation.py
│   │   │   └── trends.py
│   │   ├── analytics.py
│   │   ├── tracking.py
│   │   └── scheduler.py
│   ├── tasks/           # Celery background tasks
│   │   ├── fetch_metrics.py
│   │   ├── track_accounts.py
│   │   └── publish_posts.py
│   └── utils/
├── requirements.txt
└── Dockerfile
```

### Frontend Structure (Expanded)

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── search/
│   │   ├── dashboard/
│   │   ├── tracking/
│   │   ├── ai/
│   │   └── calendar/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Search.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Tracking.jsx
│   │   ├── AIInsights.jsx
│   │   ├── Calendar.jsx
│   │   ├── Settings.jsx
│   │   └── Billing.jsx
│   ├── hooks/
│   ├── services/
│   ├── stores/
│   └── App.jsx
└── package.json
```

### Database Schema (Expanded)

```sql
-- Users & Auth
users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  password_hash VARCHAR,
  subscription_tier VARCHAR, -- 'starter', 'pro', 'business'
  subscription_status VARCHAR,
  created_at TIMESTAMP
)

-- Connected social accounts (OAuth)
connected_accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  platform VARCHAR, -- 'instagram', 'tiktok', 'linkedin'
  platform_user_id VARCHAR,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  account_name VARCHAR,
  followers_count INTEGER,
  connected_at TIMESTAMP
)

-- Analytics snapshots (daily)
analytics_snapshots (
  id UUID PRIMARY KEY,
  connected_account_id UUID REFERENCES connected_accounts,
  date DATE,
  followers INTEGER,
  following INTEGER,
  posts_count INTEGER,
  total_likes INTEGER,
  total_comments INTEGER,
  engagement_rate DECIMAL,
  metrics_json JSONB
)

-- Tracked competitor accounts
tracked_accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  platform VARCHAR,
  platform_user_id VARCHAR,
  account_name VARCHAR,
  account_url VARCHAR,
  last_checked_at TIMESTAMP,
  created_at TIMESTAMP
)

-- Tracked account content
tracked_content (
  id UUID PRIMARY KEY,
  tracked_account_id UUID REFERENCES tracked_accounts,
  content_id VARCHAR,
  content_url VARCHAR,
  content_type VARCHAR,
  caption TEXT,
  posted_at TIMESTAMP,
  metrics_json JSONB,
  ai_score INTEGER,
  ai_analysis JSONB,
  first_seen_at TIMESTAMP
)

-- Saved/bookmarked content
saved_content (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  platform VARCHAR,
  content_id VARCHAR,
  content_url VARCHAR,
  thumbnail_url VARCHAR,
  caption TEXT,
  metrics JSONB,
  ai_score INTEGER,
  saved_at TIMESTAMP
)

-- Scheduled posts
scheduled_posts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  connected_account_id UUID REFERENCES connected_accounts,
  content_type VARCHAR,
  caption TEXT,
  media_urls TEXT[],
  scheduled_for TIMESTAMP,
  status VARCHAR, -- 'draft', 'pending_review', 'approved', 'scheduled', 'published', 'failed'
  published_at TIMESTAMP,
  published_content_id VARCHAR,
  created_at TIMESTAMP
)

-- AI content generations
ai_generations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  generation_type VARCHAR, -- 'caption', 'ideas', 'analysis'
  input_context TEXT,
  output_content TEXT,
  created_at TIMESTAMP
)
```

---

## Development Phases (3-4 Months)

### Phase 1: Foundation + Search + Dashboard (Weeks 1-5)

**Week 1: Project Setup**
- [ ] Monorepo structure (backend + frontend)
- [ ] FastAPI skeleton with auth (JWT)
- [ ] React app with routing & layout
- [ ] Supabase database setup
- [ ] CI/CD pipeline

**Week 2-3: Search Feature**
- [ ] RapidAPI integrations (TikTok, Instagram)
- [ ] Search endpoints with caching
- [ ] Search UI with filters
- [ ] Save/bookmark functionality
- [ ] Niche category system

**Week 4-5: Dashboard Feature**
- [ ] OAuth flows for Instagram, TikTok
- [ ] Metrics fetching & storage
- [ ] Dashboard UI with charts
- [ ] Basic analytics views

**Phase 1 Deliverable:** Search + Dashboard live (Starter tier)

---

### Phase 2: Account Tracking + LinkedIn (Weeks 6-9)

**Week 6-7: Tracking Backend**
- [ ] Tracked accounts CRUD
- [ ] Background job for fetching updates
- [ ] Alert system (email/in-app)
- [ ] Competitor comparison logic

**Week 8: Tracking Frontend**
- [ ] Add/manage tracked accounts UI
- [ ] Competitor comparison views
- [ ] Alert preferences

**Week 9: LinkedIn Integration**
- [ ] LinkedIn OAuth flow
- [ ] Profile analytics fetching
- [ ] LinkedIn in dashboard

**Phase 2 Deliverable:** Tracking feature live (Pro tier unlocked)

---

### Phase 3: AI Intelligence (Weeks 10-12)

**Week 10: AI Scoring**
- [ ] OpenAI integration
- [ ] Virality scoring model
- [ ] Content analysis endpoint

**Week 11: AI Generation**
- [ ] Caption/hook generation
- [ ] Content idea generation
- [ ] Trend prediction

**Week 12: AI UI**
- [ ] AI insights page
- [ ] Inline AI analysis on content cards
- [ ] Generation interface

**Phase 3 Deliverable:** AI features live (Pro tier complete)

---

### Phase 4: Calendar + Polish (Weeks 13-16)

**Week 13-14: Calendar Backend**
- [ ] Scheduled posts CRUD
- [ ] Publishing queue system
- [ ] Platform posting APIs

**Week 15: Calendar Frontend**
- [ ] Calendar UI component
- [ ] Draft/schedule workflow
- [ ] Queue management

**Week 16: Polish & Launch**
- [ ] Billing integration (Stripe)
- [ ] Landing page
- [ ] Documentation
- [ ] Beta launch

**Phase 4 Deliverable:** Full product live (Business tier unlocked)

---

## Infrastructure & Costs

### Estimated Monthly Costs (At Scale)

| Service | Purpose | Cost |
|---------|---------|------|
| Vercel | Frontend | Free - $20 |
| Railway | Backend | $20-50 |
| Supabase | Database | Free - $25 |
| Upstash | Redis cache/queue | Free - $10 |
| RapidAPI | Social data | $50-100 |
| OpenAI | AI features | $30-100 |
| Stripe | Payments | 2.9% + 30¢ |
| **Total** | | **$100-300/month** |

### Break-even Analysis
- At $49/month Pro tier
- Need ~6 paying users to break even
- Target: 100 users = $4,900 MRR

---

## Key Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Platform API changes | High | Multiple data providers, abstract API layer |
| OpenAI costs spike | Medium | Caching, rate limiting per tier |
| OAuth approval delays | High | Start OAuth apps early, have fallback scraping |
| Scope creep | High | Strict phase gates, no new features until phase complete |
| Solo dev burnout | High | Realistic timeline, cut features not quality |

---

## Success Metrics

### Phase 1 (Month 1-2)
- [ ] Working search across 2 platforms
- [ ] Working dashboard for connected accounts
- [ ] 50 beta users signed up
- [ ] <3 second search response

### Phase 2 (Month 2-3)
- [ ] Tracking feature complete
- [ ] LinkedIn integrated
- [ ] 10 paying customers
- [ ] <5% churn rate

### Phase 3-4 (Month 3-4)
- [ ] AI features complete
- [ ] Calendar & scheduling live
- [ ] 50 paying customers
- [ ] $2,000+ MRR

---

## Post-MVP Roadmap (v2.0+)

1. **YouTube integration** - Long-form video analytics
2. **Twitter/X integration** - Text-based content tracking
3. **Team collaboration** - Multi-user workspaces
4. **White-label** - Agency reselling
5. **Mobile app** - iOS/Android companion
6. **API access** - Developer tier for integrations

---

## Next Steps

1. Set up project repository with monorepo structure
2. Create Supabase project and initial schema
3. Apply for Instagram/TikTok OAuth apps (start early!)
4. Sign up for RapidAPI and test endpoints
5. Build authentication system
6. Start Phase 1 development
