import { useState } from 'react';
import { 
  ExternalLink, 
  ChevronDown, 
  ChevronUp,
  Eye
} from 'lucide-react';
import { DbAlumniRecord, SocialPlatform, AlumniStatus } from '@/types/alumni';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface AlumniTableProps {
  data: DbAlumniRecord[];
  onApprovalChange: (id: string, approved: boolean) => void;
  onViewDetails: (record: DbAlumniRecord) => void;
}

type SortField = 'full_name' | 'confidence_score' | 'date_found' | 'graduation_year';
type SortDirection = 'asc' | 'desc';

const platformVariants: Record<SocialPlatform, "linkedin" | "twitter" | "facebook" | "instagram" | "web" | "news"> = {
  LinkedIn: 'linkedin',
  Twitter: 'twitter',
  Facebook: 'facebook',
  Instagram: 'instagram',
  Web: 'web',
  News: 'news',
};

const statusVariants: Record<AlumniStatus, "confirmed" | "probable" | "uncertain"> = {
  Confirmed: 'confirmed',
  Probable: 'probable',
  Uncertain: 'uncertain',
};

export function AlumniTable({ data, onApprovalChange, onViewDetails }: AlumniTableProps) {
  const [sortField, setSortField] = useState<SortField>('confidence_score');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];

    if (sortField === 'date_found') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-orange-500';
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="w-[50px]">
                <span className="sr-only">Approval</span>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('full_name')}
              >
                <div className="flex items-center">
                  Name
                  <SortIcon field="full_name" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('graduation_year')}
              >
                <div className="flex items-center">
                  Year
                  <SortIcon field="graduation_year" />
                </div>
              </TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Location</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('confidence_score')}
              >
                <div className="flex items-center">
                  Confidence
                  <SortIcon field="confidence_score" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('date_found')}
              >
                <div className="flex items-center">
                  Search Date
                  <SortIcon field="date_found" />
                </div>
              </TableHead>
              <TableHead className="w-[140px]">View Search Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((record, index) => (
              <TableRow 
                key={record.id} 
                className={cn(
                  "table-row-hover border-border/30",
                  !record.is_approved && "bg-secondary/20"
                )}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell>
                  <Switch
                    checked={record.is_approved}
                    onCheckedChange={(checked) => onApprovalChange(record.id, checked)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{record.full_name}</p>
                    {record.company && (
                      <p className="text-xs text-muted-foreground">{record.company}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariants[record.status]}>
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {record.graduation_year || '—'}
                </TableCell>
                <TableCell className="text-muted-foreground max-w-[150px] truncate">
                  {record.occupation || '—'}
                </TableCell>
                <TableCell>
                  <Badge variant={platformVariants[record.platform]} className="gap-1">
                    {record.platform}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-[150px] truncate">
                  {record.location || '—'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="confidence-bar w-16">
                      <div 
                        className={cn("confidence-fill", getConfidenceColor(record.confidence_score))}
                        style={{ width: `${record.confidence_score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {record.confidence_score}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(record.date_found).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => onViewDetails(record)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <a 
                      href={record.profile_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {sortedData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <p className="text-lg">No records found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
