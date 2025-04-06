import React from "react";
import Link from "next/link";
import { Video } from "@/services/videoService";
import { USERS, User } from "@/store/userStore";
import {
  VideoOff,
  Video as VideoIcon,
  BookOpen,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoCard } from "@/components/ui/video-card";

interface FilteredVideosGridProps {
  videos: Video[];
  emptyMessage?: string;
  isCourse?: boolean;
  isCategory?: boolean;
}

export function FilteredVideosGrid({
  videos,
  emptyMessage = "No videos found.",
  isCourse = false,
  isCategory = false,
}: FilteredVideosGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-muted/20 rounded-lg border border-dashed">
        {isCourse ? (
          <BookOpen className="w-12 h-12 text-muted-foreground/70 mb-4" />
        ) : isCategory ? (
          <VideoIcon className="w-12 h-12 text-muted-foreground/70 mb-4" />
        ) : (
          <VideoOff className="w-12 h-12 text-muted-foreground/70 mb-4" />
        )}
        <h3 className="text-lg font-medium mb-2">{emptyMessage}</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          {isCourse
            ? "Be the first to add content to this course."
            : isCategory
            ? "Try exploring other categories or check back later for new content."
            : "There are no videos available at the moment."}
        </p>
        <Link href="/account">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload a Video</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => {
        // Find the user who uploaded the video
        const videoOwner: User | null = video.user_id
          ? USERS.find((user) => user.id === video.user_id) || null
          : null;

        return (
          <VideoCard key={video.id} video={video} videoOwner={videoOwner} />
        );
      })}
    </div>
  );
}
