"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: User;
  size?: "xs" | "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
  withPadding?: boolean;
}

export function UserAvatar({
  user,
  size = "md",
  showName = false,
  className,
  withPadding = true,
}: UserAvatarProps) {
  const sizeClasses = {
    xs: "h-6 w-6",
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-12 w-12",
  };

  const fallbackText = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        withPadding && "pl-1",
        className
      )}
    >
      <Avatar className={cn(sizeClasses[size], "flex-shrink-0")}>
        <AvatarImage src={user.avatarUrl} alt={user.name} />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
      {showName && <span className="text-sm font-medium">{user.name}</span>}
    </div>
  );
}
