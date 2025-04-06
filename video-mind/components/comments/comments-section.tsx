import React from "react";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";
import { useVideoComments } from "@/hooks/useComments";
import { CommentUserSwitcher } from "./comment-user-switcher";

interface CommentsSectionProps {
  videoId: string;
  hideHeader?: boolean;
}

export function CommentsSection({
  videoId,
  hideHeader = false,
}: CommentsSectionProps) {
  const { data, isLoading } = useVideoComments(videoId);

  // Ensure data is an array
  const comments = Array.isArray(data) ? data : [];

  // Use singular "Comment" when there's only one comment
  const commentText = comments.length === 1 ? "Comment" : "Comments";

  return (
    <div className="space-y-6">
      {!hideHeader && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            {comments.length} {commentText}
          </h3>
          <div className="w-72">
            <CommentUserSwitcher />
          </div>
        </div>
      )}

      <div className="mb-8">
        <CommentForm videoId={videoId} />
      </div>

      <div>
        <CommentList comments={comments} isLoading={isLoading} />
      </div>
    </div>
  );
}
