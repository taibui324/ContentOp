# Requirements Document

## Introduction

RankPot is a comprehensive social media intelligence platform designed for fitness & wellness creators, small businesses, marketing agencies, and enterprise teams. The platform enables users to discover trending content across Instagram and TikTok, track competitor accounts, analyze their own performance metrics, leverage AI-powered insights for content optimization, schedule content, and collaborate with team members.

This document defines the complete requirements for the full RankPot application across all phases, covering eight major feature areas: Trending Content Discovery, User Authentication, Account Tracking/Monitoring, AI-Powered Features, Category Browsing, Content Scheduling, User Analytics Dashboard, and Team/Agency Features.

## Glossary

- **Search_Service**: The backend service responsible for processing search queries and fetching content from external APIs
- **Content_Card**: A UI component displaying a single piece of social media content with its metrics
- **Content_Grid**: A UI component displaying multiple Content_Cards in a responsive layout
- **Auth_Service**: The backend service handling user authentication, registration, and session management
- **Bookmark_Service**: The backend service managing saved/bookmarked content for users
- **Platform_Client**: An adapter that communicates with external social media APIs (TikTok or Instagram)
- **Analytics_Service**: The backend service managing connected accounts and fetching performance metrics
- **Tracking_Service**: The backend service monitoring competitor accounts and detecting viral content
- **AI_Service**: The backend service providing AI-powered content analysis, scoring, and generation
- **Scheduling_Service**: The backend service managing content calendar and scheduled posts
- **Team_Service**: The backend service managing workspaces, team members, and permissions
- **Connected_Account**: A user's social media account linked via OAuth for analytics tracking
- **Tracked_Account**: A competitor or industry leader account being monitored for content performance
- **Engagement_Rate**: Calculated as (likes + comments) / views × 100 for TikTok, or (likes + comments) / follower_count × 100 for Instagram
- **Virality_Score**: A composite AI-generated score (1-100) predicting content's viral potential based on engagement patterns, hook quality, and timing
- **Content_Result**: A normalized data structure representing a piece of content from any platform
- **Search_Query**: A hashtag (prefixed with #) or keyword string entered by the user
- **Niche**: A content category (Fitness & Wellness, E-commerce & DTC, Finance & Crypto, Tech & SaaS, Lifestyle & Travel)
- **Analytics_Snapshot**: A daily record of account metrics (followers, engagement, posts)
- **Workspace**: A collaborative environment where team members can share content, analytics, and scheduling
- **Subscription_Tier**: User's plan level (starter, pro, business) determining feature access and limits
- **Scheduled_Post**: A content item queued for future publication to connected accounts
- **AI_Analysis**: Structured breakdown of why content performs well, including hook effectiveness, visual quality, and optimization suggestions

## Requirements

### Requirement 1: User Registration and Authentication

**User Story:** As a creator, I want to register and log in to the app securely, so that I can access features based on my subscription tier.

#### Acceptance Criteria

1. WHEN a user submits valid email and password for registration, THE Auth_Service SHALL create a new user account with 'starter' subscription tier and return an authentication token
2. WHEN a user submits invalid email format during registration, THE Auth_Service SHALL reject the request with a validation error message
3. WHEN a user submits a password shorter than 8 characters, THE Auth_Service SHALL reject the request with a password requirements error
4. WHEN a user attempts to register with an existing email, THE Auth_Service SHALL reject the request with a duplicate email error
5. WHEN a user submits valid credentials for login, THE Auth_Service SHALL return a JWT authentication token valid for 24 hours
6. WHEN a user submits invalid credentials for login, THE Auth_Service SHALL reject the request with an authentication error
7. WHEN an authentication token expires, THE Auth_Service SHALL require the user to log in again or use refresh token
8. THE Auth_Service SHALL support three subscription tiers: starter ($19/month), pro ($49/month), and business ($99/month)
9. WHEN a user requests password reset, THE Auth_Service SHALL send a reset link to the registered email valid for 1 hour
10. WHEN a user submits a valid password reset token with new password, THE Auth_Service SHALL update the password and invalidate the reset token
11. WHEN a user submits an expired or invalid reset token, THE Auth_Service SHALL reject the request with an error message

### Requirement 2: Hashtag and Keyword Search

**User Story:** As a creator, I want to search for trending content by hashtag or keyword, so that I can discover what content is performing well in my niche.

#### Acceptance Criteria

1. WHEN a user submits a Search_Query, THE Search_Service SHALL fetch trending content from both TikTok and Instagram platforms
2. WHEN a user submits an empty or whitespace-only query, THE Search_Service SHALL reject the request with a validation error
3. WHEN a user submits a query with a hashtag prefix (#), THE Search_Service SHALL search for that exact hashtag on both platforms
4. WHEN a user submits a query without a hashtag prefix, THE Search_Service SHALL search for that keyword on both platforms
5. WHEN the Search_Service receives results, THE Search_Service SHALL normalize content into Content_Result format with platform, content_id, content_url, thumbnail_url, caption, metrics, and niche category
6. WHEN the Search_Service fetches content, THE Search_Service SHALL calculate engagement_rate for each Content_Result
7. WHEN a search completes successfully, THE Search_Service SHALL log the query to search_history with user_id, query, platforms, results_count, and timestamp
8. THE Search_Service SHALL return results within 3 seconds for typical queries
9. WHEN a user selects a date range filter, THE Search_Service SHALL return only content posted within that date range

### Requirement 3: Niche-Based Content Discovery

**User Story:** As a creator, I want to browse trending content by niche category, so that I can find inspiration specific to my content vertical.

#### Acceptance Criteria

1. THE Search_Service SHALL support five initial niche categories: Fitness & Wellness, E-commerce & DTC, Finance & Crypto, Tech & SaaS, and Lifestyle & Travel
2. WHEN a user selects a niche, THE Content_Grid SHALL display trending content curated for that niche
3. WHEN displaying niche-specific content, THE Search_Service SHALL use niche-relevant hashtags and keywords for discovery
4. WHEN a user has not selected a niche, THE Content_Grid SHALL display content from all niches
5. THE Search_Service SHALL support adding new niche categories without code changes through configuration

### Requirement 4: Content Display and Metrics

**User Story:** As a creator, I want to see content with engagement metrics, so that I can evaluate which content is performing well.

#### Acceptance Criteria

1. WHEN displaying a Content_Result, THE Content_Card SHALL show thumbnail, caption preview, platform indicator, niche tag, and key metrics (views, likes, comments)
2. WHEN displaying metrics, THE Content_Card SHALL show engagement_rate as a percentage with one decimal place
3. WHEN a user clicks on a Content_Card, THE Content_Card SHALL open the original content URL in a new browser tab
4. WHEN displaying TikTok content, THE Content_Card SHALL show views, likes, comments, and shares
5. WHEN displaying Instagram content, THE Content_Card SHALL show likes and comments
6. WHEN the Content_Grid receives results, THE Content_Grid SHALL display Content_Cards in a responsive grid layout
7. WHEN displaying content with AI analysis, THE Content_Card SHALL show the Virality_Score badge

### Requirement 5: Sort and Filter Results

**User Story:** As a creator, I want to sort and filter search results, so that I can find the most relevant trending content.

#### Acceptance Criteria

1. WHEN a user selects "Most Recent" sort option, THE Content_Grid SHALL order results by posting timestamp descending
2. WHEN a user selects "Most Engaged" sort option, THE Content_Grid SHALL order results by engagement_rate descending
3. WHEN a user selects "Most Viral" sort option, THE Content_Grid SHALL order results by Virality_Score descending
4. WHEN a user selects "Fastest Growing" sort option, THE Content_Grid SHALL order results by engagement velocity (engagement gained per hour since posting)
5. WHEN a user selects a platform filter (TikTok or Instagram), THE Content_Grid SHALL display only content from that platform
6. WHEN a user selects a date range filter, THE Content_Grid SHALL display only content posted within that range
7. WHEN a user selects an engagement level filter (low, medium, high), THE Content_Grid SHALL display content matching that engagement tier
8. WHEN no sort option is selected, THE Content_Grid SHALL default to "Most Engaged" ordering
9. WHEN no platform filter is selected, THE Content_Grid SHALL display content from both platforms

### Requirement 6: Save and Bookmark Content

**User Story:** As a creator, I want to save content for later reference, so that I can build a collection of inspiration for my own content.

#### Acceptance Criteria

1. WHEN an authenticated user clicks the save button on a Content_Card, THE Bookmark_Service SHALL persist the content to saved_content table with user_id, platform, content_id, content_url, thumbnail_url, caption, metrics, niche, ai_score, and timestamp
2. WHEN a user attempts to save content without authentication, THE Bookmark_Service SHALL prompt the user to log in
3. WHEN a user saves content that is already saved, THE Bookmark_Service SHALL remove the content from saved_content (toggle behavior)
4. WHEN displaying a Content_Card, THE Content_Card SHALL indicate whether the content is already saved by the current user
5. WHEN a user views their saved content page, THE Bookmark_Service SHALL return all saved content for that user ordered by saved_at descending
6. WHEN a user deletes saved content, THE Bookmark_Service SHALL remove the content from saved_content table
7. WHEN a user requests CSV export of saved content, THE Bookmark_Service SHALL generate a CSV file with content details, metrics, and AI analysis

### Requirement 7: OAuth Account Connection

**User Story:** As a creator, I want to connect my social media accounts, so that I can track my own performance metrics.

#### Acceptance Criteria

1. WHEN a user initiates Instagram OAuth flow, THE Analytics_Service SHALL redirect to Instagram authorization and handle the callback
2. WHEN a user initiates TikTok OAuth flow, THE Analytics_Service SHALL redirect to TikTok authorization and handle the callback
3. WHEN OAuth authorization succeeds, THE Analytics_Service SHALL store the connected_account with platform, platform_user_id, access_token, refresh_token, and token_expires_at
4. WHEN an access token is about to expire, THE Analytics_Service SHALL automatically refresh it using the refresh_token
5. WHEN a user disconnects an account, THE Analytics_Service SHALL remove the connected_account and associated analytics data
6. THE Analytics_Service SHALL limit connected accounts based on subscription tier: starter (1), pro (5), business (10)
7. WHEN OAuth connection fails, THE Analytics_Service SHALL display a clear error message with troubleshooting steps

### Requirement 8: Analytics Dashboard

**User Story:** As a creator, I want to view my account performance metrics, so that I can understand how my content is performing.

#### Acceptance Criteria

1. WHEN a user views the dashboard, THE Analytics_Service SHALL display an overview of key metrics for all connected accounts
2. WHEN displaying account metrics, THE Analytics_Service SHALL show follower count, follower growth, total posts, total engagement, and engagement rate
3. WHEN a user selects a connected account, THE Analytics_Service SHALL display detailed metrics for that account
4. WHEN displaying detailed metrics, THE Analytics_Service SHALL show post-by-post performance with views, likes, comments, and shares
5. WHEN a user selects a time range, THE Analytics_Service SHALL display metrics for that period with week-over-week or month-over-month comparisons
6. THE Analytics_Service SHALL identify and highlight the user's best performing content
7. THE Analytics_Service SHALL calculate and display optimal posting times based on historical engagement data
8. WHEN displaying audience insights, THE Analytics_Service SHALL show demographics and growth trends

### Requirement 9: Analytics Data Collection

**User Story:** As a system operator, I want to collect and store analytics data, so that users can view historical performance trends.

#### Acceptance Criteria

1. THE Analytics_Service SHALL fetch metrics for connected accounts daily and store as analytics_snapshots
2. WHEN fetching metrics, THE Analytics_Service SHALL record followers, following, posts_count, total_likes, total_comments, and engagement_rate
3. WHEN displaying trends, THE Analytics_Service SHALL use analytics_snapshots to show growth over time
4. THE Analytics_Service SHALL retain analytics_snapshots for at least 90 days

### Requirement 10: Account Tracking and Monitoring

**User Story:** As a creator, I want to monitor competitor accounts, so that I can stay informed about their content strategy and viral posts.

#### Acceptance Criteria

1. WHEN a user adds an account to track, THE Tracking_Service SHALL store the tracked_account with platform, account_url, account_name, and user_id
2. THE Tracking_Service SHALL limit tracked accounts based on subscription tier: starter (5), pro (20), business (unlimited)
3. WHEN a tracked account posts new content, THE Tracking_Service SHALL detect and store the content within 24 hours
4. WHEN a tracked account's content goes viral (exceeds engagement threshold), THE Tracking_Service SHALL send a notification to the user
5. WHEN a user views tracked accounts, THE Tracking_Service SHALL display account metrics and recent content performance
6. WHEN a user requests competitor comparison, THE Tracking_Service SHALL display side-by-side metrics comparison between tracked accounts and user's connected accounts
7. THE Tracking_Service SHALL analyze posting patterns (frequency, timing) for tracked accounts
8. WHEN a user removes a tracked account, THE Tracking_Service SHALL delete the tracked_account and associated tracked_content

### Requirement 11: Viral Content Alerts

**User Story:** As a creator, I want to receive alerts when tracked accounts post viral content, so that I can quickly identify trending topics.

#### Acceptance Criteria

1. WHEN tracked content exceeds the viral threshold (top 10% engagement for that account), THE Tracking_Service SHALL mark it as viral
2. WHEN viral content is detected, THE Tracking_Service SHALL create an in-app notification for the user
3. WHEN a user enables email alerts, THE Tracking_Service SHALL send email notifications for viral content
4. WHEN displaying alerts, THE Tracking_Service SHALL show content preview, metrics, and link to original
5. WHEN a user dismisses an alert, THE Tracking_Service SHALL mark the notification as read

### Requirement 12: AI Virality Scoring

**User Story:** As a creator, I want AI-powered virality predictions, so that I can identify content with high potential before it peaks.

#### Acceptance Criteria

1. WHEN content is fetched or saved, THE AI_Service SHALL calculate a Virality_Score (1-100) based on engagement patterns, hook quality, and timing factors
2. WHEN calculating Virality_Score, THE AI_Service SHALL consider engagement rate, view velocity, share ratio, caption quality, and posting time
3. WHEN displaying Virality_Score, THE Content_Card SHALL show a visual indicator (low: 1-33, medium: 34-66, high: 67-100)
4. THE AI_Service SHALL limit AI analyses based on subscription tier: starter (10/month), pro (50/month), business (unlimited)
5. WHEN a user requests detailed AI analysis, THE AI_Service SHALL provide breakdown of scoring factors

### Requirement 13: AI Content Analysis

**User Story:** As a creator, I want detailed AI analysis of why content performs well, so that I can apply those insights to my own content.

#### Acceptance Criteria

1. WHEN a user requests AI analysis for content, THE AI_Service SHALL analyze hook effectiveness, visual quality signals, caption/copy quality, hashtag optimization, and timing factors
2. WHEN displaying AI analysis, THE AI_Service SHALL provide actionable improvement suggestions
3. WHEN analyzing hooks, THE AI_Service SHALL evaluate the first 3 seconds of video content or first line of caption
4. WHEN analyzing captions, THE AI_Service SHALL evaluate length, call-to-action presence, emoji usage, and hashtag strategy
5. THE AI_Service SHALL store AI analyses for future reference and pattern learning

### Requirement 14: AI Content Generation

**User Story:** As a creator, I want AI-generated content ideas and captions, so that I can overcome creative blocks and optimize my content.

#### Acceptance Criteria

1. WHEN a user requests content ideas, THE AI_Service SHALL generate 5-10 content ideas based on trending topics in the user's niche
2. WHEN a user requests caption generation, THE AI_Service SHALL generate 3 caption variations optimized for engagement
3. WHEN a user requests hook suggestions, THE AI_Service SHALL generate 3 hook variations for video content
4. WHEN generating content, THE AI_Service SHALL consider the user's niche, past performance, and current trends
5. THE AI_Service SHALL allow users to provide context or constraints for generation
6. WHEN a user saves generated content, THE AI_Service SHALL store it in ai_generations table for future reference

### Requirement 15: AI-Curated Feeds

**User Story:** As a creator, I want personalized content recommendations, so that I can discover relevant trending content without manual searching.

#### Acceptance Criteria

1. WHEN a user views the AI-curated feed, THE AI_Service SHALL display content recommendations based on user's niche, saved content, and engagement patterns
2. WHEN curating content, THE AI_Service SHALL prioritize content with high Virality_Score and relevance to user's interests
3. WHEN a user interacts with recommended content (save, view, dismiss), THE AI_Service SHALL update the recommendation model
4. THE AI_Service SHALL refresh curated feeds daily with new recommendations
5. WHEN displaying curated content, THE AI_Service SHALL explain why each piece was recommended

### Requirement 16: Content Calendar

**User Story:** As a creator, I want to plan and schedule my content, so that I can maintain a consistent posting schedule.

#### Acceptance Criteria

1. WHEN a user views the content calendar, THE Scheduling_Service SHALL display a visual calendar with scheduled posts
2. WHEN a user creates a scheduled post, THE Scheduling_Service SHALL store the post with content_type, caption, media_urls, scheduled_for, and status
3. WHEN displaying the calendar, THE Scheduling_Service SHALL show posts in daily, weekly, and monthly views
4. WHEN a user drags a post to a new date/time, THE Scheduling_Service SHALL update the scheduled_for timestamp
5. THE Scheduling_Service SHALL support draft, pending_review, approved, scheduled, published, and failed statuses

### Requirement 17: Optimal Posting Times

**User Story:** As a creator, I want recommendations for the best times to post, so that I can maximize engagement.

#### Acceptance Criteria

1. WHEN a user views scheduling options, THE Scheduling_Service SHALL suggest optimal posting times based on historical engagement data
2. WHEN calculating optimal times, THE Scheduling_Service SHALL analyze the user's connected account engagement patterns
3. WHEN no historical data is available, THE Scheduling_Service SHALL suggest industry-standard optimal times for the platform
4. WHEN displaying suggestions, THE Scheduling_Service SHALL show expected engagement lift for each time slot

### Requirement 18: Content Publishing

**User Story:** As a creator, I want to publish content directly to my connected accounts, so that I can manage everything from one platform.

#### Acceptance Criteria

1. WHEN a scheduled post reaches its scheduled_for time, THE Scheduling_Service SHALL attempt to publish to the connected account
2. WHEN publishing succeeds, THE Scheduling_Service SHALL update status to 'published' and store the published_content_id
3. WHEN publishing fails, THE Scheduling_Service SHALL update status to 'failed' and notify the user with error details
4. WHEN a user manually publishes a draft, THE Scheduling_Service SHALL immediately attempt publication
5. THE Scheduling_Service SHALL support publishing to Instagram and TikTok connected accounts

### Requirement 19: Team Workspaces

**User Story:** As an agency, I want to create workspaces for different clients, so that I can manage multiple accounts separately.

#### Acceptance Criteria

1. WHEN a business-tier user creates a workspace, THE Team_Service SHALL create a new workspace with name, description, and owner_id
2. WHEN a workspace is created, THE Team_Service SHALL automatically add the creator as owner with full permissions
3. WHEN displaying workspaces, THE Team_Service SHALL show all workspaces the user has access to
4. WHEN a user switches workspaces, THE Team_Service SHALL update the context to show only that workspace's data
5. THE Team_Service SHALL limit workspaces based on subscription tier: business only (up to 10 workspaces)

### Requirement 20: Team Member Management

**User Story:** As a workspace owner, I want to invite team members, so that we can collaborate on content strategy.

#### Acceptance Criteria

1. WHEN an owner invites a team member by email, THE Team_Service SHALL send an invitation email with a unique invite link
2. WHEN a user accepts an invitation, THE Team_Service SHALL add them to the workspace with the specified role
3. THE Team_Service SHALL support three roles: owner (full access), editor (create/edit content), viewer (read-only)
4. WHEN an owner changes a member's role, THE Team_Service SHALL update their permissions immediately
5. WHEN an owner removes a team member, THE Team_Service SHALL revoke their access to the workspace
6. WHEN displaying team members, THE Team_Service SHALL show name, email, role, and last active timestamp

### Requirement 21: Role-Based Permissions

**User Story:** As a workspace owner, I want to control what team members can do, so that I can protect sensitive data and actions.

#### Acceptance Criteria

1. WHEN a viewer attempts to create or edit content, THE Team_Service SHALL reject the action with a permission error
2. WHEN an editor attempts to manage team members or billing, THE Team_Service SHALL reject the action with a permission error
3. WHEN checking permissions, THE Team_Service SHALL verify the user's role in the current workspace context
4. THE Team_Service SHALL enforce permissions at both API and UI levels
5. WHEN displaying UI elements, THE Team_Service SHALL hide or disable actions the user cannot perform

### Requirement 22: Client Management for Agencies

**User Story:** As an agency, I want to manage multiple client accounts, so that I can provide services to multiple businesses.

#### Acceptance Criteria

1. WHEN an agency creates a client profile, THE Team_Service SHALL store client name, industry, connected accounts, and notes
2. WHEN viewing a client, THE Team_Service SHALL display all associated connected accounts, saved content, and scheduled posts
3. WHEN generating reports, THE Team_Service SHALL scope data to the selected client
4. THE Team_Service SHALL support assigning team members to specific clients within a workspace

### Requirement 23: External API Integration

**User Story:** As a system operator, I want the app to reliably fetch data from social media platforms, so that users receive accurate trending content and analytics.

#### Acceptance Criteria

1. WHEN the Platform_Client fetches TikTok content, THE Platform_Client SHALL use the RapidAPI TikTok Scraper endpoint
2. WHEN the Platform_Client fetches Instagram content, THE Platform_Client SHALL use the RapidAPI Instagram Scraper endpoint
3. WHEN an external API returns an error, THE Platform_Client SHALL return a graceful error response without crashing
4. WHEN an external API times out after 10 seconds, THE Platform_Client SHALL return a timeout error to the caller
5. WHEN fetching content, THE Platform_Client SHALL cache results for 1 hour to reduce API costs
6. IF the cache contains valid results for a query, THEN THE Platform_Client SHALL return cached results without calling the external API
7. WHEN the RapidAPI rate limit is exceeded, THE Platform_Client SHALL return a rate limit error with retry-after information

### Requirement 24: OpenAI Integration

**User Story:** As a system operator, I want reliable AI capabilities, so that users receive accurate content analysis and generation.

#### Acceptance Criteria

1. WHEN the AI_Service analyzes content, THE AI_Service SHALL use OpenAI GPT-4 API for text analysis
2. WHEN the AI_Service generates content, THE AI_Service SHALL use OpenAI GPT-4 API with appropriate prompts
3. WHEN OpenAI API returns an error, THE AI_Service SHALL return a graceful error response with retry option
4. WHEN OpenAI API rate limit is exceeded, THE AI_Service SHALL queue requests and process when available
5. THE AI_Service SHALL cache AI analysis results to reduce API costs for repeated requests

### Requirement 25: Error Handling and User Feedback

**User Story:** As a user, I want clear feedback when something goes wrong, so that I understand what happened and what to do next.

#### Acceptance Criteria

1. WHEN a search returns no results, THE Content_Grid SHALL display a "No results found" message with suggestions to try different keywords
2. WHEN an API error occurs during search, THE Content_Grid SHALL display an error message and a retry button
3. WHEN a network error occurs, THE Content_Grid SHALL display a connectivity error message
4. WHEN content is loading, THE Content_Grid SHALL display a loading skeleton or spinner
5. WHEN a user action succeeds (save, delete, connect, schedule), THE UI SHALL display a brief success notification
6. WHEN a user action fails, THE UI SHALL display an error notification with the failure reason
7. WHEN OAuth connection fails, THE Analytics_Service SHALL display a clear error message with troubleshooting steps
8. WHEN AI analysis fails, THE AI_Service SHALL display an error message and offer to retry

### Requirement 26: Rate Limiting and Subscription Enforcement

**User Story:** As a system operator, I want to enforce subscription limits, so that API costs remain within budget and users upgrade for more features.

#### Acceptance Criteria

1. THE Search_Service SHALL limit searches based on subscription tier: starter (100/month), pro (500/month), business (unlimited)
2. WHEN a user exceeds the search limit, THE Search_Service SHALL return a rate limit error with upgrade prompt
3. THE Search_Service SHALL limit each search to return a maximum of 50 results per platform
4. WHEN an unauthenticated user attempts to search, THE Search_Service SHALL require authentication
5. THE AI_Service SHALL limit AI analyses based on subscription tier: starter (10/month), pro (50/month), business (unlimited)
6. THE Tracking_Service SHALL limit tracked accounts based on subscription tier: starter (5), pro (20), business (unlimited)
7. THE Analytics_Service SHALL limit connected accounts based on subscription tier: starter (1), pro (5), business (10)
8. THE Team_Service SHALL limit workspaces to business tier only (up to 10 workspaces)

