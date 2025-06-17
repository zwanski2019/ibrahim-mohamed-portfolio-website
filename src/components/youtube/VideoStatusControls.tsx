
import { RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VideoStatusControlsProps {
  isFromCache: boolean;
  lastFetchTime?: number;
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onClearCache: () => void;
}

export default function VideoStatusControls({
  isFromCache,
  lastFetchTime,
  isLoading,
  isRefreshing,
  onRefresh,
  onClearCache
}: VideoStatusControlsProps) {
  const formatLastFetchTime = (timestamp?: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 mb-8">
      {isFromCache && (
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Cached Content
          {lastFetchTime && (
            <span className="text-xs ml-1">
              ({formatLastFetchTime(lastFetchTime)})
            </span>
          )}
        </Badge>
      )}
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading || isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
        
        {isFromCache && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCache}
            disabled={isLoading || isRefreshing}
          >
            Clear Cache
          </Button>
        )}
      </div>
    </div>
  );
}
