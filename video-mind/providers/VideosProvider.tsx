import { useAllUsersVideos } from "@/hooks/useVideos";
import { ReactNode, useEffect } from "react";

interface GlobalVideosProviderProps {
  children: ReactNode;
}

/**
 * A component that loads videos from all users on mount
 * and updates the global video store.
 */
export function GlobalVideosProvider({ children }: GlobalVideosProviderProps) {
  // Load videos from all users
  const { data, isLoading, error } = useAllUsersVideos();

  // Log the videos whenever they change
  useEffect(() => {
    if (data) {
      console.log("All videos loaded into global store:", data);
    }
    if (error) {
      console.error("Error loading global videos:", error);
    }
  }, [data, error]);

  return <>{children}</>;
}
