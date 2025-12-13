export type AlumniStatus = 'Confirmed' | 'Probable' | 'Uncertain';

export type SocialPlatform = 'LinkedIn' | 'Facebook' | 'Twitter' | 'Instagram' | 'Web' | 'News';

export interface AlumniRecord {
  id: string;
  fullName: string;
  status: AlumniStatus;
  graduationYear: string | null;
  occupation: string | null;
  company: string | null;
  publicEmail: string | null;
  publicPhone: string | null;
  platform: SocialPlatform;
  profileUrl: string;
  location: string | null;
  confidenceScore: number;
  dateFound: Date;
  isApproved: boolean;
  sourceAttribution: string;
  matchedKeywords: string[];
  bio: string | null;
}

export interface FilterState {
  yearRange: [number, number];
  locations: string[];
  platforms: SocialPlatform[];
  minConfidence: number;
  status: AlumniStatus[];
  approvalStatus: 'all' | 'approved' | 'pending';
  searchQuery: string;
}

export interface DashboardStats {
  totalRecords: number;
  confirmedCount: number;
  probableCount: number;
  pendingReview: number;
  platformBreakdown: Record<SocialPlatform, number>;
  topLocations: { location: string; count: number }[];
  recentFindings: number;
}
