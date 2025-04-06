import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store/userStore";
import { useCreateComment } from "@/hooks/useComments";
import { CreateCommentRequest } from "@/services/commentService";
import { cn } from "@/lib/utils";

interface CommentFormProps {
  videoId: string;
  className?: string;
}

export function CommentForm({ videoId, className }: CommentFormProps) {
  const [content, setContent] = useState("");
  const { currentUser } = useUserStore();
  const createCommentMutation = useCreateComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !currentUser || !videoId) return;

    const commentData: CreateCommentRequest = {
      video_id: videoId,
      content: content.trim(),
      user_id: currentUser.id,
    };

    try {
      await createCommentMutation.mutateAsync(commentData);
      setContent(""); // Clear form after successful submission
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  if (!currentUser) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-4 rounded-md border border-dashed",
          className
        )}
      >
        <p className="text-sm text-muted-foreground">
          Please sign in to comment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <Textarea
        placeholder={`Comment as ${currentUser.name}...`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="resize-none min-h-[80px] w-full"
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!content.trim() || createCommentMutation.isPending}
          size="sm"
        >
          {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </form>
  );
}
