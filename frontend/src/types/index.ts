/**
 * RankPot TypeScript Type Definitions
 * Based on the design document data models
 */

// Enums
export type Platform = 'tiktok' | 'instagram';
export type Niche = 'fitness_wellness' | 'ecommerce_dtc' | 'finance_crypto' | 'tech_saas' | 'lifestyle_travel';
export type SubscriptionTier = 'starter' | 'pro' | 'business';
export type SortOption = 'recent' | 'engaged' | 'viral' | 'fastest_growing';
export type PostStatus = 'draft' | 'pending_review' | 'approved' | 'scheduled' | 'publishing' | 'published' | 'failed';
export type TeamRole = 'owner' | 'editor' | 'viewer';
export type TimeRange = 'last_7_days' | 'last_30_days' | 'last_90_days' | 'custom';

// Content Types
export interface ContentMetrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
}

export interface ViralityScore {
  score: number;
  level: 'low' | 'medium' | 'high';
  factors: Record<string, number>;
}

export interface ContentResult {
  platform: Platform;
  contentId: string;
  contentUrl: string;
  thumbnailUrl: string | null;
  caption: string;
  metrics: ContentMetrics;
  postedAt: string | null;
  authorUsername: string | null;
  authorFollowers: number | null;
  niche: Niche | null;
  viralityScore: ViralityScore | null;
}

// AI Types
export interface AIAnalysis {
  contentId: string;
  viralityScore: ViralityScore;
  hookEffectiveness: number;
  visualQuality: number;
  captionQuality: number;
  hashtagOptimization: number;
  timingScore: number;
  suggestions: string[];
  analyzedAt: string;
}

export interface ContentIdea {
  id: string;
  title: string;
  description: string;
  niche: Niche;
  suggestedHashtags: string[];
  estimatedEngagement: 'low' | 'medium' | 'high';
}

export interface GeneratedCaption {
  text: string;
  hashtags: string[];
  callToAction: string | null;
  estimatedEngagement: string;
}

// Saved Content
export interface SavedContent extends ContentResult {
  id: string;
  savedAt: string;
  aiScore: number | null;
}

// Account Types
export interface ConnectedAccount {
  id: string;
  platform: Platform;
  accountName: string;
  accountUrl: string;
  followersCount: number;
  connectedAt: string;
}

export interface TrackedAccount {
  id: string;
  platform: Platform;
  accountName: string;
  accountUrl: string;
  followersCount: number | null;
  lastCheckedAt: string | null;
}

export interface TrackedContent {
  id: string;
  contentId: string;
  contentUrl: string;
  caption: string;
  postedAt: string;
  metrics: ContentMetrics;
  isViral: boolean;
  aiScore: number | null;
}

// Scheduling Types
export interface ScheduledPost {
  id: string;
  connectedAccountId: string;
  contentType: string;
  caption: string;
  mediaUrls: string[];
  scheduledFor: string;
  status: PostStatus;
  publishedAt: string | null;
  errorMessage: string | null;
}

// Team Types
export interface Workspace {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  memberCount: number;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  role: TeamRole;
  email: string;
  name: string | null;
  joinedAt: string;
  lastActiveAt: string | null;
}

export interface Client {
  id: string;
  name: string;
  industry: string | null;
  notes: string | null;
  connectedAccountIds: string[];
}

// Notification Types
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  read: boolean;
  createdAt: string;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  subscriptionTier: SubscriptionTier;
}

export interface AuthResponse {
  userId: string;
  email: string;
  subscriptionTier: SubscriptionTier;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Dashboard Types
export interface DashboardOverview {
  accounts: ConnectedAccount[];
  totalFollowers: number;
  followerGrowth: number;
  totalEngagement: number;
  engagementGrowth: number;
  topPerformingContent: ContentResult[];
}

export interface AnalyticsSnapshot {
  id: string;
  date: string;
  followers: number;
  following: number;
  postsCount: number;
  totalLikes: number;
  totalComments: number;
  engagementRate: number;
}

export interface OptimalTime {
  dayOfWeek: number;
  hour: number;
  expectedEngagementLift: number;
}

export interface AccountDetails {
  account: ConnectedAccount;
  snapshots: AnalyticsSnapshot[];
  optimalTimes: OptimalTime[];
}

// Search Types
export interface SearchOptions {
  platforms?: Platform[];
  niche?: Niche;
  sortBy?: SortOption;
  dateRangeStart?: string;
  dateRangeEnd?: string;
  engagementLevel?: 'low' | 'medium' | 'high';
  includeAiScores?: boolean;
  limit?: number;
}

export interface SearchResponse {
  query: string;
  results: ContentResult[];
  totalCount: number;
  cached: boolean;
}

// API Error Types
export interface ApiError {
  error: string;
  errorCode: string;
  detail?: string | Record<string, unknown>;
}

// Quota Types
export interface QuotaStatus {
  used: number;
  limit: number;
  resetAt: string;
}

export interface SubscriptionLimits {
  tier: SubscriptionTier;
  searchesPerMonth: number;
  aiAnalysesPerMonth: number;
  trackedAccounts: number;
  connectedAccounts: number;
  workspaces: number;
}
