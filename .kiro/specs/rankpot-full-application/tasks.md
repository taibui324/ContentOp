# Implementation Plan: RankPot Full Application

## Overview

This implementation plan covers the complete RankPot social media intelligence platform across all 8 feature areas. The plan is organized into 6 phases following the project timeline, with each phase building on previous work. Tasks are ordered to ensure incremental progress with no orphaned code.

Tech Stack: FastAPI (Python 3.11+), React + Vite + TailwindCSS + React Query, Supabase PostgreSQL, Redis (Upstash), RapidAPI, OpenAI GPT-4.

## Tasks

- [ ] 1. Project Setup and Foundation
  - [-] 1.1 Initialize monorepo structure with backend and frontend directories
    - Create backend/ with FastAPI project structure (app/, tests/, requirements.txt, pyproject.toml)
    - Create frontend/ with Vite React TypeScript project
    - Configure shared tooling (ESLint, Prettier, Ruff, mypy)
    - _Requirements: Project structure from CLAUDE.md_

  - [~] 1.2 Set up Supabase database and initial schema
    - Create Supabase project
    - Apply users table migration with subscription fields
    - Apply password_reset_tokens table migration
    - Apply rate_limits and subscription_limits tables
    - Configure connection pooling and environment variables
    - _Requirements: 1.1, 1.8_

  - [~] 1.3 Configure backend dependencies and project settings
    - Set up requirements.txt with FastAPI, Pydantic, SQLAlchemy, httpx, celery, redis
    - Set up requirements-dev.txt with pytest, hypothesis, pytest-asyncio, pytest-cov, respx
    - Create app/config.py with environment variable loading
    - Create app/database.py with Supabase connection
    - _Requirements: Project setup_

  - [~] 1.4 Configure frontend dependencies and project settings
    - Install React Query, Zustand, TailwindCSS, Recharts, react-big-calendar
    - Install dev dependencies (Vitest, React Testing Library, fast-check, MSW)
    - Configure TailwindCSS with custom theme
    - Set up API client base configuration
    - _Requirements: Project setup_

- [~] 2. Checkpoint - Verify project setup
  - Ensure backend starts with `uvicorn app.main:app --reload`
  - Ensure frontend starts with `npm run dev`
  - Ensure database connection works
  - Ask the user if questions arise.

- [ ] 3. Authentication System (Phase 1)
  - [~] 3.1 Implement core Pydantic schemas for auth
    - Create app/schemas/auth.py with AuthRequest, AuthResponse, User, PasswordResetRequest
    - Create app/schemas/common.py with ErrorResponse, SubscriptionTier enum
    - _Requirements: 1.1, 1.5_

  - [~] 3.2 Implement Auth Service
    - Create app/services/auth.py with AuthService class
    - Implement register() with email validation, password hashing, user creation
    - Implement login() with credential verification and JWT generation
    - Implement verify_token() for JWT validation
    - Implement request_password_reset() and reset_password()
    - Implement get_subscription_limits()
    - _Requirements: 1.1-1.11_

  - [ ]* 3.3 Write property tests for Auth Service
    - **Property 1: Registration round-trip**
    - **Property 2: Invalid email rejection**
    - **Property 3: Short password rejection**
    - **Property 4: Duplicate email rejection**
    - **Property 5: Authentication correctness**
    - **Property 6: Password reset round-trip**
    - **Validates: Requirements 1.1-1.11**

  - [~] 3.4 Implement Auth API endpoints
    - Create app/routers/auth.py with POST /register, POST /login
    - Add POST /password-reset/request, POST /password-reset/confirm
    - Add GET /me for current user info
    - Add authentication dependency for protected routes
    - _Requirements: 1.1-1.11_

  - [ ]* 3.5 Write integration tests for Auth endpoints
    - Test registration success and error cases
    - Test login success and error cases
    - Test password reset flow
    - Test token validation
    - _Requirements: 1.1-1.11_

  - [~] 3.6 Implement frontend Auth components
    - Create src/components/auth/LoginForm.tsx
    - Create src/components/auth/RegisterForm.tsx
    - Create src/components/auth/PasswordResetForm.tsx
    - Create src/stores/authStore.ts with Zustand
    - _Requirements: 1.1-1.11_

  - [~] 3.7 Implement frontend Auth pages and routing
    - Create src/pages/Login.tsx, Register.tsx, PasswordReset.tsx
    - Set up protected route wrapper
    - Implement token storage and refresh logic
    - _Requirements: 1.1-1.11_

