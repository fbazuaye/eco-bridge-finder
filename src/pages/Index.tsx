import { useState, useMemo } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Download,
  RefreshCw,
  Search
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
import { mockAlumniData, getAlumniStats } from '@/data/mockAlumni';
import { exportToExcel } from '@/utils/exportToExcel';
import { AlumniRecord, FilterState } from '@/types/alumni';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [alumniData, setAlumniData] = useState(mockAlumniData);
  const [selectedRecord, setSelectedRecord] = useState<AlumniRecord | null>(null);
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

  const stats = useMemo(() => getAlumniStats(), []);

  const filteredData = useMemo(() => {
    return alumniData.filter(record => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchFields = [
          record.fullName,
          record.company,
          record.location,
          record.occupation
        ].filter(Boolean).join(' ').toLowerCase();
        if (!searchFields.includes(query)) return false;
      }

      // Year range
      if (record.graduationYear) {
        const year = parseInt(record.graduationYear);
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
      if (record.confidenceScore < filters.minConfidence) return false;

      // Approval status
      if (filters.approvalStatus === 'approved' && !record.isApproved) return false;
      if (filters.approvalStatus === 'pending' && record.isApproved) return false;

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
    setAlumniData(prev => 
      prev.map(record => 
        record.id === id ? { ...record, isApproved: approved } : record
      )
    );
    
    if (selectedRecord?.id === id) {
      setSelectedRecord(prev => prev ? { ...prev, isApproved: approved } : null);
    }

    toast({
      title: approved ? "Record Approved" : "Approval Removed",
      description: `Alumni record has been ${approved ? 'approved' : 'marked for review'}.`,
    });
  };

  const handleViewDetails = (record: AlumniRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    exportToExcel(filteredData, 'ecoba-alumni-data');
    toast({
      title: "Export Complete",
      description: `${filteredData.length} records exported to Excel.`,
    });
  };

  const handleScan = () => {
    setIsScanning(true);
    toast({
      title: "Scan Initiated",
      description: "Scanning public web profiles for Edo College alumni...",
    });
    
    // Simulate scan
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "Scan Complete",
        description: "Found 3 new potential alumni records.",
      });
    }, 3000);
  };

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
