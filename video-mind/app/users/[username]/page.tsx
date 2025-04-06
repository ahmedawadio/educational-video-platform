"use client";

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { UserAvatar } from "@/components/ui/user-avatar";
import { PageHeader } from "@/components/header/page-header";
import { USERS, useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { MessageSquare, UserPlus, Pencil, Video } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { VideoList } from "@/components/videos/video-list";
import { useUserVideos } from "@/hooks/useVideos";
import { useVideoStore } from "@/store/videoStore";

type UserParams = {
  username: string;
};

type UserPageProps = {
  params: UserParams | Promise<UserParams>;
};

export default function UserPage({ params }: UserPageProps) {
  // We need to use React.use to unwrap the params promise
  const username =
    params instanceof Promise ? React.use(params).username : params.username;

  const { currentUser } = useUserStore();

  const user = USERS.find((u) => u.username === username);

  if (!user) {
    notFound();
  }

  // Get videos for this user
  const { data, isLoading, isError, refetch } = useUserVideos(user.id);
  const { videos } = useVideoStore();
  const videoArray = Array.isArray(videos) ? videos : [];

  // Fetch videos when the user changes
  useEffect(() => {
    if (user.id) {
      refetch();
    }
  }, [user.id, refetch]);

  // Check if this is the current user's profile
  const isCurrentUser = currentUser?.id === user.id;

  // Format username for display (capitalize each word and replace hyphens with spaces)
  const formattedUsername = username
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get user bio based on name
  const userBio = user.name.includes("Andy")
    ? "Passionate about software engineering and machine learning. Andy is an experienced developer with a focus on AI and cloud technologies. He has contributed to several open-source projects and is an active community mentor."
    : user.name.includes("Kelly")
    ? "UX designer with a specialization in educational platforms. Kelly brings years of experience designing intuitive interfaces for learning management systems. She believes in accessible design and creating engaging learning experiences."
    : "Full-stack developer focused on modern web technologies. Moe is proficient in React, Node.js, and cloud infrastructure. He enjoys building scalable applications and sharing knowledge through tutorials and workshops.";

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex flex-col items-center text-center mb-6">
              <UserAvatar user={user} size="lg" className="mb-4" />
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                {isCurrentUser && (
                  <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                    You
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                @{user.username}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {isCurrentUser ? (
                <Button className="w-full" asChild>
                  <Link href="/account">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
              ) : (
                <>
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-card rounded-lg p-6 border mb-6">
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-muted-foreground">{userBio}</p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Activity</h3>
            <div className="border-l-2 pl-4 py-2 border-muted">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">Yesterday</p>
                <p>Completed the "Introduction to Deep Learning" course</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">Last week</p>
                <p>Joined the React developer community</p>
              </div>
            </div>
          </div>

          {/* User Videos Section */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-2 mb-4">
              <Video className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Videos</h3>
            </div>
            <VideoList videos={videoArray} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
