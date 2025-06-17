
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { YouTubeVideo } from "@/services/youtubeService";

interface VideoErrorAlertProps {
  error: string;
  videos: YouTubeVideo[];
  fallbackVideos: YouTubeVideo[];
}

export default function VideoErrorAlert({ error, videos, fallbackVideos }: VideoErrorAlertProps) {
  return (
    <Alert className="mt-4 mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {error}
        {videos === fallbackVideos && (
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
  );
}
