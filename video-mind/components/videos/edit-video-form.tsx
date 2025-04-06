import { useState, useEffect } from "react";
import { useEditVideo } from "@/hooks/useVideos";
import { EditVideoRequest, Video } from "@/services/videoService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useVideoStore } from "@/store/videoStore";

interface EditVideoFormProps {
  video: Video;
  onSuccess?: () => void;
  onCancel: () => void;
}

export function EditVideoForm({
  video,
  onSuccess,
  onCancel,
}: EditVideoFormProps) {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);

  const editVideoMutation = useEditVideo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      return;
    }

    // Only send the fields that the API expects
    const videoData: EditVideoRequest = {
      video_id: video.id,
      title,
      description,
    };

    // Log the actual API request
    console.log(
      "%c EDIT VIDEO - HTTP REQUEST DATA",
      "background: #ff5722; color: white; padding: 2px 6px; border-radius: 2px;"
    );
    console.log({
      endpoint: "/videos",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoData, null, 2),
    });

    try {
      // After successful mutation, manually update the video store with the processed URL
      await editVideoMutation.mutateAsync(videoData);

      // Manually update the video in the store with the URL
      const { updateVideo } = useVideoStore.getState();

      // Update title and description only
      updateVideo({
        ...video,
        title,
        description,
      });

      console.log(
        "%c FINAL VIDEO OBJECT IN STORE",
        "background: #4caf50; color: white; padding: 2px 6px; border-radius: 2px;",
        {
          ...video,
          title,
          description,
        }
      );

      onSuccess?.();
      onCancel();
    } catch (error) {
      console.error("Failed to update video:", error);
    }
  };

  return (
    <Card className="bg-background border-border">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Edit Video</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">
              Title <span className="text-primary">*</span>
            </Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              required
              className={cn({
                "border-primary/50 focus-visible:ring-primary/30": !title,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">
              Description <span className="text-primary">*</span>
            </Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              rows={4}
              required
              className={cn({
                "border-primary/50 focus-visible:ring-primary/30": !description,
              })}
            />
          </div>

          <div className="space-y-2">
            <Label>Video URL</Label>
            <Input
              value={video.video_url}
              readOnly
              disabled
              className="text-sm bg-muted/20"
            />
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <Input
              value={
                video.categories && video.categories.length > 0
                  ? video.categories.join(", ")
                  : "No categories"
              }
              readOnly
              disabled
              className="text-sm bg-muted/20"
            />
          </div>

          <div className="space-y-2">
            <Label>Courses</Label>
            <Input
              value={
                video.courses && video.courses.length > 0
                  ? video.courses.join(", ")
                  : "No courses"
              }
              readOnly
              disabled
              className="text-sm bg-muted/20"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={!title || !description || editVideoMutation.isPending}
          >
            {editVideoMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
          <p className="text-xs text-muted-foreground ml-4 mr-auto">
            * Required fields
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
