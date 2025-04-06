import { useVideoStore } from "@/store/videoStore";
import { Video } from "@/services/videoService";
import { VideoCardHorizontal } from "@/components/ui/video-card-horizontal";

interface VideoListProps {
  videos: Video[];
  isLoading: boolean;
  onVideoUpdated?: () => void;
}

export function VideoList({
  videos = [],
  isLoading,
  onVideoUpdated,
}: VideoListProps) {
  // Extra safety check to ensure videos is an array
  const videoArray = Array.isArray(videos) ? videos : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (videoArray.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 border text-center">
        <p className="text-muted-foreground">
          No uploaded any videos yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {videoArray.map((video) => (
        <VideoCardHorizontal
          key={video.id}
          video={video}
          onVideoUpdated={onVideoUpdated}
        />
      ))}
    </div>
  );
}
