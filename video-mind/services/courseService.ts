import axios from 'axios';

const API_URL = '/api/courses';

export interface Course {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  instructorId: string;
  enrolled: number;
  rating: number;
  duration: number; // in minutes
  lessons: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
}

export async function getCourses() {
  const response = await axios.get<Course[]>(API_URL);
  return response.data;
}

export async function getCourseBySlug(slug: string) {
  const response = await axios.get<Course>(`${API_URL}/${slug}`);
  return response.data;
}

export async function searchCourses(query: string) {
  const response = await axios.get<Course[]>(`${API_URL}/search?q=${query}`);
  return response.data;
} 