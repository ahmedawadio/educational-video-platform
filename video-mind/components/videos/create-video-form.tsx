import { useState } from "react";
import { useCreateVideo } from "@/hooks/useVideos";
import { CreateVideoRequest } from "@/services/videoService";
import { useUserStore } from "@/store/userStore";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface CreateVideoFormProps {
  onSuccess?: () => void;
}

export function CreateVideoForm({ onSuccess }: CreateVideoFormProps) {
  const { currentUser } = useUserStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [categories, setCategories] = useState("");
  const [courses, setCourses] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const createVideoMutation = useCreateVideo();

  // Function to process comma-separated values and format for URL
  const formatForUrl = (input: string): string => {
    if (!input.trim()) return "";

    return input
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((item) => item.replace(/\s+/g, "-"))
      .join(",");
  };

  // Function to append params to URL
  const appendParamsToUrl = (baseUrl: string): string => {
    const url = new URL(baseUrl);
    const formattedCategories = formatForUrl(categories);
    const formattedCourses = formatForUrl(courses);

    if (formattedCategories) {
      url.searchParams.append("categories", formattedCategories);
    }

    if (formattedCourses) {
      url.searchParams.append("courses", formattedCourses);
    }

    return url.toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !videoUrl || !currentUser) {
      return;
    }

    // Append the parameters to the video URL
    const processedVideoUrl = appendParamsToUrl(videoUrl);

    // Get the formatted categories and courses for the video object
    const formattedCategories = formatForUrl(categories)
      .split(",")
      .filter((item) => item.length > 0);
    const formattedCourses = formatForUrl(courses)
      .split(",")
      .filter((item) => item.length > 0);

    const videoData: CreateVideoRequest = {
      user_id: currentUser.id,
      title,
      description,
      video_url: processedVideoUrl,
      categories: formattedCategories,
      courses: formattedCourses,
    };

    try {
      await createVideoMutation.mutateAsync(videoData);
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setCategories("");
      setCourses("");
      setIsFormOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create video:", error);
    }
  };

  if (!isFormOpen) {
    return (
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Video Management
        </h2>
        <Button
          onClick={() => setIsFormOpen(true)}
          variant="default"
          size="default"
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Upload Video</span>
        </Button>
      </div>
    );
  }

  return (
    <Card className="mt-4 bg-background border-border shadow-md">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 space-y-0">
        <CardTitle className="text-lg">Upload New Video</CardTitle>
        <Button
          onClick={() => setIsFormOpen(false)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
        >
          <X size={18} />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-primary">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              required
              aria-required="true"
              className={cn({
                "border-primary/50 focus-visible:ring-primary/30": !title,
              })}
            />
            {!title && title !== "" && (
              <p className="text-xs text-muted-foreground">Title is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-primary">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              rows={3}
              required
              aria-required="true"
              className={cn({
                "border-primary/50 focus-visible:ring-primary/30": !description,
              })}
            />
            {!description && description !== "" && (
              <p className="text-xs text-muted-foreground">
                Description is required
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl">
              Video URL <span className="text-primary">*</span>
            </Label>
            <Input
              id="videoUrl"
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
              required
              aria-required="true"
              className={cn({
                "border-primary/50 focus-visible:ring-primary/30": !videoUrl,
              })}
            />
            {!videoUrl && videoUrl !== "" && (
              <p className="text-xs text-muted-foreground">
                Video URL is required
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categories">
              Categories{" "}
              <span className="text-xs text-muted-foreground">
                (comma-separated, optional)
              </span>
            </Label>
            <Input
              id="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              placeholder="Artificial Intelligence, Web Development"
            />
            {categories && (
              <p className="text-xs text-muted-foreground">
                Will be added as: {formatForUrl(categories)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="courses">
              Courses{" "}
              <span className="text-xs text-muted-foreground">
                (comma-separated, optional)
              </span>
            </Label>
            <Input
              id="courses"
              value={courses}
              onChange={(e) => setCourses(e.target.value)}
              placeholder="Deep Learning, Machine Learning, React, Node"
            />
            {courses && (
              <p className="text-xs text-muted-foreground">
                Will be added as: {formatForUrl(courses)}
              </p>
            )}
          </div>

          <div className="flex pt-4 items-center">
            <Button
              type="submit"
              disabled={
                createVideoMutation.isPending ||
                !currentUser ||
                !title ||
                !description ||
                !videoUrl
              }
              className="mr-auto"
            >
              {createVideoMutation.isPending ? "Uploading..." : "Upload Video"}
            </Button>
            <p className="text-xs text-muted-foreground ml-4">
              * Required fields
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
