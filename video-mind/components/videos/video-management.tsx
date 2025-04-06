import { useUserVideos } from "@/hooks/useVideos";
import { VideoList } from "./video-list";
import { CreateVideoForm } from "./create-video-form";
import { useVideoStore } from "@/store/videoStore";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

export function VideoManagement() {
  const { currentUser } = useUserStore();
  const userId = currentUser?.id || "";

  const { data, isLoading, isError, refetch } = useUserVideos(userId);
  const { videos, setVideos } = useVideoStore();

  // Ensure videos is always an array
  const videoArray = Array.isArray(videos) ? videos : [];

  // Update the store when data is fetched
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setVideos(data);
    }
  }, [data, setVideos]);

  // Refetch videos when the user changes
  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  const handleVideoCreated = () => {
    refetch();
  };

  const handleVideoUpdated = () => {
    refetch();
  };

  if (!currentUser) {
    return (
      <div className="bg-card rounded-lg p-6 border text-center">
        <p className="text-muted-foreground">
          Please select a user to view videos.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold">Video Management</h2>
      </div> */}

      <CreateVideoForm onSuccess={handleVideoCreated} />

      {isError ? (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          Failed to load videos. Please try again later.
        </div>
      ) : (
        <VideoList
          videos={videoArray}
          isLoading={isLoading}
          onVideoUpdated={handleVideoUpdated}
        />
      )}
    </div>
  );
}
