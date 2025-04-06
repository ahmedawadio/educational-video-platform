import React from "react";
import Link from "next/link";
import { Video } from "@/services/videoService";
import { User } from "@/store/userStore";
import { VideoPreview } from "@/components/ui/VideoPreview";
import { VideoBadges } from "@/components/ui/video-badges";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: Video;
  videoOwner: User | null;
  className?: string;
}

export function VideoCard({
  video,
  videoOwner,
  className = "",
}: VideoCardProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      {/* Video Thumbnail with Link */}
      <Link href={`/videos/${video.id}`} className="block group">
        <div className="aspect-video bg-muted relative overflow-hidden rounded-lg">
          {video.video_url && (
            <VideoPreview
              src={video.video_url}
              muted={true}
              loop={true}
              controls={false}
              startTime={2}
              className="w-full h-full group-hover:scale-105 transition-transform duration-200"
            />
          )}
        </div>
      </Link>

      <div className="mt-2">
        <Link href={`/videos/${video.id}`} className="block group">
          <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
        </Link>

        {/* User name right below title */}
        {videoOwner && (
          <Link
            href={`/users/${videoOwner.username}`}
            className="block group mt-1 mb-2"
          >
            <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
              {videoOwner.name}
            </p>
          </Link>
        )}

        {/* Using the new VideoBadges component */}
        <VideoBadges categories={video.categories} courses={video.courses} />
      </div>
    </div>
  );
}