- [~] 4. Checkpoint - Verify authentication system
  - Ensure registration creates user and returns token
  - Ensure login works with valid credentials
  - Ensure protected routes require authentication
  - Ask the user if questions arise.

- [ ] 5. Search and Content Discovery (Phase 1)
  - [~] 5.1 Apply database migrations for search feature
    - Apply saved_content table migration
    - Apply search_history table migration
    - _Requirements: 2.7, 6.1_

  - [~] 5.2 Implement Platform Client adapters
    - Create app/services/platforms/base.py with PlatformClient interface
    - Create app/services/platforms/tiktok.py with TikTok RapidAPI integration
    - Create app/services/platforms/instagram.py with Instagram RapidAPI integration
    - Implement content normalization to ContentResult format
    - Implement engagement rate calculation
    - _Requirements: 2.1, 2.5, 2.6, 23.1, 23.2_

  - [~] 5.3 Implement Cache Service
    - Create app/services/cache.py with Redis-based CacheService
    - Implement get(), set(), delete(), get_or_set() methods
    - Implement cache key generation for search queries
    - Configure 1-hour TTL for search results
    - _Requirements: 23.5, 23.6_

  - [ ]* 5.4 Write property test for cache behavior
    - **Property 20: Cache hit behavior**
    - **Validates: Requirements 23.5, 23.6**

  - [~] 5.5 Implement Search Service
    - Create app/services/search.py with SearchService class
    - Implement search() with query parsing (hashtag vs keyword)
    - Implement niche filtering and categorization
    - Implement sorting (recent, engaged, viral, fastest_growing)
    - Implement rate limit checking
    - Implement search history logging
    - _Requirements: 2.1-2.9, 3.1-3.5_

  - [ ]* 5.6 Write property tests for Search Service
    - **Property 7: Whitespace query rejection**
    - **Property 8: Query type parsing**
    - **Property 9: Content normalization completeness**
    - **Property 11: Sort ordering correctness**
    - **Property 12: Platform filter correctness**
    - **Property 22: Result count limiting**
    - **Validates: Requirements 2.2-2.6, 5.1-5.5, 26.3**

  - [~] 5.7 Implement Search API endpoints
    - Create app/routers/search.py with POST /search
    - Add GET /search/trending/{niche} for niche-specific content
    - Add GET /search/quota for remaining search quota
    - _Requirements: 2.1-2.9, 3.1-3.5_

  - [~] 5.8 Implement Pydantic schemas for content
    - Create app/schemas/content.py with ContentResult, ContentMetrics, SearchRequest, SearchResponse
    - Create app/schemas/enums.py with Platform, Niche, SortOption enums
    - _Requirements: 2.5, 4.1-4.7_

  - [ ]* 5.9 Write integration tests for Search endpoints
    - Test search with valid queries
    - Test search with filters and sorting
    - Test rate limiting
    - Test caching behavior
    - _Requirements: 2.1-2.9_

  - [~] 5.10 Implement frontend Search components
    - Create src/components/search/SearchBar.tsx with query input and niche selector
    - Create src/components/search/ContentCard.tsx with metrics display
    - Create src/components/search/ContentGrid.tsx with sorting and filtering
    - Create src/components/search/FilterPanel.tsx for platform, date, engagement filters
    - _Requirements: 4.1-4.7, 5.1-5.9_

  - [ ]* 5.11 Write property test for engagement rate formatting
    - **Property 10: Engagement rate formatting**
    - **Validates: Requirements 4.2**

  - [~] 5.12 Implement frontend Search hooks and API
    - Create src/hooks/useSearch.ts with React Query
    - Create src/hooks/useNicheTrending.ts
    - Create src/services/searchApi.ts
    - _Requirements: 2.1-2.9_

  - [~] 5.13 Implement Search page
    - Create src/pages/Search.tsx with full search UI
    - Implement URL-based query state
    - Add loading and error states
    - _Requirements: 2.1-2.9, 4.1-4.7, 5.1-5.9_

