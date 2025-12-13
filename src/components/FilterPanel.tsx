import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FilterState, SocialPlatform, AlumniStatus } from '@/types/alumni';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  activeFilterCount: number;
}

const platforms: SocialPlatform[] = ['LinkedIn', 'Facebook', 'Twitter', 'Instagram', 'Web', 'News'];
const statuses: AlumniStatus[] = ['Confirmed', 'Probable', 'Uncertain'];

export function FilterPanel({ filters, onFiltersChange, activeFilterCount }: FilterPanelProps) {
  const handlePlatformToggle = (platform: SocialPlatform) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter(p => p !== platform)
      : [...filters.platforms, platform];
    onFiltersChange({ ...filters, platforms: newPlatforms });
  };

  const handleStatusToggle = (status: AlumniStatus) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFiltersChange({ ...filters, status: newStatuses });
  };

  const resetFilters = () => {
    onFiltersChange({
      yearRange: [1970, 2024],
      locations: [],
      platforms: [],
      minConfidence: 0,
      status: [],
      approvalStatus: 'all',
      searchQuery: filters.searchQuery,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="gold-outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="gold" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] border-border bg-card overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-display text-xl text-foreground flex items-center justify-between">
            Filter Records
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-8">
          {/* Confidence Score */}
          <div>
            <Label className="text-sm font-medium text-foreground">
              Minimum Confidence Score: {filters.minConfidence}%
            </Label>
            <Slider
              value={[filters.minConfidence]}
              onValueChange={([value]) => onFiltersChange({ ...filters, minConfidence: value })}
              max={100}
              step={5}
              className="mt-3"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Year Range */}
          <div>
            <Label className="text-sm font-medium text-foreground">
              Graduation Year: {filters.yearRange[0]} - {filters.yearRange[1]}
            </Label>
            <Slider
              value={filters.yearRange}
              onValueChange={(value) => onFiltersChange({ ...filters, yearRange: value as [number, number] })}
              min={1970}
              max={2024}
              step={1}
              className="mt-3"
            />
          </div>

          {/* Status */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Status</Label>
            <div className="space-y-2">
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-3">
                  <Checkbox
                    id={`status-${status}`}
                    checked={filters.status.includes(status)}
                    onCheckedChange={() => handleStatusToggle(status)}
                  />
                  <label
                    htmlFor={`status-${status}`}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Platforms</Label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <Badge
                  key={platform}
                  variant={filters.platforms.includes(platform) ? 'gold' : 'outline'}
                  className="cursor-pointer transition-all"
                  onClick={() => handlePlatformToggle(platform)}
                >
                  {platform}
                </Badge>
              ))}
            </div>
          </div>

          {/* Approval Status */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Review Status</Label>
            <div className="flex gap-2">
              {(['all', 'approved', 'pending'] as const).map((status) => (
                <Badge
                  key={status}
                  variant={filters.approvalStatus === status ? 'gold' : 'outline'}
                  className="cursor-pointer capitalize transition-all"
                  onClick={() => onFiltersChange({ ...filters, approvalStatus: status })}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
