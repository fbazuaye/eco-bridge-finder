import { Search, Bell, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Search input changed:', value);
    onSearchChange(value);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:h-16 md:items-center md:justify-between md:px-6 md:py-0">
        {/* Logo and Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ecoba-gold/20">
              <Shield className="h-5 w-5 text-ecoba-gold" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground">
                ECOBA <span className="text-ecoba-gold">Intelligence</span>
              </h1>
              <p className="text-xs text-muted-foreground">Alumni Discovery System</p>
            </div>
          </div>

          {/* Right Actions - Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ecoba-gold text-[10px] font-bold text-ecoba-green-dark">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search Bar - Always visible */}
        <div className="flex-1 max-w-md md:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search alumni by name, company, location..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 bg-secondary/50 border-border/50 focus:border-ecoba-gold/50"
            />
          </div>
        </div>

        {/* Right Actions - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ecoba-gold text-[10px] font-bold text-ecoba-green-dark">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
