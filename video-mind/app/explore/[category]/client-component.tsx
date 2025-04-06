"use client";

import { ReactNode } from "react";
import { PageHeader } from "@/components/header/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllUsersVideos } from "@/hooks/useVideos";
import { useVideosByCategory } from "@/hooks/useFilteredVideos";
import { FilteredVideosGrid } from "@/components/videos/filtered-videos-grid";
import { CategoryData } from "./page";

// Define props for the client component
interface CategoryClientProps {
  category: CategoryData;
  categorySlug: string;
  icon: ReactNode;
}

export function CategoryClient({
  category,
  categorySlug,
  icon,
}: CategoryClientProps) {
  // Load all videos
  const { isLoading } = useAllUsersVideos();

  // Filter videos by category
  const videos = useVideosByCategory(categorySlug);

  return (
    <div className="container py-10">
      <PageHeader
        title={category.title}
        description={category.description}
        icon={icon}
        category={categorySlug}
      />

      <div className="mt-10 border-t pt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-md" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <FilteredVideosGrid
            videos={videos}
            emptyMessage={`No videos found in ${category.title} category.`}
            isCategory={true}
          />
        )}
      </div>
    </div>
  );
}
