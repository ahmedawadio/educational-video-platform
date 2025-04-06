import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentService, Comment, CreateCommentRequest } from '@/services/commentService';

// Hook for fetching comments for a video
export const useVideoComments = (videoId: string) => {
  return useQuery({
    queryKey: ['videoComments', videoId],
    queryFn: async () => {
      const response = await commentService.getVideoComments(videoId);
      // Ensure we always return an array
      return Array.isArray(response) ? response : [];
    },
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for creating a new comment
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (commentData: CreateCommentRequest) => 
      commentService.createComment(commentData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch comments for this video
      queryClient.invalidateQueries({ 
        queryKey: ['videoComments', variables.video_id] 
      });
    },
  });
}; 