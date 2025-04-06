import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface VideoCardSkeletonProps {
  className?: string;
}

export function VideoCardSkeleton({ className = "" }: VideoCardSkeletonProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      {/* Video Thumbnail Skeleton */}
      <div className="aspect-video bg-muted relative overflow-hidden rounded-lg">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="mt-2">
        {/* Title Skeleton */}
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4" />

        {/* User Skeleton */}
        <div className="mt-2 mb-2">
          <Skeleton className="h-3 w-1/3" />
        </div>

        {/* Badges Skeleton */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
