import { Tables } from '@/integrations/supabase/types';

// Database record type (snake_case from Supabase)
export type DbAlumniRecord = Tables<'alumni_records'>;

// Status and platform enums for use in components
export type AlumniStatus = 'Confirmed' | 'Probable' | 'Uncertain';
export type SocialPlatform = 'LinkedIn' | 'Facebook' | 'Twitter' | 'Instagram' | 'Web' | 'News';

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
  platformBreakdown: Record<string, number>;
  topLocations: { location: string; count: number }[];
  recentFindings: number;
}
