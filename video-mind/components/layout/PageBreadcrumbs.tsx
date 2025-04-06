"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useVideo } from "@/hooks/useVideos";
import { useVideoStore } from "@/store/videoStore";
import { USERS, useUserStore } from "@/store/userStore";
import { cn } from "@/lib/utils";

// Maximum character length for breadcrumb items before truncation
const MAX_BREADCRUMB_LENGTH = 25;

export function PageBreadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  const { videos, currentVideo } = useVideoStore();
  const [videoId, setVideoId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Extract videoId from path when on a video page
  useEffect(() => {
    const videoIndex = paths.findIndex((path) => path === "videos");
    if (videoIndex !== -1 && videoIndex < paths.length - 1) {
      setVideoId(paths[videoIndex + 1]);
    } else {
      setVideoId(null);
    }

    // Extract username when on a user page
    const usersIndex = paths.findIndex((path) => path === "users");
    if (usersIndex !== -1 && usersIndex < paths.length - 1) {
      setUsername(paths[usersIndex + 1]);
    } else {
      setUsername(null);
    }
  }, [paths]);

  // Only query when we have a video ID in the path
  const { isLoading } = useVideo(videoId || "");

  // Helper function to truncate text with ellipsis if it exceeds max length
  const truncateText = (text: string | null) => {
    if (!text) return "";
    return text.length > MAX_BREADCRUMB_LENGTH
      ? `${text.slice(0, MAX_BREADCRUMB_LENGTH)}...`
      : text;
  };

  // Helper to get a readable name for the path
  const getReadableName = (path: string, index: number) => {
    // For video paths, check if this is a video slug and if we have current video data
    if (paths[index - 1] === "videos" && path === videoId) {
      // First check if the video is loaded in the current video from the hook
      if (currentVideo && currentVideo.id === videoId) {
        return currentVideo.title;
      }

      // Otherwise check videos array in store
      const videoFromStore = videos.find((v) => v.id === path);
      if (videoFromStore) {
        return videoFromStore.title;
      }

      // If still not found and we're loading, show loading state with accent color
      if (isLoading) {
        // Return null to indicate we'll use the loading skeleton instead
        return null;
      }
    }

    // For user paths, check if this is a username and return corresponding user name
    if (paths[index - 1] === "users" && path === username) {
      // Find user in USERS array
      const userFromStore = USERS.find((u) => u.username === path);
      if (userFromStore) {
        return userFromStore.name;
      }
    }

    // For dynamic route parameters
    if (path.startsWith("[") && path.endsWith("]")) {
      const pathParam = paths[index];

      // Format the dynamic parameter for display - capitalize each word and replace dashes with spaces
      return pathParam
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    // For static routes
    switch (path) {
      case "explore":
        return "Explore";
      case "courses":
        return "Courses";
      case "videos":
        return "Video";
      case "users":
        return "Users";
      case "account":
        return "Account";
      case "artificial-intelligence":
        return "Artificial Intelligence";
      case "web-dev":
        return "Web Development";
      case "deep-learning":
        return "Deep Learning";
      case "machine-learning":
        return "Machine Learning";
      case "react":
        return "React";
      case "node":
        return "Node";
      default:
        // Split by dash, capitalize each word, and join with spaces
        return path
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    }
  };

  // Only show breadcrumbs if we're not at the root
  if (paths.length === 0) {
    return null;
  }

  // Loading indicator component
  const LoadingPlaceholder = () => (
    <div className="h-4 w-20 rounded bg-accent animate-pulse" />
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Render paths */}
        {paths
          .map((path, index) => {
            const elements = [];

            // Add separator before each item except the first one
            if (index > 0) {
              elements.push(<BreadcrumbSeparator key={`sep-${index}`} />);
            }

            // Get the readable name for this path segment
            const readableName = getReadableName(path, index);
            const isLoading = readableName === null;

            // Don't create a link for the last item (current page)
            const isLastItem = index === paths.length - 1;

            if (isLastItem) {
              elements.push(
                <BreadcrumbItem key={`item-${index}`}>
                  <BreadcrumbPage className="truncate max-w-[180px] md:max-w-[240px]">
                    {isLoading ? (
                      <LoadingPlaceholder />
                    ) : (
                      truncateText(readableName)
                    )}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              );
            } else {
              // Build the URL for this breadcrumb
              const href = `/${paths.slice(0, index + 1).join("/")}`;

              elements.push(
                <BreadcrumbItem key={`item-${index}`}>
                  <BreadcrumbLink
                    href={href}
                    className="truncate max-w-[120px] md:max-w-[180px]"
                    title={readableName || ""}
                  >
                    {isLoading ? (
                      <LoadingPlaceholder />
                    ) : (
                      truncateText(readableName)
                    )}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            }

            return elements;
          })
          .flat()}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
