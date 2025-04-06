"use client";

import { useRef, useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize store on client side
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    // Optional: show a minimal loading state before hydration
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
