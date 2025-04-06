import { create } from 'zustand';
import { Video } from '@/services/videoService';

interface VideoState {
  videos: Video[];
  currentVideo: Video | null;
  setVideos: (videos: Video[]) => void;
  setCurrentVideo: (video: Video | null) => void;
  addVideo: (video: Video) => void;
  updateVideo: (updatedVideo: Video) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  videos: [],
  currentVideo: null,
  
  setVideos: (videos) => set({ videos }),
  
  setCurrentVideo: (video) => set({ currentVideo: video }),
  
  addVideo: (video) => set((state) => ({
    videos: [...state.videos, video]
  })),
  
  updateVideo: (updatedVideo) => set((state) => ({
    videos: state.videos.map((video) => 
      video.id === updatedVideo.id ? updatedVideo : video
    ),
    currentVideo: state.currentVideo?.id === updatedVideo.id 
      ? updatedVideo 
      : state.currentVideo
  })),
})); 