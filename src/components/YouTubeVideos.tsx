
import { useEffect, useState } from "react";
import { ExternalLink, Play, Loader2, RefreshCw, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { fetchYouTubeVideos, YouTubeVideo, FetchResult, clearVideoCache } from "@/services/youtubeService";

// Enhanced fallback sample videos
const fallbackVideos: YouTubeVideo[] = [
  {
    id: "fallback1",
    videoId: "fallback1",
    title: "WordPress Development Tutorial: Creating Custom Themes",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=450&fit=crop&crop=entropy&auto=format",
    date: "April 15, 2024",
    duration: "18:24",
    views: "2.4K",
    url: "https://www.youtube.com/@zwanski.m"
  },
  {
    id: "fallback2",
    videoId: "fallback2",
    title: "Computer Repair: Fixing Common Hardware Issues",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop&crop=entropy&auto=format",
    date: "March 22, 2024",
    duration: "12:06",
    views: "3.8K",
    url: "https://www.youtube.com/@zwanski.m"
  },
  {
    id: "fallback3",
    videoId: "fallback3",
    title: "Introduction to PHP and MySQL for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop&crop=entropy&auto=format",
    date: "February 11, 2024",
    duration: "25:17",
    views: "1.7K",
    url: "https://www.youtube.com/@zwanski.m"
  }
];

export default function YouTubeVideos() {
  const [fetchResult, setFetchResult] = useState<FetchResult>({
    videos: [],
    isFromCache: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadVideos = async (forceRefresh = false) => {
    const loading = forceRefresh ? setIsRefreshing : setIsLoading;
    loading(true);
    
    try {
      console.log('Loading YouTube videos...');
      const result = await fetchYouTubeVideos(forceRefresh);
      
      if (result.videos.length > 0) {
        setFetchResult(result);
        console.log('Successfully loaded videos:', result.videos.length, result.isFromCache ? '(cached)' : '(fresh)');
      } else if (result.error) {
        // If API fails and no cached data, use fallback
        setFetchResult({
          videos: fallbackVideos,
          isFromCache: false,
          error: `${result.error} (showing sample content)`
        });
      }
    } catch (err) {
      console.error('Error in loadVideos:', err);
      setFetchResult({
        videos: fallbackVideos,
        isFromCache: false,
        error: 'Unable to load videos (showing sample content)'
      });
    } finally {
      loading(false);
    }
  };

  // Load videos on component mount
  useEffect(() => {
    loadVideos();
  }, []);

  const handleRefresh = () => {
    loadVideos(true);
  };

  const handleClearCache = () => {
    clearVideoCache();
    loadVideos(true);
  };

  const handleVideoClick = (video: YouTubeVideo) => {
    window.open(video.url, '_blank', 'noopener,noreferrer');
  };

  const handleViewAllClick = () => {
    window.open('https://www.youtube.com/@zwanski.m', '_blank', 'noopener,noreferrer');
  };

  const formatLastFetchTime = (timestamp?: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <section id="youtube" className="py-20 bg-muted/30">
      <div className="section-container">
        <h2 className="section-title">
          My <span className="text-gradient">YouTube</span> <span className="text-red-500">Videos</span>
        </h2>
        
        <p className="section-subtitle">
          Watch my tutorials and tech demonstrations to learn about web development, IT support, and more.
        </p>

        {/* Status indicators and actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 mb-8">
          {fetchResult.isFromCache && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Cached Content
              {fetchResult.lastFetchTime && (
                <span className="text-xs ml-1">
                  ({formatLastFetchTime(fetchResult.lastFetchTime)})
                </span>
              )}
            </Badge>
          )}
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading || isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            
            {fetchResult.isFromCache && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCache}
                disabled={isLoading || isRefreshing}
              >
                Clear Cache
              </Button>
            )}
          </div>
        </div>

        {/* Error alert */}
        {fetchResult.error && !isLoading && (
          <Alert className="mt-4 mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {fetchResult.error}
              {fetchResult.videos === fallbackVideos && (
                <span className="block mt-2">
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => window.open('https://www.youtube.com/@zwanski.m', '_blank')}
                    className="p-0 h-auto text-sm underline"
                  >
                    Visit my YouTube channel for the latest videos →
                  </Button>
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading latest videos...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {fetchResult.videos.slice(0, 6).map((video) => (
                <div 
                  key={video.id}
                  className="youtube-card bg-card rounded-xl overflow-hidden border border-border transition-all duration-300 hover:shadow-lg group cursor-pointer animate-fade-in"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white fill-current ml-1" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg line-clamp-2 mb-2" title={video.title}>
                      {video.title}
                    </h3>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{video.date}</span>
                      <span>{video.views} views</span>
                    </div>
                    
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoClick(video);
                        }}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Watch on YouTube
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
                onClick={handleViewAllClick}
              >
                View All Videos
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
