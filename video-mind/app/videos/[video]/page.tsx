"use client";

import React, { useEffect, useState } from "react";
import { useVideo, useUserVideos } from "@/hooks/useVideos";
import { useVideoStore } from "@/store/videoStore";
import { Video as VideoType } from "@/services/videoService";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { UserAvatar } from "@/components/ui/user-avatar";
import { USERS } from "@/store/userStore";
import { formatDistanceToNow } from "date-fns";
import { RecommendedVideos } from "@/components/videos/recommended-videos";
import { VideoTabs } from "@/components/videos/video-tabs";
import { VideoBadges } from "@/components/ui/video-badges";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Share, Check } from "lucide-react";

interface VideoDetailPageProps {
  params:
    | {
        video: string;
      }
    | Promise<{ video: string }>;
}

// Share button component
function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <Button variant="outline" className="ml-auto" onClick={handleCopyLink}>
      {copied ? (
        <>
          <Check className="text-green-500" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Share />
          <span>Share</span>
        </>
      )}
    </Button>
  );
}

export default function VideoDetailPage({ params }: VideoDetailPageProps) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = params instanceof Promise ? React.use(params) : params;
  const videoId = resolvedParams.video;

  const { data, isLoading } = useVideo(videoId);
  const { currentVideo, videos, setVideos } = useVideoStore();

  // Fetch videos for all users to have recommendations
  // We'll fetch videos for the first user in the USERS array
  const { data: userData } = useUserVideos(USERS[0].id);

  // Debug logs
  useEffect(() => {
    console.log("Current video:", currentVideo);
    console.log("Videos in store:", videos);
    console.log("User videos data:", userData);
  }, [currentVideo, videos, userData]);

  // Find the user who uploaded the video
  const videoOwner = currentVideo?.user_id
    ? USERS.find((user) => user.id === currentVideo.user_id)
    : null;

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-card rounded-lg p-6 border text-center">
          <p className="text-muted-foreground">Video not found</p>
        </div>
      </div>
    );
  }

  // Convert videos to array if needed
  const videoArray = Array.isArray(videos) ? videos : [];

  // Create dummy videos if no videos are available for testing
  const dummyVideos = [];
  if (videoArray.length <= 1) {
    // Create 5 dummy videos with different IDs but same content as current video
    for (let i = 1; i <= 5; i++) {
      if (currentVideo) {
        dummyVideos.push({
          ...currentVideo,
          id: `dummy-${i}`,
          title: `Sample Video ${i}`,
          user_id: USERS[i % USERS.length].id,
        });
      }
    }
  }

  // Use either the actual videos or dummy videos
  const videosToShow =
    videoArray.length > 1 ? videoArray : [...videoArray, ...dummyVideos];

  return (
    <div className="container mx-auto py-10">
      {/* Custom 75/25 grid layout using flex instead of grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content - 75% width on large screens */}
        <div className="lg:w-3/4">
          {/* Video Player */}
          <div className="bg-card rounded-lg overflow-hidden border mb-6">
            <div className="aspect-video w-full bg-black">
              {currentVideo.video_url && (
                <VideoPlayer
                  src={currentVideo.video_url}
                  autoPlay={true}
                  controls
                  className="w-full h-full"
                />
              )}
            </div>
          </div>

          {/* Title and Share Button Row */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{currentVideo.title}</h1>
            <ShareButton />
          </div>

          {/* Video Owner Info */}
          {videoOwner && (
            <div className="flex items-center gap-3 mb-5">
              <Link
                href={`/users/${videoOwner.username}`}
                className="hover:opacity-80 transition-opacity"
              >
                <UserAvatar user={videoOwner} size="md" />
              </Link>
              <div>
                <Link href={`/users/${videoOwner.username}`} className="group">
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {videoOwner.name}
                  </p>
                </Link>
                <p className="text-xs text-muted-foreground">
                  {currentVideo.created_at &&
                    `Uploaded ${formatDistanceToNow(
                      new Date(currentVideo.created_at),
                      { addSuffix: true }
                    )}`}
                </p>
              </div>
            </div>
          )}

          {/* Video Badges */}
          {(currentVideo.categories && currentVideo.categories.length > 0) ||
          (currentVideo.courses && currentVideo.courses.length > 0) ? (
            <div className="mb-5">
              <VideoBadges
                categories={currentVideo.categories}
                courses={currentVideo.courses}
                maxBadges={8}
              />
            </div>
          ) : null}

          {/* Description Card */}
          <div className="bg-card rounded-lg p-5 border mb-8 shadow-sm">
            <p className="text-muted-foreground leading-relaxed">
              {currentVideo.description}
            </p>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <VideoTabs videoId={videoId} />
          </div>
        </div>

        {/* Recommended Videos - 25% width on large screens */}
        <div className="lg:w-1/4 space-y-6">
          <RecommendedVideos videos={videosToShow} currentVideoId={videoId} />
        </div>
      </div>
    </div>
  );
}
