
import { useEffect, useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

// YouTube video type definition
interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  duration: string;
  views: string;
}

// Sample YouTube video data
const sampleVideos: YouTubeVideo[] = [
  {
    id: "video1",
    title: "WordPress Development Tutorial: Creating Custom Themes",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    date: "April 15, 2024",
    duration: "18:24",
    views: "2.4K"
  },
  {
    id: "video2",
    title: "Computer Repair: Fixing Common Hardware Issues",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    date: "March 22, 2024",
    duration: "12:06",
    views: "3.8K"
  },
  {
    id: "video3",
    title: "Introduction to PHP and MySQL for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "February 11, 2024",
    duration: "25:17",
    views: "1.7K"
  }
];

export default function YouTubeVideos() {
  const { t } = useLanguage();
  const [videos, setVideos] = useState<YouTubeVideo[]>(sampleVideos);
  const [isLoading, setIsLoading] = useState(false);

  // Animation for elements to fade in when they come into view
  useEffect(() => {
    const videoCards = document.querySelectorAll('.youtube-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    videoCards.forEach((card) => {
      observer.observe(card);
    });
    
    return () => {
      videoCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, [videos]);

  return (
    <section id="youtube" className="py-20 bg-muted/30">
      <div className="section-container">
        <h2 className="section-title">
          My <span className="text-gradient">YouTube</span> <span className="text-red-500">Videos</span>
        </h2>
        
        <p className="section-subtitle">
          Watch my tutorials and tech demonstrations to learn about web development, IT support, and more.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="youtube-card bg-card rounded-xl overflow-hidden border border-border transition-all duration-300 opacity-0 transform translate-y-4 hover:shadow-lg group"
            >
              {/* Thumbnail with play button overlay */}
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                    <Play className="h-8 w-8 text-white fill-current" />
                  </div>
                </div>
                
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-2 mb-2">{video.title}</h3>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{video.date}</span>
                  <span>{video.views} views</span>
                </div>
                
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
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
          <Button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800">
            View All Videos
          </Button>
        </div>
      </div>
    </section>
  );
}
