import React, { useEffect, useState } from "react";
import { Video } from "@/services/videoService";
import { USERS } from "@/store/userStore";
import { VideoCard } from "@/components/ui/video-card";
import { VideoCardSkeleton } from "@/components/ui/video-card-skeleton";

interface RecommendedVideosProps {
  videos: Video[];
  currentVideoId: string;
}

export function RecommendedVideos({
  videos,
  currentVideoId,
}: RecommendedVideosProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Debug logs
  useEffect(() => {
    console.log("RecommendedVideos received videos:", videos);
    console.log("Current Video ID:", currentVideoId);

    // Simulate loading for a second
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [videos, currentVideoId]);

  // Filter out the current video
  const otherVideos = videos.filter((video) => video.id !== currentVideoId);

  // Debug log
  console.log("Filtered videos (without current):", otherVideos);

  // Create a list of 5 recommended videos
  // If we don't have enough videos, repeat the existing ones
  const recommendedVideos: Video[] = [];
  for (let i = 0; i < 5; i++) {
    const index = i % otherVideos.length;
    // Only add if we have at least one other video
    if (otherVideos.length > 0) {
      recommendedVideos.push(otherVideos[index]);
    }
  }

  if (recommendedVideos.length === 0 && !isLoading) {
    return (
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">Recommended Videos</h3>
        <p className="text-muted-foreground text-sm">
          No other videos available.
        </p>
      </div>
    );
  }

  // Render loading skeletons
  if (isLoading) {
    return (
      <div>
        <h3 className="text-lg font-medium mb-3">Recommended Videos</h3>
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:space-y-4 lg:grid-cols-1">
          {[1, 2, 3, 4, 5].map((index) => (
            <VideoCardSkeleton
              key={`skeleton-${index}`}
              className="flex-col shadow-none"
            />
          ))}
        </div>
      </div>
    );
  }

  // Make the grid responsive
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Recommended Videos</h3>
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:space-y-4 lg:grid-cols-1">
        {recommendedVideos.map((video, index) => {
          // Find the user who uploaded the video
          const videoOwner = video.user_id
            ? USERS.find((user) => user.id === video.user_id) || null
            : null;

          return (
            <VideoCard
              key={`${video.id}-${index}`}
              video={video}
              videoOwner={videoOwner}
              className="flex-col shadow-none"
            />
          );
        })}
      </div>
    </div>
  );
}
