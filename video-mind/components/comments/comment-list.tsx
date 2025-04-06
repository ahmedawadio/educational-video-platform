import React from "react";
import { Comment } from "@/services/commentService";
import { UserAvatar } from "@/components/ui/user-avatar";
import { formatDistanceToNow } from "date-fns";
import { USERS } from "@/store/userStore";

interface CommentListProps {
  comments: Comment[] | any; // Allow any to handle potential non-array response
  isLoading: boolean;
}

export function CommentList({ comments, isLoading }: CommentListProps) {
  // Ensure comments is an array
  const commentArray = Array.isArray(comments) ? comments : [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-3 animate-pulse">
            <div className="h-10 w-10 rounded-full bg-muted"></div>
            <div className="flex-1">
              <div className="h-4 w-24 bg-muted rounded mb-2"></div>
              <div className="h-3 w-full bg-muted rounded mb-1"></div>
              <div className="h-3 w-2/3 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (commentArray.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {commentArray.map((comment) => {
        // Find user by ID to display avatar and name
        const user =
          USERS.find((u) => u.id === comment.user_id) ||
          (comment.user
            ? {
                ...comment.user,
                email: "",
                avatarUrl: comment.user.avatarUrl || "",
              }
            : null);

        return (
          <div key={comment.id} className="flex gap-3">
            {user && (
              <UserAvatar user={user} size="sm" className="flex-shrink-0" />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">
                  {user?.name || "Unknown User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {comment.created_at
                    ? formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                      })
                    : ""}
                </span>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
