"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useUserStore, USERS } from "@/store/userStore";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

interface UserSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function UserSwitcher({
  className,
  compact = false,
}: UserSwitcherProps) {
  const { currentUser, setCurrentUser } = useUserStore();
  const { open: sidebarOpen } = useSidebar();
  const [open, setOpen] = React.useState(false);

  if (!currentUser) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center justify-between gap-2 rounded-lg hover:bg-accent w-full h-auto",
            sidebarOpen ? "px-2 py-3" : "p-2",
            className
          )}
        >
          <div
            className={cn(
              "flex items-center",
              sidebarOpen
                ? "justify-start w-full"
                : "justify-center w-auto ml-0.5"
            )}
          >
            <UserAvatar
              user={currentUser}
              size={compact || !sidebarOpen ? "xs" : "sm"}
              showName={!compact && sidebarOpen}
              withPadding={false}
              className={sidebarOpen ? "pl-1" : ""}
            />
          </div>
          {!compact && sidebarOpen && (
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground opacity-70" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8} className="w-56">
        {USERS.map((user) => (
          <DropdownMenuItem
            key={user.id}
            className={cn(
              "cursor-pointer py-3",
              user.id === currentUser.id && "bg-accent"
            )}
            onClick={() => setCurrentUser(user)}
          >
            <UserAvatar user={user} showName size="xs" />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
