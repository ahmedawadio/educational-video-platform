import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import videoService, { 
  CreateVideoRequest, 
  EditVideoRequest, 
  Video 
} from '@/services/videoService';
import { useVideoStore } from '@/store/videoStore';
import { useEffect } from 'react';
import { USERS } from '@/store/userStore';

// Keys for React Query
export const videoKeys = {
  all: ['videos'] as const,
  allUsers: () => [...videoKeys.all, 'all-users'] as const,
  user: (userId: string) => [...videoKeys.all, 'user', userId] as const,
  detail: (videoId: string) => [...videoKeys.all, 'detail', videoId] as const,
};

// Function to extract categories and courses from URL parameters
const extractParamsFromUrl = (url: string): { categories: string[], courses: string[] } => {
  try {
    const parsedUrl = new URL(url);
    const categories = parsedUrl.searchParams.get('categories')?.split(',') || [];
    const courses = parsedUrl.searchParams.get('courses')?.split(',') || [];
    return { categories, courses };
  } catch (error) {
    console.error('Failed to parse URL:', url, error);
    return { categories: [], courses: [] };
  }
};

// Function to process videos and add categories and courses
const processVideos = (videos: Video[]): Video[] => {
  return videos.map(video => {
    const { categories, courses } = extractParamsFromUrl(video.video_url);
    return {
      ...video,
      categories,
      courses
    };
  });
};

// New hook to fetch videos from all users
export const useAllUsersVideos = () => {
  const { setVideos, videos } = useVideoStore();
  const queryClient = useQueryClient();
  
  // Fetch videos for a single user
  const fetchUserVideos = async (userId: string): Promise<Video[]> => {
    try {
      const videos = await videoService.getUserVideos(userId);
      return processVideos(videos);
    } catch (error) {
      console.error(`Error fetching videos for user ${userId}:`, error);
      return [];
    }
  };
  
  // Fetch videos for all users
  const fetchAllUsersVideos = async (): Promise<Video[]> => {
    try {
      const allVideosPromises = USERS.map(user => fetchUserVideos(user.id));
      const allUsersVideos = await Promise.all(allVideosPromises);
      
      // Flatten the array of arrays into a single array of videos
      const flattenedVideos = allUsersVideos.flat();
      
      // Sort by created_at date (newest first)
      return flattenedVideos.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } catch (error) {
      console.error('Error fetching all users videos:', error);
      return [];
    }
  };
  
  // Query to fetch videos from all users
  const query = useQuery({
    queryKey: videoKeys.allUsers(),
    queryFn: fetchAllUsersVideos,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Update the video store when data changes
  useEffect(() => {
    if (query.data) {
      setVideos(query.data);
      console.log('Global video store updated with all users videos:', query.data);
    }
  }, [query.data, setVideos]);
  
  return query;
};

// Get all videos from a user
export const useUserVideos = (userId: string) => {
  const { setVideos } = useVideoStore();
  
  return useQuery({
    queryKey: videoKeys.user(userId),
    queryFn: async () => {
      const response = await videoService.getUserVideos(userId);
      // Process videos to extract categories and courses
      const processedVideos = processVideos(response);
      
      // Store the processed videos in the global store
      setVideos(processedVideos);
      
      return processedVideos;
    },
    enabled: !!userId,
  });
};

// Get a single video
export const useVideo = (videoId: string) => {
  const { setCurrentVideo } = useVideoStore();
  
  return useQuery({
    queryKey: videoKeys.detail(videoId),
    queryFn: async () => {
      const data = await videoService.getVideoById(videoId);
      
      // Check if the response has a nested video object
      if (data && typeof data === 'object' && 'video' in data) {
        // Process the video to add categories and courses
        const videoData = data.video as Video;
        const processedVideo = {
          ...videoData,
          ...extractParamsFromUrl(videoData.video_url)
        };
        
        // Set the processed video in the store
        setCurrentVideo(processedVideo);
        return data;
      }
      
      // If the data is directly a video object
      if (data && typeof data === 'object' && 'video_url' in data) {
        // Process the video to add categories and courses
        const videoData = data as Video;
        const processedVideo = {
          ...videoData,
          ...extractParamsFromUrl(videoData.video_url)
        };
        
        // Set the processed video in the store
        setCurrentVideo(processedVideo);
      } else {
        console.error("Unexpected video data format:", data);
      }
      
      return data;
    },
    enabled: !!videoId,
  });
};

// Create a video
export const useCreateVideo = () => {
  const queryClient = useQueryClient();
  const { addVideo } = useVideoStore();
  
  return useMutation({
    mutationFn: (newVideo: CreateVideoRequest) => videoService.createVideo(newVideo),
    onSuccess: (data, variables) => {
      // Handle different response formats from the API
      let videoId: string;
      
      if (typeof data === 'string') {
        // Direct string ID response
        videoId = data;
      } else if (data && typeof data === 'object') {
        // Object response with an id property
        const responseObj = data as Record<string, unknown>;
        if ('id' in responseObj) {
          videoId = responseObj.id as string;
        } else if ('video_id' in responseObj) {
          videoId = responseObj.video_id as string;
        } else {
          // Fallback to a generated ID if no ID is found
          videoId = `temp-${Date.now()}`;
          console.warn('No ID found in API response, using temporary ID:', videoId);
        }
      } else {
        // Fallback for unexpected response
        videoId = `temp-${Date.now()}`;
        console.warn('Unexpected API response format, using temporary ID:', videoId);
      }
      
      const newVideoWithId: Video = {
        id: videoId,
        title: variables.title,
        description: variables.description,
        video_url: variables.video_url,
        user_id: variables.user_id,
        created_at: new Date().toISOString(), // Use current time as fallback
        num_comments: 0 // Initialize with 0 comments
      };
      
      addVideo(newVideoWithId);
      
      // Invalidate the user videos query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: videoKeys.user(variables.user_id) });
    },
  });
};

// Edit a video
export const useEditVideo = () => {
  const queryClient = useQueryClient();
  const { updateVideo } = useVideoStore();
  
  return useMutation({
    mutationFn: (editData: EditVideoRequest) => {
      console.log('EDIT VIDEO MUTATION - Starting with data:', editData);
      return videoService.editVideo(editData);
    },
    onSuccess: (response, variables) => {
      console.log('EDIT VIDEO MUTATION - Success response:', response);
      console.log('EDIT VIDEO MUTATION - Variables used:', variables);
      
      // We need to refetch the video to get the updated data
      queryClient.invalidateQueries({ queryKey: videoKeys.detail(variables.video_id) });
      
      // Get the user ID from the store to invalidate user videos
      const { videos } = useVideoStore.getState();
      const video = videos.find(v => v.id === variables.video_id);
      console.log('EDIT VIDEO MUTATION - Found video in store:', video);
      
      if (video) {
        // Update the video in the store
        const updatedVideo = {
          ...video,
          title: variables.title,
          description: variables.description,
        };
        console.log('EDIT VIDEO MUTATION - Updating store with:', updatedVideo);
        updateVideo(updatedVideo);
        
        // Invalidate the user videos query
        queryClient.invalidateQueries({ queryKey: videoKeys.user(video.user_id) });
      }
    },
    onError: (error, variables) => {
      console.error('EDIT VIDEO MUTATION - Error:', error);
      console.error('EDIT VIDEO MUTATION - Failed with variables:', variables);
    }
  });
}; 