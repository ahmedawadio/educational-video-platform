"use client";

import { ReactNode } from "react";
import { PageHeader } from "@/components/header/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllUsersVideos } from "@/hooks/useVideos";
import { useVideosByCourse } from "@/hooks/useFilteredVideos";
import { FilteredVideosGrid } from "@/components/videos/filtered-videos-grid";
import { CourseData } from "./page";

// Define props for the client component
interface CourseClientProps {
  course: CourseData;
  courseSlug: string;
  icon: ReactNode;
}

export function CourseClient({ course, courseSlug, icon }: CourseClientProps) {
  // Load all videos
  const { isLoading } = useAllUsersVideos();

  // Filter videos by course
  const videos = useVideosByCourse(courseSlug);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <PageHeader
          title={course.title}
          description={course.description}
          icon={icon}
          category={courseSlug}
        />
      </div>

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
            emptyMessage={`No videos found in ${course.title} course.`}
            isCourse={true}
          />
        )}
      </div>
    </div>
  );
}
