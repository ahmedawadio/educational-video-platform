import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface Comment {
  id: string;
  content: string;
  video_id: string;
  user_id: string;
  created_at: string;
  
}

export interface CreateCommentRequest {
  video_id: string;
  content: string;
  user_id: string;
}

export const commentService = {
  getVideoComments: async (videoId: string): Promise<Comment[]> => {
    try {
      const response = await axios.get(`${API_URL}/videos/comments`, {
        params: { video_id: videoId }
      });
      
      // Ensure we always return an array of comments
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && typeof response.data === 'object') {
        // If API returns an object with a comments property
        return Array.isArray(response.data.comments) ? response.data.comments : [];
      }
      
      // Default to empty array if response is not as expected
      return [];
    } catch (error) {
      console.error('Error fetching video comments:', error);
      return [];
    }
  },

  createComment: async (commentData: CreateCommentRequest): Promise<Comment | null> => {
    try {
      const response = await axios.post(`${API_URL}/videos/comments`, commentData);
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      return null;
    }
  },

  getCommentsByUser: async (userId: string): Promise<Comment[]> => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  },

  updateComment: async (id: string, content: string): Promise<Comment> => {
    const response = await axios.put(`${API_URL}/${id}`, { content });
    return response.data;
  },

  deleteComment: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  likeComment: async (id: string): Promise<Comment> => {
    const response = await axios.post(`${API_URL}/${id}/like`);
    return response.data;
  },

  unlikeComment: async (id: string): Promise<Comment> => {
    const response = await axios.post(`${API_URL}/${id}/unlike`);
    return response.data;
  }
};

export default commentService; 