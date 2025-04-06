"use client";

import { useUserStore, USERS } from "@/store/userStore";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserProfile() {
  const { currentUser, setCurrentUser } = useUserStore();

  if (!currentUser) return null;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center">
          <UserAvatar user={currentUser} size="lg" className="mb-4" />
          <h2 className="text-xl font-bold">{currentUser.name}</h2>
          <p className="text-sm text-muted-foreground">
            @{currentUser.username}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Full Name</Label>
            <Input
              id="profile-name"
              value={currentUser.name}
              readOnly
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-username">Username</Label>
            <Input
              id="profile-username"
              value={`@${currentUser.username}`}
              readOnly
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              value={currentUser.email}
              readOnly
              disabled
            />
          </div>

          <div className="pt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full" variant="outline">
                  <UserCog className="h-4 w-4 mr-2" />
                  Change User
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuLabel>Select User</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {USERS.map((user) => (
                  <DropdownMenuItem
                    key={user.id}
                    className={`cursor-pointer py-3 ${
                      user.id === currentUser.id ? "bg-accent" : ""
                    }`}
                    onClick={() => setCurrentUser(user)}
                  >
                    <UserAvatar user={user} showName size="sm" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
