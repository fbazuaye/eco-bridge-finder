import { Search, X, LogOut, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { HelpModal } from '@/components/HelpModal';
import { NotificationDropdown } from '@/components/NotificationDropdown';
import ecobaLogo from '@/assets/ecoba-logo.png';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const { user, signOut } = useAuth();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:h-16 md:items-center md:justify-between md:px-6 md:py-0">
        {/* Logo and Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={ecobaLogo} alt="ECOBA Logo" className="h-12 w-auto" />
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground">
                ECOBA <span className="text-ecoba-gold">Intelligence</span>
              </h1>
              <p className="text-xs text-muted-foreground">Alumni Discovery System</p>
            </div>
          </div>

          {/* Right Actions - Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <NotificationDropdown />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-ecoba-gold/20 text-ecoba-gold text-xs">
                      {user?.email?.charAt(0).toUpperCase() || 'A'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {user?.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              className="pl-10 pr-10 bg-secondary/50 border-border/50 focus:border-ecoba-gold/50"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/documentation">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <BookOpen className="h-4 w-4" />
              User Manual
            </Button>
          </Link>
          <HelpModal />
          <NotificationDropdown />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-ecoba-gold/20 text-ecoba-gold">
                    {user?.email?.charAt(0).toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal">
                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                  {user?.email}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