- [ ] 6. Bookmark System (Phase 1)
  - [~] 6.1 Implement Bookmark Service
    - Create app/services/bookmark.py with BookmarkService class
    - Implement save_content(), unsave_content(), toggle_save()
    - Implement get_saved_content() with ordering
    - Implement is_saved() for checking save state
    - Implement export_to_csv()
    - _Requirements: 6.1-6.7_

  - [ ]* 6.2 Write property tests for Bookmark Service
    - **Property 13: Bookmark toggle round-trip**
    - **Property 14: Saved content ordering**
    - **Property 24: CSV export completeness**
    - **Validates: Requirements 6.1, 6.3, 6.5, 6.7**

  - [~] 6.3 Implement Bookmark API endpoints
    - Create app/routers/bookmarks.py with POST /bookmarks (save/toggle)
    - Add DELETE /bookmarks/{platform}/{content_id}
    - Add GET /bookmarks with pagination and filters
    - Add GET /bookmarks/export/csv
    - _Requirements: 6.1-6.7_

  - [~] 6.4 Implement frontend Bookmark components
    - Add save button to ContentCard with toggle behavior
    - Create src/pages/SavedContent.tsx
    - Create src/components/bookmarks/SavedContentList.tsx
    - Add CSV export button
    - _Requirements: 6.1-6.7_

  - [~] 6.5 Implement frontend Bookmark hooks
    - Create src/hooks/useSavedContent.ts
    - Create src/hooks/useSaveContent.ts mutation
    - Create src/hooks/useExportCSV.ts
    - _Requirements: 6.1-6.7_

- [~] 7. Checkpoint - Verify search and bookmarks
  - Ensure search returns results from both platforms
  - Ensure sorting and filtering work correctly
  - Ensure bookmarks can be saved and retrieved
  - Ensure CSV export works
  - Ask the user if questions arise.

- [ ] 8. Analytics Dashboard (Phase 1)
  - [~] 8.1 Apply database migrations for analytics
    - Apply connected_accounts table migration
    - Apply analytics_snapshots table migration
    - _Requirements: 7.3, 9.1_

  - [~] 8.2 Implement OAuth handlers
    - Create app/services/oauth/instagram.py with Instagram OAuth flow
    - Create app/services/oauth/tiktok.py with TikTok OAuth flow
    - Implement token storage and refresh logic
    - _Requirements: 7.1-7.7_

  - [~] 8.3 Implement Analytics Service
    - Create app/services/analytics.py with AnalyticsService class
    - Implement initiate_oauth(), handle_oauth_callback()
    - Implement disconnect_account()
    - Implement get_dashboard_overview(), get_account_details()
    - Implement get_optimal_posting_times()
    - Implement refresh_token_if_needed()
    - _Requirements: 7.1-7.7, 8.1-8.8, 9.1-9.4_

  - [ ]* 8.4 Write property test for optimal time calculation
    - **Property 25: Optimal time calculation**
    - **Validates: Requirements 8.7**

  - [~] 8.5 Implement Analytics API endpoints
    - Create app/routers/analytics.py with GET /analytics/oauth/{platform}/initiate
    - Add GET /analytics/oauth/{platform}/callback
    - Add GET /analytics/accounts, DELETE /analytics/accounts/{id}
    - Add GET /analytics/dashboard, GET /analytics/accounts/{id}/details
    - Add GET /analytics/accounts/{id}/optimal-times
    - _Requirements: 7.1-7.7, 8.1-8.8_

  - [~] 8.6 Set up Celery for background jobs
    - Create app/tasks/__init__.py with Celery configuration
    - Create app/tasks/fetch_metrics.py for daily metrics fetching
    - Configure Redis as Celery broker
    - Set up periodic task schedule
    - _Requirements: 9.1-9.4_

  - [~] 8.7 Implement frontend Analytics components
    - Create src/components/analytics/DashboardOverview.tsx
    - Create src/components/analytics/AccountMetrics.tsx
    - Create src/components/analytics/MetricsChart.tsx with Recharts
    - Create src/components/analytics/OptimalTimesCard.tsx
    - Create src/components/analytics/ConnectAccountButton.tsx
    - _Requirements: 8.1-8.8_

  - [~] 8.8 Implement frontend Analytics page
    - Create src/pages/Dashboard.tsx
    - Implement account selection and time range controls
    - Add OAuth connection flow UI
    - _Requirements: 7.1-7.7, 8.1-8.8_

