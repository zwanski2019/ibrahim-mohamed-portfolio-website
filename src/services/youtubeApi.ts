
// YouTube API configuration
const YOUTUBE_API_KEY = 'AIzaSyAWgvpdwH4pKPlakAPTp9aRY2YYbAcViE0';
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Your channel handle is @zwanski.m, we'll need to get the channel ID first
const CHANNEL_HANDLE = 'zwanski.m';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  duration: string;
  views: string;
  videoId: string;
  url: string;
}

// Function to get channel ID from channel handle
async function getChannelId(): Promise<string | null> {
  try {
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&type=channel&q=${CHANNEL_HANDLE}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      return data.items[0].snippet.channelId;
    }
    return null;
  } catch (error) {
    console.error('Error fetching channel ID:', error);
    return null;
  }
}

// Function to format view count
function formatViewCount(viewCount: string): string {
  const views = parseInt(viewCount);
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

// Function to format duration from ISO 8601 format
function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1]?.replace('H', '') || '0');
  const minutes = parseInt(match[2]?.replace('M', '') || '0');
  const seconds = parseInt(match[3]?.replace('S', '') || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Function to format publish date
function formatDate(publishedAt: string): string {
  const date = new Date(publishedAt);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Main function to fetch YouTube videos
export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    // First get the channel ID
    const channelId = await getChannelId();
    if (!channelId) {
      throw new Error('Could not find channel ID');
    }

    // Fetch latest videos from the channel
    const videosResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=6&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error('Failed to fetch videos');
    }
    
    const videosData = await videosResponse.json();
    
    if (!videosData.items || videosData.items.length === 0) {
      throw new Error('No videos found');
    }

    // Get video IDs for additional details
    const videoIds = videosData.items.map((item: any) => item.id.videoId).join(',');
    
    // Fetch video statistics and content details
    const detailsResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    
    const detailsData = await detailsResponse.json();
    
    // Combine data and format for our component
    const videos: YouTubeVideo[] = videosData.items.map((video: any, index: number) => {
      const details = detailsData.items?.[index];
      const videoId = video.id.videoId;
      
      return {
        id: videoId,
        videoId: videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
        date: formatDate(video.snippet.publishedAt),
        duration: details ? formatDuration(details.contentDetails.duration) : '0:00',
        views: details ? formatViewCount(details.statistics.viewCount) : '0',
        url: `https://www.youtube.com/watch?v=${videoId}`
      };
    });

    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    // Return empty array on error, component will handle fallback
    return [];
  }
}
