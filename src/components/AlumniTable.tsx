import { useState } from 'react';
import { 
  ExternalLink, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { AlumniRecord, SocialPlatform, AlumniStatus } from '@/types/alumni';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface AlumniTableProps {
  data: AlumniRecord[];
  onApprovalChange: (id: string, approved: boolean) => void;
  onViewDetails: (record: AlumniRecord) => void;
}

type SortField = 'fullName' | 'confidenceScore' | 'dateFound' | 'graduationYear';
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
  const [sortField, setSortField] = useState<SortField>('confidenceScore');
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

    if (sortField === 'dateFound') {
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
                onClick={() => handleSort('fullName')}
              >
                <div className="flex items-center">
                  Name
                  <SortIcon field="fullName" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('graduationYear')}
              >
                <div className="flex items-center">
                  Year
                  <SortIcon field="graduationYear" />
                </div>
              </TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Location</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('confidenceScore')}
              >
                <div className="flex items-center">
                  Confidence
                  <SortIcon field="confidenceScore" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('dateFound')}
              >
                <div className="flex items-center">
                  Found
                  <SortIcon field="dateFound" />
                </div>
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((record, index) => (
              <TableRow 
                key={record.id} 
                className={cn(
                  "table-row-hover border-border/30",
                  !record.isApproved && "bg-secondary/20"
                )}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell>
                  <Switch
                    checked={record.isApproved}
                    onCheckedChange={(checked) => onApprovalChange(record.id, checked)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{record.fullName}</p>
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
                  {record.graduationYear || '—'}
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
                        className={cn("confidence-fill", getConfidenceColor(record.confidenceScore))}
                        style={{ width: `${record.confidenceScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {record.confidenceScore}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(record.dateFound).toLocaleDateString('en-GB', {
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
                      href={record.profileUrl} 
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
