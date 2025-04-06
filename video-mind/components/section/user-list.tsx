"use client";

import React from "react";
import Link from "next/link";
import { USERS, useUserStore } from "@/store/userStore";
import { UserAvatar } from "@/components/ui/user-avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, UserPlus, Pencil } from "lucide-react";

export function UserList() {
  const { currentUser } = useUserStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {USERS.map((user) => {
        const isCurrentUser = currentUser?.id === user.id;

        return (
          <Card key={user.id} className="overflow-hidden flex flex-col h-full">
            <CardHeader className="p-6 pb-4">
              <Link href={`/users/${user.username}`} className="group">
                <div className="flex items-center gap-4">
                  <UserAvatar user={user} size="lg" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {user.name}
                      </h3>
                      {isCurrentUser && (
                        <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </Link>
            </CardHeader>
            <CardContent className="p-6 pt-0 pb-4 flex-grow">
              <p className="text-sm">
                {user.name.includes("Andy")
                  ? "Passionate about software engineering and machine learning."
                  : user.name.includes("Kelly")
                  ? "UX designer with a specialization in educational platforms."
                  : "Full-stack developer focused on modern web technologies."}
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-4 pb-4 border-t flex gap-2 items-center justify-center min-h-[68px]">
              {isCurrentUser ? (
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/account">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="w-1/2">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="w-1/2">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
