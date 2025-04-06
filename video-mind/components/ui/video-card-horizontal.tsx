import { useState } from "react";
import Link from "next/link";
import { Video } from "@/services/videoService";
import { useUserStore } from "@/store/userStore";
import { VideoPreview } from "@/components/ui/VideoPreview";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Edit } from "lucide-react";
import { EditVideoForm } from "@/components/videos/edit-video-form";
import { VideoBadges } from "@/components/ui/video-badges";
import { cn } from "@/lib/utils";

interface VideoCardHorizontalProps {
  video: Video;
  onVideoUpdated?: () => void;
}

export function VideoCardHorizontal({
  video,
  onVideoUpdated,
}: VideoCardHorizontalProps) {
  const { currentUser } = useUserStore();
  const isVideoOwner = currentUser?.id === video.user_id;
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdateSuccess = () => {
    onVideoUpdated?.();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditVideoForm
        video={video}
        onSuccess={handleUpdateSuccess}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border">
      <div className="flex flex-col md:flex-row h-full">
        <Link
          href={`/videos/${video.id}`}
          className="w-full md:w-[160px] h-[160px] bg-muted overflow-hidden flex-shrink-0 relative group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="w-full h-full relative">
            {video.video_url ? (
              <VideoPreview
                src={video.video_url}
                poster={video.video_url}
                className="w-full h-full"
                startTime={isHovering ? 1 : 0}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted-foreground/20">
                <span className="text-sm text-muted-foreground">
                  Video Preview
                </span>
              </div>
            )}
          </div>
        </Link>
        <div className="flex flex-col flex-1 md:pl-4 p-4 md:py-4 md:pr-4">
          <div className="mb-3">
            <Link href={`/videos/${video.id}`} className="hover:underline">
              <h3 className="text-base font-medium line-clamp-1">
                {video.title}
              </h3>
            </Link>
            {/* <p className="text-sm text-muted-foreground line-clamp-2 mt-1.5">
              {video.description}
            </p> */}
          </div>

          {/* Metadata Section */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {video.created_at
                  ? new Date(video.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Recently added"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              <span>{video.num_comments} comments</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-mono">
                {video.id.substring(0, 8)}
              </span>
            </div>
          </div>
          {/* Video Badges Section */}
          <div className="mb-3">
            <VideoBadges
              categories={video.categories}
              courses={video.courses}
              className="my-1"
            />
          </div>

          {/* Actions Section - pushed to bottom with mt-auto */}
          <div className="mt-auto">
            {isVideoOwner && (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
