
import { useQuery } from "@tanstack/react-query";
import { youtubeService } from "@/services/youtubeService";
import { fallbackVideos } from "@/data/fallbackVideos";
import VideoStatusControls from "./youtube/VideoStatusControls";
import VideoErrorAlert from "./youtube/VideoErrorAlert";
import VideoCard from "./youtube/VideoCard";
import VideoLoadingState from "./youtube/VideoLoadingState";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function YouTubeVideos() {
  const {
    data: videos = fallbackVideos,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['youtube-videos'],
    queryFn: youtubeService.getVideos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });

  const isFromCache = videos === fallbackVideos;
  const lastFetchTime = youtubeService.getLastFetchTime();

  const handleRefresh = () => {
    refetch();
  };

  const handleClearCache = () => {
    youtubeService.clearCache();
    refetch();
  };

  if (isLoading) {
    return <VideoLoadingState />;
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Latest <span className="text-gradient">Tech Videos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Stay updated with the latest tutorials, tech reviews, and industry insights from our YouTube channel.
          </p>
          
          {/* Telegram Integration for YouTube Section */}
          <div className="mb-8">
            <Button 
              variant="outline" 
              size="sm"
              asChild
              className="border-blue-500/30 text-blue-600 hover:bg-blue-500/10 hover:text-blue-500"
            >
              <a
                href="https://t.me/zwanski_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Get video updates on Telegram
              </a>
            </Button>
          </div>
        </div>

        {error && (
          <VideoErrorAlert 
            error={error.message} 
            videos={videos} 
            fallbackVideos={fallbackVideos} 
          />
        )}

        <VideoStatusControls
          isFromCache={isFromCache}
          lastFetchTime={lastFetchTime}
          isLoading={isLoading}
          isRefreshing={isRefetching}
          onRefresh={handleRefresh}
          onClearCache={handleClearCache}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
