import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
  created_at: string;
  num_comments: number;
  categories?: string[];
  courses?: string[];
}

export interface CreateVideoRequest {
  user_id: string;
  title: string;
  description: string;
  video_url: string;
  categories?: string[];
  courses?: string[];
}

export interface EditVideoRequest {
  video_id: string;
  title: string;
  description: string;
}

export const videoService = {
  createVideo: async (videoData: CreateVideoRequest): Promise<string | Record<string, unknown>> => {
    try {
      const response = await axios.post(`${API_URL}/videos`, videoData);
      
      // Handle different response formats
      if (response.data && typeof response.data === 'object') {
        // If it's an object with an id field
        if ('id' in response.data || 'video_id' in response.data) {
          return response.data;
        }
        // If it's an object but doesn't have expected id fields
        console.warn('API response missing expected id fields:', response.data);
      }
      
      // If it's a string or other primitive, return as is
      return response.data;
    } catch (error) {
      console.error('Error creating video:', error);
      throw error;
    }
  },

  getUserVideos: async (userId: string): Promise<Video[]> => {
    try {
      const response = await axios.get(`${API_URL}/videos?user_id=${userId}`);
      // The API returns { videos: [...] } so we need to extract the videos array
      const videos = response.data?.videos || [];
      return Array.isArray(videos) ? videos : [];
    } catch (error) {
      console.error("Error fetching user videos:", error);
      return [];
    }
  },

  editVideo: async (editData: EditVideoRequest): Promise<string> => {
    console.log('EDIT VIDEO API REQUEST:', {
      url: `${API_URL}/videos`,
      method: 'PUT',
      data: editData
    });
    const response = await axios.put(`${API_URL}/videos`, editData);
    console.log('EDIT VIDEO API RESPONSE:', response.data, {response});
    return response.data;
  },

  getVideoById: async (videoId: string): Promise<any> => {
    const response = await axios.get(`${API_URL}/videos/single?video_id=${videoId}`);
    return response.data;
  }
};

export default videoService; 