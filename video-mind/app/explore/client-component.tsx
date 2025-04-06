"use client";

import { useAllUsersVideos } from "@/hooks/useVideos";
import { FilteredVideosGrid } from "@/components/videos/filtered-videos-grid";
import { Skeleton } from "@/components/ui/skeleton";

export function ExploreClient() {
  // Load all videos
  const { data: videos, isLoading } = useAllUsersVideos();

  return (
    <div className="mt-10 border-t pt-8">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-md" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <FilteredVideosGrid
          videos={videos || []}
          emptyMessage="No videos found. Check back later for new content."
        />
      )}
    </div>
  );
}
