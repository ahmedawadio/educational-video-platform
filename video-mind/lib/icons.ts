import {
  CompassIcon,
  UsersIcon,
  VideoIcon,
  UserIcon,
  BookOpenIcon,
  CpuIcon,
  CodeIcon,
  ServerIcon,
  BrainIcon,
  LayoutIcon,
  SparklesIcon,
  BookIcon,
  FolderIcon,
  LucideIcon,
  FolderOpenIcon,
  CameraIcon,
  PlayIcon,
} from "lucide-react";

type IconType = LucideIcon;

// For main navigation sections
export const navigationIcons = {
  explore: CompassIcon,
  courses: BookOpenIcon,
  users: UsersIcon,
  account: UserIcon,
  videos: VideoIcon,
  default: FolderIcon,
};

// For categories
export const categoryIcons: Record<string, IconType> = {
  "artificial-intelligence": SparklesIcon,
  "web-dev": CodeIcon,
  "mobile-dev": CameraIcon,
  "cloud-computing": ServerIcon,
  "data-science": CpuIcon,
  "blockchain": CodeIcon,
  default: FolderOpenIcon,
};

// For course types
export const courseIcons: Record<string, IconType> = {
  "deep-learning": BrainIcon,
  "machine-learning": CpuIcon,
  "react": LayoutIcon,
  "node": ServerIcon,
  "javascript": CodeIcon,
  "python": CodeIcon,
  "web-development": CodeIcon,
  "mobile-development": CameraIcon,
  "data-science": CpuIcon,
  "frontend": LayoutIcon,
  "backend": ServerIcon,
  default: BookIcon,
};

/**
 * Gets the appropriate icon component for a category
 * @param category The category slug
 * @returns The icon component for the category
 */
export function getCategoryIcon(category: string): IconType {
  return categoryIcons[category] || categoryIcons.default;
}

/**
 * Gets the appropriate icon component for a course
 * @param course The course slug 
 * @returns The icon component for the course
 */
export function getCourseIcon(course: string): IconType {
  return courseIcons[course] || courseIcons.default;
}

/**
 * Gets the appropriate icon component for a navigation item
 * @param key The navigation key
 * @returns The icon component for the navigation item
 */
export function getNavigationIcon(key: string): IconType {
  return navigationIcons[key as keyof typeof navigationIcons] || navigationIcons.default;
} 