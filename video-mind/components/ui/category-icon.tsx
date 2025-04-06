import React from "react";
import { getCategoryColor } from "@/lib/color-utils";
import { cn } from "@/lib/utils";

interface CategoryIconProps {
  category: string;
  icon: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CategoryIcon({
  category,
  icon,
  size = "md",
  className,
}: CategoryIconProps) {
  // Get the color values for the category
  const { color, background } = getCategoryColor(category);

  // Size mapping
  const sizeClasses = {
    sm: {
      container: "w-6 h-6 rounded-sm",
      icon: "w-4 h-4",
    },
    md: {
      container: "w-10 h-10 rounded-md",
      icon: "w-5 h-5",
    },
    lg: {
      container: "w-14 h-14 rounded-lg",
      icon: "w-7 h-7",
    },
  };

  // Clone the icon element with our custom color
  const styledIcon = React.cloneElement(icon as React.ReactElement, {
    className: cn(
      sizeClasses[size].icon,
      (icon as React.ReactElement).props.className
    ),
    style: { color },
  });

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        sizeClasses[size].container,
        className
      )}
      style={{ backgroundColor: background }}
    >
      {styledIcon}
    </div>
  );
}