- [~] 9. Checkpoint - Verify analytics dashboard
  - Ensure OAuth flow works for both platforms
  - Ensure dashboard displays metrics correctly
  - Ensure background job fetches metrics
  - Ask the user if questions arise.

- [ ] 10. Account Tracking and Monitoring (Phase 2)
  - [~] 10.1 Apply database migrations for tracking
    - Apply tracked_accounts table migration
    - Apply tracked_content table migration
    - Apply notifications table migration
    - _Requirements: 10.1, 11.2_

  - [~] 10.2 Implement Tracking Service
    - Create app/services/tracking.py with TrackingService class
    - Implement add_tracked_account(), remove_tracked_account()
    - Implement get_tracked_accounts(), get_tracked_content()
    - Implement compare_accounts(), get_posting_patterns()
    - Implement viral detection logic (top 10% engagement threshold)
    - _Requirements: 10.1-10.8, 11.1-11.5_

  - [ ]* 10.3 Write property test for viral detection
    - **Property 23: Tracked content viral detection**
    - **Validates: Requirements 11.1**

  - [~] 10.4 Implement Tracking API endpoints
    - Create app/routers/tracking.py with POST /tracking/accounts
    - Add DELETE /tracking/accounts/{id}
    - Add GET /tracking/accounts, GET /tracking/accounts/{id}/content
    - Add GET /tracking/compare
    - Add GET /tracking/accounts/{id}/patterns
    - _Requirements: 10.1-10.8_

  - [~] 10.5 Implement content tracking background job
    - Create app/tasks/track_accounts.py for hourly content checking
    - Implement viral content detection and notification creation
    - Implement email alert sending for viral content
    - _Requirements: 10.3, 10.4, 11.1-11.4_

  - [~] 10.6 Implement Notification Service
    - Create app/services/notifications.py with NotificationService
    - Implement create_notification(), get_notifications()
    - Implement mark_as_read(), get_unread_count()
    - _Requirements: 11.2-11.5_

  - [~] 10.7 Implement Notification API endpoints
    - Create app/routers/notifications.py with GET /notifications
    - Add PATCH /notifications/{id}/read
    - Add GET /notifications/unread-count
    - _Requirements: 11.2-11.5_

  - [~] 10.8 Implement frontend Tracking components
    - Create src/components/tracking/TrackedAccountCard.tsx
    - Create src/components/tracking/AddAccountModal.tsx
    - Create src/components/tracking/ViralAlertCard.tsx
    - Create src/components/tracking/ComparisonChart.tsx
    - Create src/components/tracking/PostingPatternsChart.tsx
    - _Requirements: 10.1-10.8, 11.1-11.5_

  - [~] 10.9 Implement frontend Tracking page
    - Create src/pages/Tracking.tsx
    - Implement tracked accounts list with add/remove
    - Implement competitor comparison view
    - _Requirements: 10.1-10.8_

  - [~] 10.10 Implement frontend Notifications
    - Create src/components/common/NotificationBell.tsx
    - Create src/components/common/NotificationDropdown.tsx
    - Implement real-time notification updates
    - _Requirements: 11.2-11.5_

