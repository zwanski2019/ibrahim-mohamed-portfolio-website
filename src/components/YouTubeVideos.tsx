
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchYouTubeVideos, YouTubeVideo, FetchResult, clearVideoCache } from "@/services/youtubeService";
import { fallbackVideos } from "@/data/fallbackVideos";
import VideoStatusControls from "@/components/youtube/VideoStatusControls";
import VideoErrorAlert from "@/components/youtube/VideoErrorAlert";
import VideoCard from "@/components/youtube/VideoCard";
import VideoLoadingState from "@/components/youtube/VideoLoadingState";

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

  return (
    <section id="youtube" className="py-20 bg-muted/30">
      <div className="section-container">
        <h2 className="section-title">
          My <span className="text-gradient">YouTube</span> <span className="text-red-500">Videos</span>
        </h2>
        
        <p className="section-subtitle">
          Watch my tutorials and tech demonstrations to learn about web development, IT support, and more.
        </p>

        <VideoStatusControls
          isFromCache={fetchResult.isFromCache}
          lastFetchTime={fetchResult.lastFetchTime}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onClearCache={handleClearCache}
        />

        {fetchResult.error && !isLoading && (
          <VideoErrorAlert
            error={fetchResult.error}
            videos={fetchResult.videos}
            fallbackVideos={fallbackVideos}
          />
        )}
        
        {isLoading ? (
          <VideoLoadingState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {fetchResult.videos.slice(0, 6).map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onVideoClick={handleVideoClick}
                />
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
