import React from "react";
import Link from "next/link";
import { getCategoryColor } from "@/lib/color-utils";
import { cn } from "@/lib/utils";

interface Badge {
  type: "category" | "course";
  value: string;
  href: string;
}

export interface VideoBadgesProps {
  categories?: string[];
  courses?: string[];
  className?: string;
  maxBadges?: number;
}

export function VideoBadges({
  categories = [],
  courses = [],
  className = "",
  maxBadges = 3
}: VideoBadgesProps) {
  // Combine categories and courses for badges
  const allBadges: Badge[] = [
    ...(categories || []).map(
      (item): Badge => ({
        type: "category",
        value: item,
        href: `/explore/${item}`,
      })
    ),
    ...(courses || []).map(
      (item): Badge => ({
        type: "course",
        value: item,
        href: `/courses/${item}`,
      })
    ),
  ];

  // Limit to specified number of badges to ensure they fit in one row
  const displayBadges = allBadges.slice(0, maxBadges);
  const hasMoreBadges = allBadges.length > maxBadges;

  if (displayBadges.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center flex-nowrap overflow-x-auto scrollbar-hide gap-1", className)}>
      {displayBadges.map((badge, idx) => {
        const { color, background } = getCategoryColor(badge.value);
        return (
          <Link
            key={`${badge.value}-${idx}`}
            href={badge.href}
            className="text-xs py-1 px-2 rounded-full hover:opacity-90 transition-colors whitespace-nowrap flex-shrink-0"
            style={{
              color: color,
              backgroundColor: background,
            }}
          >
            {badge.value}
          </Link>
        );
      })}
      {hasMoreBadges && (
        <span className="text-xs text-muted-foreground flex-shrink-0">
          +{allBadges.length - maxBadges} more
        </span>
      )}
    </div>
  );
}