- [~] 11. Checkpoint - Verify tracking and notifications
  - Ensure accounts can be tracked
  - Ensure viral content is detected
  - Ensure notifications are created and displayed
  - Ask the user if questions arise.

- [ ] 12. AI-Powered Features (Phase 3)
  - [~] 12.1 Apply database migrations for AI
    - Apply ai_generations table migration
    - Apply ai_analyses table migration
    - _Requirements: 13.5, 14.6_

  - [~] 12.2 Implement OpenAI Client
    - Create app/services/ai/openai_client.py with OpenAI API integration
    - Implement text analysis methods
    - Implement content generation methods
    - Configure rate limiting and error handling
    - _Requirements: 24.1-24.5_

  - [~] 12.3 Implement AI Service - Scoring
    - Create app/services/ai/scoring.py with virality scoring logic
    - Implement calculate_virality_score() with factor breakdown
    - Implement level mapping (low/medium/high)
    - Cache AI analysis results
    - _Requirements: 12.1-12.5_

  - [ ]* 12.4 Write property tests for AI scoring
    - **Property 16: Virality score range**
    - **Property 17: Virality level mapping**
    - **Validates: Requirements 12.1, 12.3**

  - [~] 12.5 Implement AI Service - Analysis
    - Create app/services/ai/analysis.py with content analysis
    - Implement analyze_content() with hook, visual, caption, hashtag, timing analysis
    - Generate actionable suggestions
    - _Requirements: 13.1-13.5_

  - [~] 12.6 Implement AI Service - Generation
    - Create app/services/ai/generation.py with content generation
    - Implement generate_content_ideas()
    - Implement generate_captions()
    - Implement generate_hooks()
    - _Requirements: 14.1-14.6_

  - [~] 12.7 Implement AI Service - Curated Feed
    - Create app/services/ai/curation.py with feed curation
    - Implement get_curated_feed() based on user preferences
    - Implement recommendation explanation
    - _Requirements: 15.1-15.5_

  - [~] 12.8 Implement AI API endpoints
    - Create app/routers/ai.py with POST /ai/score
    - Add POST /ai/analyze, GET /ai/quota
    - Add POST /ai/generate/ideas, POST /ai/generate/captions, POST /ai/generate/hooks
    - Add GET /ai/curated-feed
    - _Requirements: 12.1-12.5, 13.1-13.5, 14.1-14.6, 15.1-15.5_

  - [~] 12.9 Implement AI background processor
    - Create app/tasks/ai_processor.py for batch AI processing
    - Implement queued analysis processing
    - _Requirements: 24.4_

  - [~] 12.10 Implement frontend AI components
    - Create src/components/ai/ViralityScoreBadge.tsx
    - Create src/components/ai/AIAnalysisCard.tsx
    - Create src/components/ai/ContentIdeaList.tsx
    - Create src/components/ai/CaptionGenerator.tsx
    - Create src/components/ai/CuratedFeedCard.tsx
    - _Requirements: 12.1-12.5, 13.1-13.5, 14.1-14.6, 15.1-15.5_

  - [~] 12.11 Implement frontend AI page
    - Create src/pages/AIInsights.tsx
    - Implement content analysis view
    - Implement content generation interface
    - Implement curated feed view
    - _Requirements: 12.1-12.5, 13.1-13.5, 14.1-14.6, 15.1-15.5_

  - [~] 12.12 Integrate AI scores into search results
    - Add virality score display to ContentCard
    - Add AI analysis button to ContentCard
    - Update search to optionally include AI scores
    - _Requirements: 4.7, 12.1-12.5_

- [~] 13. Checkpoint - Verify AI features
  - Ensure virality scoring works
  - Ensure content analysis provides insights
  - Ensure content generation works
  - Ensure curated feed displays recommendations
  - Ask the user if questions arise.

