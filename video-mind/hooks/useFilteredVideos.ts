import { useVideoStore } from "@/store/videoStore";
import { Video } from "@/services/videoService";
import { useMemo } from "react";

/**
 * Hook to filter videos by category
 */
export function useVideosByCategory(category: string): Video[] {
  const videos = useVideoStore((state) => state.videos);
  
  return useMemo(() => {
    if (!category) return [];
    
    const normalizedCategory = category.toLowerCase();
    return videos.filter(video => 
      video.categories?.some(cat => cat.toLowerCase() === normalizedCategory)
    );
  }, [videos, category]);
}

/**
 * Hook to filter videos by course
 */
export function useVideosByCourse(course: string): Video[] {
  const videos = useVideoStore((state) => state.videos);
  
  return useMemo(() => {
    if (!course) return [];
    
    const normalizedCourse = course.toLowerCase();
    return videos.filter(video => 
      video.courses?.some(c => c.toLowerCase() === normalizedCourse)
    );
  }, [videos, course]);
}

/**
 * Hook to filter videos by slug (either category or course)
 */
export function useVideosBySlug(slug: string): Video[] {
  const videos = useVideoStore((state) => state.videos);
  
  return useMemo(() => {
    if (!slug) return [];
    
    const normalizedSlug = slug.toLowerCase();
    return videos.filter(video => 
      video.categories?.some(cat => cat.toLowerCase() === normalizedSlug) ||
      video.courses?.some(c => c.toLowerCase() === normalizedSlug)
    );
  }, [videos, slug]);
}

/**
 * Hook to get all unique categories from videos
 */
export function useAllCategories(): string[] {
  const videos = useVideoStore((state) => state.videos);
  
  return useMemo(() => {
    const categoriesSet = new Set<string>();
    
    videos.forEach(video => {
      video.categories?.forEach(category => {
        if (category) categoriesSet.add(category);
      });
    });
    
    return Array.from(categoriesSet).sort();
  }, [videos]);
}

/**
 * Hook to get all unique courses from videos
 */
export function useAllCourses(): string[] {
  const videos = useVideoStore((state) => state.videos);
  
  return useMemo(() => {
    const coursesSet = new Set<string>();
    
    videos.forEach(video => {
      video.courses?.forEach(course => {
        if (course) coursesSet.add(course);
      });
    });
    
    return Array.from(coursesSet).sort();
  }, [videos]);
} 