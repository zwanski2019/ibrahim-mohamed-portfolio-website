import { useQuery } from "@tanstack/react-query";
import { youtubeService, YouTubeVideo } from "@/services/youtubeService";
import { fallbackVideos } from "@/data/fallbackVideos";
import VideoStatusControls from "./youtube/VideoStatusControls";
import VideoErrorAlert from "./youtube/VideoErrorAlert";
import VideoCard from "./youtube/VideoCard";
import VideoLoadingState from "./youtube/VideoLoadingState";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
export default function YouTubeVideos() {
  const {
    t
  } = useLanguage();
  const {
    data: videos = fallbackVideos,
    isLoading,
    error,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['youtube-videos'],
    queryFn: youtubeService.getVideos,
    staleTime: 30 * 60 * 1000,
    // 30 minutes - longer cache
    gcTime: 60 * 60 * 1000,
    // 1 hour
    retry: 1,
    // Only retry once
    refetchOnWindowFocus: false // Don't refetch on window focus
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
  const handleVideoClick = (video: YouTubeVideo) => {
    window.open(video.url, '_blank', 'noopener,noreferrer');
  };
  if (isLoading) {
    return <VideoLoadingState />;
  }
  return;
}