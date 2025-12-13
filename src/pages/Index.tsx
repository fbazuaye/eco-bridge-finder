import { useState, useMemo } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Download,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { FilterPanel } from '@/components/FilterPanel';
import { AlumniTable } from '@/components/AlumniTable';
import { AlumniDetailModal } from '@/components/AlumniDetailModal';
import { PlatformChart } from '@/components/PlatformChart';
import { LocationList } from '@/components/LocationList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAlumniData } from '@/hooks/useAlumniData';
import { exportToExcel } from '@/utils/exportToExcel';
import { FilterState, DbAlumniRecord } from '@/types/alumni';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
const Index = () => {
  const { toast } = useToast();
  const { data: alumniData, isLoading, stats, refetch, updateApproval } = useAlumniData();
  const [selectedRecord, setSelectedRecord] = useState<DbAlumniRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    yearRange: [1970, 2024],
    locations: [],
    platforms: [],
    minConfidence: 0,
    status: [],
    approvalStatus: 'all',
    searchQuery: '',
  });

  const filteredData = useMemo(() => {
    return alumniData.filter(record => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchFields = [
          record.full_name,
          record.company,
          record.location,
          record.occupation
        ].filter(Boolean).join(' ').toLowerCase();
        if (!searchFields.includes(query)) return false;
      }

      // Year range
      if (record.graduation_year) {
        const year = parseInt(record.graduation_year);
        if (year < filters.yearRange[0] || year > filters.yearRange[1]) return false;
      }

      // Platforms
      if (filters.platforms.length > 0 && !filters.platforms.includes(record.platform)) {
        return false;
      }

      // Status
      if (filters.status.length > 0 && !filters.status.includes(record.status)) {
        return false;
      }

      // Confidence
      if (record.confidence_score < filters.minConfidence) return false;

      // Approval status
      if (filters.approvalStatus === 'approved' && !record.is_approved) return false;
      if (filters.approvalStatus === 'pending' && record.is_approved) return false;

      return true;
    });
  }, [alumniData, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.platforms.length > 0) count++;
    if (filters.status.length > 0) count++;
    if (filters.minConfidence > 0) count++;
    if (filters.approvalStatus !== 'all') count++;
    if (filters.yearRange[0] > 1970 || filters.yearRange[1] < 2024) count++;
    return count;
  }, [filters]);

  const handleApprovalChange = (id: string, approved: boolean) => {
    updateApproval(id, approved);
    
    if (selectedRecord?.id === id) {
      setSelectedRecord(prev => prev ? { ...prev, is_approved: approved } : null);
    }
  };

  const handleViewDetails = (record: DbAlumniRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    // Transform data for export
    const exportData = filteredData.map(record => ({
      id: record.id,
      fullName: record.full_name,
      status: record.status,
      graduationYear: record.graduation_year,
      occupation: record.occupation,
      company: record.company,
      publicEmail: record.public_email,
      publicPhone: record.public_phone,
      platform: record.platform,
      profileUrl: record.profile_url,
      location: record.location,
      confidenceScore: record.confidence_score,
      dateFound: new Date(record.date_found),
      isApproved: record.is_approved,
      sourceAttribution: record.source_attribution,
      matchedKeywords: record.matched_keywords || [],
      bio: record.bio,
    }));
    
    exportToExcel(exportData, 'ecoba-alumni-data');
    toast({
      title: "Export Complete",
      description: `${filteredData.length} records exported to Excel.`,
    });
  };

  const handleScan = async () => {
    setIsScanning(true);
    toast({
      title: "Scan Initiated",
      description: "Scanning public web profiles for Edo College alumni using AI...",
    });
    
    try {
      const { data, error } = await supabase.functions.invoke('alumni-scan', {
        body: { 
          query: filters.searchQuery || '',
          platforms: ['LinkedIn', 'Facebook', 'Twitter', 'Web', 'News']
        }
      });

      if (error) {
        console.error('Scan error:', error);
        toast({
          title: "Scan Failed",
          description: error.message || "Failed to scan for alumni. Please try again.",
          variant: "destructive",
        });
      } else if (data?.success) {
        const profileCount = data.profiles?.length || 0;
        toast({
          title: "Scan Complete",
          description: `Found ${profileCount} potential alumni. Refreshing data...`,
        });
        refetch();
      } else {
        toast({
          title: "Scan Complete",
          description: data?.message || "No new alumni found.",
        });
      }
    } catch (err) {
      console.error('Scan error:', err);
      toast({
        title: "Scan Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-ecoba-gold" />
          <p className="text-muted-foreground">Loading alumni data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => setFilters(prev => ({ ...prev, searchQuery: query }))}
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Alumni <span className="text-ecoba-gold">Intelligence</span> Dashboard
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            AI-powered discovery and verification of Edo College Old Boys worldwide. 
            Bridging memories, building futures.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Records"
            value={stats.totalRecords}
            subtitle="Alumni discovered"
            icon={Users}
            delay={0}
          />
          <StatCard
            title="Confirmed"
            value={stats.confirmedCount}
            subtitle="Verified alumni"
            icon={CheckCircle2}
            trend={{ value: 12, positive: true }}
            delay={100}
          />
          <StatCard
            title="Pending Review"
            value={stats.pendingReview}
            subtitle="Awaiting approval"
            icon={Clock}
            delay={200}
          />
          <StatCard
            title="This Week"
            value={stats.recentFindings}
            subtitle="New discoveries"
            icon={TrendingUp}
            trend={{ value: 8, positive: true }}
            delay={300}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <PlatformChart data={stats.platformBreakdown} />
          <LocationList data={stats.topLocations} />
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Alumni Records
            </h2>
            <Badge variant="gold">{filteredData.length} results</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              activeFilterCount={activeFilterCount}
            />

            <Button 
              variant="gold-outline" 
              className="gap-2"
              onClick={handleScan}
              disabled={isScanning}
            >
              <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Scanning...' : 'Run Scan'}
            </Button>

            <Button 
              variant="gold" 
              className="gap-2"
              onClick={handleExport}
              disabled={filteredData.length === 0}
            >
              <Download className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <AlumniTable
          data={filteredData}
          onApprovalChange={handleApprovalChange}
          onViewDetails={handleViewDetails}
        />

        {/* Compliance Notice */}
        <div className="mt-8 p-4 rounded-xl border border-border/50 bg-secondary/20">
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-medium text-foreground">Data Compliance Notice:</span> This system only scans and stores publicly available information. 
            All records include source attribution for transparency. Data processing complies with applicable privacy regulations.
          </p>
        </div>
      </main>

      {/* Detail Modal */}
      <AlumniDetailModal
        record={selectedRecord}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApprovalChange={handleApprovalChange}
      />
    </div>
  );
};

export default Index;
