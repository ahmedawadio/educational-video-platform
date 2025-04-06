"use client";

import { useState, useEffect } from "react";
import { useUserStore, User } from "@/store/userStore";

const useScratchpad = (videoId: string) => {
  const { currentUser } = useUserStore();
  // Use the username if available, otherwise use "guest" as fallback
  const username = currentUser?.username || "guest";
  const storageKey = `scratchpad-${username}-${videoId}`;
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Reset content when user changes
  useEffect(() => {
    setIsLoading(true);
    // Only run on client
    if (typeof window === "undefined") return;
    
    // Load content from localStorage based on current user
    const savedContent = localStorage.getItem(storageKey);
    if (savedContent) {
      setContent(savedContent);
    } else {
      // Clear content when switching to a user with no saved notes
      setContent("");
    }
    setIsLoading(false);
  }, [storageKey, username, currentUser?.id]);

  const updateContent = (newContent: string) => {
    setContent(newContent);
    // Save to localStorage
    localStorage.setItem(storageKey, newContent);
  };

  const clearContent = () => {
    setContent("");
    localStorage.removeItem(storageKey);
  };

  return {
    content,
    updateContent,
    clearContent,
    isLoading,
    currentUser
  };
};

export default useScratchpad; 