import React, { useState } from "react";
import { CommentsSection } from "@/components/comments/comments-section";
import { ScratchpadEditor } from "@/components/editor/scratchpad-editor";
import { cn } from "@/lib/utils";
import { useVideoComments } from "@/hooks/useComments";

interface VideoTabsProps {
  videoId: string;
}

export function VideoTabs({ videoId }: VideoTabsProps) {
  const [activeTab, setActiveTab] = useState<"comments" | "scratchpad">(
    "comments"
  );
  const { data: comments } = useVideoComments(videoId);

  // Ensure comments is an array and get count
  const commentsArray = Array.isArray(comments) ? comments : [];
  const commentsCount = commentsArray.length;

  // Use singular "Comment" when there's only one comment
  const commentText = commentsCount === 1 ? "Comment" : "Comments";

  return (
    <div className="space-y-4">
      <div className="border-b flex">
        <button
          onClick={() => setActiveTab("comments")}
          className={cn(
            "px-4 py-2 text-sm font-medium relative",
            activeTab === "comments"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground transition-colors"
          )}
        >
          <span>
            {commentsCount} {commentText}
          </span>
          {activeTab === "comments" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("scratchpad")}
          className={cn(
            "px-4 py-2 text-sm font-medium relative",
            activeTab === "scratchpad"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground transition-colors"
          )}
        >
          <span>Scratchpad</span>
          {activeTab === "scratchpad" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "comments" ? (
          <CommentsSection videoId={videoId} hideHeader={true} />
        ) : (
          <ScratchpadEditor videoId={videoId} />
        )}
      </div>
    </div>
  );
}
