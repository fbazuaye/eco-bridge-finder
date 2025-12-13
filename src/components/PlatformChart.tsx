import { SocialPlatform } from '@/types/alumni';
import { cn } from '@/lib/utils';

interface PlatformChartProps {
  data: Record<SocialPlatform, number>;
}

const platformColors: Record<SocialPlatform, string> = {
  LinkedIn: 'bg-blue-500',
  Facebook: 'bg-indigo-500',
  Twitter: 'bg-sky-400',
  Instagram: 'bg-pink-500',
  Web: 'bg-emerald-500',
  News: 'bg-purple-500',
};

export function PlatformChart({ data }: PlatformChartProps) {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const sortedPlatforms = Object.entries(data)
    .sort(([, a], [, b]) => b - a) as [SocialPlatform, number][];

  return (
    <div className="stat-card">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Platform Distribution
      </h3>
      <div className="space-y-3">
        {sortedPlatforms.map(([platform, count]) => {
          const percentage = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={platform} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">{platform}</span>
                <span className="text-muted-foreground">
                  {count} ({percentage.toFixed(0)}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-700", platformColors[platform])}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
