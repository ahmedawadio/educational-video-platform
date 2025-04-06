import React from "react";
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

interface CommentUserSwitcherProps {
  className?: string;
}

export function CommentUserSwitcher({ className }: CommentUserSwitcherProps) {
  const { currentUser, setCurrentUser } = useUserStore();
  const [open, setOpen] = React.useState(false);

  if (!currentUser) return null;

  return (
    <div className={cn("flex items-center justify-end", className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-between gap-2 h-9 border"
          >
            <div className="flex items-center gap-2">
              <UserAvatar user={currentUser} size="xs" />
              <span className="font-medium text-sm">{currentUser.name}</span>
            </div>
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={4} className="w-56">
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
    </div>
  );
}
