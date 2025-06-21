
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import ZwanskiLogo from '@/components/ZwanskiLogo';
import { useAuth } from '@/hooks/useAuth';

export const ForumHeader = () => {
  const { user } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/forum" className="flex items-center gap-2">
            <ZwanskiLogo className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Zwanski Forum
            </span>
          </Link>
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              className="w-80 pl-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button asChild>
                <Link to="/forum/new-thread">
                  <Plus className="h-4 w-4 mr-2" />
                  New Thread
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Welcome back,</span>
                <span className="text-sm font-medium">
                  {user.email || 'User'}
                </span>
              </div>
            </>
          ) : (
            <Button asChild variant="outline">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