- [ ] 14. Content Scheduling (Phase 4)
  - [~] 14.1 Apply database migrations for scheduling
    - Apply scheduled_posts table migration
    - _Requirements: 16.2_

  - [~] 14.2 Implement Scheduling Service
    - Create app/services/scheduling.py with SchedulingService class
    - Implement create_scheduled_post(), update_scheduled_post(), delete_scheduled_post()
    - Implement get_calendar()
    - Implement get_optimal_times()
    - Implement publish_now(), update_post_status()
    - _Requirements: 16.1-16.5, 17.1-17.4, 18.1-18.5_

  - [ ]* 14.3 Write property test for post status transitions
    - **Property 18: Post status transitions**
    - **Validates: Requirements 16.5, 18.2, 18.3**

  - [~] 14.4 Implement Scheduling API endpoints
    - Create app/routers/scheduling.py with POST /scheduling/posts
    - Add PUT /scheduling/posts/{id}, DELETE /scheduling/posts/{id}
    - Add GET /scheduling/calendar
    - Add GET /scheduling/optimal-times/{account_id}
    - Add POST /scheduling/posts/{id}/publish
    - _Requirements: 16.1-16.5, 17.1-17.4, 18.1-18.5_

  - [~] 14.5 Implement post publishing background job
    - Create app/tasks/publish_posts.py for scheduled publishing
    - Implement platform-specific publishing logic
    - Implement failure handling and notifications
    - _Requirements: 18.1-18.5_

  - [~] 14.6 Implement frontend Scheduling components
    - Create src/components/scheduling/ContentCalendar.tsx with react-big-calendar
    - Create src/components/scheduling/PostEditor.tsx
    - Create src/components/scheduling/OptimalTimeSuggestions.tsx
    - Create src/components/scheduling/PostStatusBadge.tsx
    - _Requirements: 16.1-16.5, 17.1-17.4_

  - [~] 14.7 Implement frontend Calendar page
    - Create src/pages/Calendar.tsx
    - Implement day/week/month views
    - Implement drag-and-drop rescheduling
    - Implement post creation and editing modals
    - _Requirements: 16.1-16.5, 17.1-17.4, 18.1-18.5_

- [~] 15. Checkpoint - Verify scheduling
  - Ensure posts can be created and scheduled
  - Ensure calendar displays correctly
  - Ensure publishing works
  - Ask the user if questions arise.

- [ ] 16. Team and Agency Features (Phase 4)
  - [~] 16.1 Apply database migrations for teams
    - Apply workspaces table migration
    - Apply workspace_members table migration
    - Apply workspace_invitations table migration
    - Apply clients table migration
    - Update existing tables with workspace_id foreign keys
    - _Requirements: 19.1, 20.1, 22.1_

  - [~] 16.2 Implement Team Service
    - Create app/services/team.py with TeamService class
    - Implement create_workspace(), get_workspaces()
    - Implement invite_member(), accept_invitation()
    - Implement update_member_role(), remove_member()
    - Implement check_permission()
    - Implement create_client(), get_clients()
    - _Requirements: 19.1-19.5, 20.1-20.6, 21.1-21.5, 22.1-22.4_

  - [ ]* 16.3 Write property tests for permissions
    - **Property 19: Role-based permission enforcement**
    - **Validates: Requirements 21.1-21.4**

  - [ ]* 16.4 Write property test for subscription limits
    - **Property 15: Subscription limit enforcement**
    - **Validates: Requirements 7.6, 10.2, 12.4, 26.1, 26.5-26.8**

  - [~] 16.5 Implement Team API endpoints
    - Create app/routers/team.py with POST /workspaces
    - Add GET /workspaces, GET /workspaces/{id}
    - Add POST /workspaces/{id}/invite, POST /invitations/{token}/accept
    - Add PUT /workspaces/{id}/members/{member_id}/role
    - Add DELETE /workspaces/{id}/members/{member_id}
    - Add POST /workspaces/{id}/clients, GET /workspaces/{id}/clients
    - _Requirements: 19.1-19.5, 20.1-20.6, 22.1-22.4_

  - [~] 16.6 Implement workspace context middleware
    - Create middleware to inject workspace context into requests
    - Update all services to respect workspace scoping
    - _Requirements: 19.4_

  - [~] 16.7 Implement frontend Team components
    - Create src/components/team/WorkspaceSelector.tsx
    - Create src/components/team/TeamMemberList.tsx
    - Create src/components/team/InviteMemberModal.tsx
    - Create src/components/team/ClientList.tsx
    - Create src/components/team/ClientCard.tsx
    - _Requirements: 19.1-19.5, 20.1-20.6, 22.1-22.4_

  - [~] 16.8 Implement frontend Team pages
    - Create src/pages/Settings.tsx with team management
    - Create src/pages/Clients.tsx for agency client management
    - Implement workspace switching in header
    - _Requirements: 19.1-19.5, 20.1-20.6, 22.1-22.4_

  - [~] 16.9 Implement permission-based UI
    - Create usePermissions hook
    - Conditionally render UI elements based on role
    - Disable actions user cannot perform
    - _Requirements: 21.4, 21.5_

