
import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YouTubeVideo } from "@/services/youtubeService";

interface VideoCardProps {
  video: YouTubeVideo;
  onVideoClick: (video: YouTubeVideo) => void;
}

export default function VideoCard({ video, onVideoClick }: VideoCardProps) {
  return (
    <div 
      className="youtube-card bg-card rounded-xl overflow-hidden border border-border transition-all duration-300 hover:shadow-lg group cursor-pointer animate-fade-in"
      onClick={() => onVideoClick(video)}
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
              onVideoClick(video);
            }}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Watch on YouTube
          </Button>
        </div>
      </div>
    </div>
  );
}
