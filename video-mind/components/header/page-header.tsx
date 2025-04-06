import React from "react";
import { CategoryIcon } from "@/components/ui/category-icon";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  category: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  icon,
  category,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center gap-4 mb-4">
        <CategoryIcon category={category} icon={icon} size="lg" />
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
      {description && (
        <p className="text-lg text-muted-foreground mb-4 max-w-3xl">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
