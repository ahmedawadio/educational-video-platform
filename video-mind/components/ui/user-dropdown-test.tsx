"use client";

import { useUserStore, USERS } from "@/store/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";

export function UserDropdownTest() {
  const { currentUser, setCurrentUser } = useUserStore();

  if (!currentUser) return null;

  return (
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Test User Persistence</h2>
      <p className="text-muted-foreground mb-4">
        Current user: <strong>{currentUser.name}</strong>
      </p>

      <div className="mb-4">
        <p className="text-sm mb-2">Try selecting a different user:</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Change User</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select User</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {USERS.map((user) => (
              <DropdownMenuItem
                key={user.id}
                className="cursor-pointer py-2"
                onClick={() => setCurrentUser(user)}
              >
                <UserAvatar user={user} showName size="sm" />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Refresh the page to verify persistence.</p>
      </div>
    </div>
  );
}