- [~] 17. Checkpoint - Verify team features
  - Ensure workspaces can be created
  - Ensure members can be invited and managed
  - Ensure permissions are enforced
  - Ensure clients can be managed
  - Ask the user if questions arise.

- [ ] 18. Error Handling and Rate Limiting
  - [~] 18.1 Implement backend error handling
    - Create app/exceptions.py with custom exception classes
    - Implement global exception handlers in main.py
    - Add structured error responses
    - _Requirements: 25.1-25.8_

  - [ ]* 18.2 Write property test for error handling
    - **Property 21: API error graceful handling**
    - **Validates: Requirements 23.3, 24.3**

  - [~] 18.3 Implement rate limiting middleware
    - Create app/middleware/rate_limit.py
    - Implement per-user rate limiting based on subscription tier
    - Track usage in rate_limits table
    - _Requirements: 26.1-26.8_

  - [~] 18.4 Implement frontend error handling
    - Create src/utils/errorHandling.ts with error classes
    - Implement React Query error handlers
    - Create error boundary components
    - _Requirements: 25.1-25.8_

  - [~] 18.5 Implement frontend error UI components
    - Create src/components/common/ErrorBanner.tsx
    - Create src/components/common/EmptyState.tsx
    - Create src/components/common/LoadingSkeleton.tsx
    - Create src/components/common/UpgradePrompt.tsx
    - _Requirements: 25.1-25.8_

- [ ] 19. Final Integration and Polish
  - [~] 19.1 Implement main navigation and layout
    - Create src/components/layout/Header.tsx with navigation
    - Create src/components/layout/Sidebar.tsx
    - Create src/components/layout/MainLayout.tsx
    - Implement responsive design
    - _Requirements: UI/UX_

  - [~] 19.2 Implement Home/Landing page
    - Create src/pages/Home.tsx with feature overview
    - Add quick access to main features
    - _Requirements: UI/UX_

  - [~] 19.3 Implement Settings page
    - Create src/pages/Settings.tsx with account settings
    - Add subscription management section
    - Add notification preferences
    - _Requirements: 1.8, 11.3_

  - [~] 19.4 Add toast notifications
    - Implement success/error toast notifications
    - Add notification for async operations
    - _Requirements: 25.5, 25.6_

  - [~] 19.5 Implement loading states
    - Add loading skeletons to all data-fetching components
    - Implement optimistic updates where appropriate
    - _Requirements: 25.4_

- [~] 20. Final Checkpoint - Full application verification
  - Run all backend tests: `pytest --cov=app`
  - Run all frontend tests: `npm run test`
  - Verify all features work end-to-end
  - Verify error handling works correctly
  - Verify rate limiting works correctly
  - Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Background jobs (Celery) handle metrics fetching, content tracking, and post publishing
- All services respect workspace context for team features
- Rate limiting is enforced at the API level based on subscription tier
