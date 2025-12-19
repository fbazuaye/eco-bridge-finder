import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type AlumniRecord = Tables<'alumni_records'>;

export interface AlumniStats {
  totalRecords: number;
  confirmedCount: number;
  probableCount: number;
  pendingReview: number;
  platformBreakdown: Record<string, number>;
  topLocations: { location: string; count: number }[];
  recentFindings: number;
}

export function useAlumniData() {
  const { toast } = useToast();
  const [data, setData] = useState<AlumniRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlumni = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: records, error: fetchError } = await supabase
        .from('alumni_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setData(records || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch alumni records';
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const updateApproval = async (id: string, approved: boolean) => {
    try {
      const { error: updateError } = await supabase
        .from('alumni_records')
        .update({ is_approved: approved })
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      setData(prev =>
        prev.map(record =>
          record.id === id ? { ...record, is_approved: approved } : record
        )
      );

      toast({
        title: approved ? 'Record Approved' : 'Approval Removed',
        description: `Alumni record has been ${approved ? 'approved' : 'marked for review'}.`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update approval';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    }
  };

  // Extract unique locations for the filter
  const availableLocations = useMemo(() => {
    const locations = new Set<string>();
    data.forEach(r => {
      if (r.location) {
        locations.add(r.location);
      }
    });
    return Array.from(locations).sort();
  }, [data]);

  const stats = useMemo<AlumniStats>(() => {
    const totalRecords = data.length;
    const confirmedCount = data.filter(r => r.status === 'Confirmed').length;
    const probableCount = data.filter(r => r.status === 'Probable').length;
    const pendingReview = data.filter(r => !r.is_approved).length;

    // Platform breakdown
    const platformBreakdown: Record<string, number> = {};
    data.forEach(r => {
      platformBreakdown[r.platform] = (platformBreakdown[r.platform] || 0) + 1;
    });

    // Top locations
    const locationCounts: Record<string, number> = {};
    data.forEach(r => {
      if (r.location) {
        locationCounts[r.location] = (locationCounts[r.location] || 0) + 1;
      }
    });
    const topLocations = Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Recent findings (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentFindings = data.filter(r => new Date(r.date_found) >= weekAgo).length;

    return {
      totalRecords,
      confirmedCount,
      probableCount,
      pendingReview,
      platformBreakdown,
      topLocations,
      recentFindings,
    };
  }, [data]);

  return {
    data,
    isLoading,
    error,
    stats,
    availableLocations,
    refetch: fetchAlumni,
    updateApproval,
  };
}
