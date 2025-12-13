import { MapPin } from 'lucide-react';

interface LocationListProps {
  data: { location: string; count: number }[];
}

export function LocationList({ data }: LocationListProps) {
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="stat-card">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Top Locations
      </h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div 
            key={item.location} 
            className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ecoba-gold/20">
              <MapPin className="h-4 w-4 text-ecoba-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.location}</p>
              <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full bg-ecoba-gold/60"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-sm font-semibold text-ecoba-gold">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
