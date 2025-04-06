"use client";

import { useEffect, useState, useRef } from "react";
import useScratchpad from "@/hooks/useScratchpad";
import {
  Loader2,
  Copy,
  CheckCircle2,
  User,
  Trash2,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useUserStore } from "@/store/userStore";
import { UserSwitcher } from "@/components/ui/user-switcher";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ScratchpadEditorProps {
  videoId: string;
}

export function ScratchpadEditor({ videoId }: ScratchpadEditorProps) {
  const { content, updateContent, clearContent, isLoading, currentUser } =
    useScratchpad(videoId);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to adjust height based on content
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";
      // Set height to scrollHeight to fit content
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Update local state when content loads from localStorage
  useEffect(() => {
    if (!isLoading) {
      setText(content || "");
      // Adjust height after content is loaded and rendered
      setTimeout(adjustHeight, 0);
    }
  }, [isLoading, content, currentUser]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    updateContent(newText);
    // Adjust height whenever text changes
    adjustHeight();
  };

  const handleCopy = async () => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all notes?")) {
      setText("");
      clearContent();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[250px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden shadow-sm">
        <div className="flex items-center justify-between bg-muted/20 px-3 py-2 border-b">
          <div className="flex items-center gap-2">
            {currentUser && (
              <>
                <div className="text-sm font-medium">Notes</div>
              </>
            )}
            {!currentUser && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm font-medium">Guest Notes</div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              title="Copy notes"
              disabled={!text.trim()}
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="px-4 py-4 bg-background relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder={`Start typing you notes here...`}
            className={cn(
              "w-full min-h-[100px] bg-transparent resize-none border-0 focus:outline-none focus-visible:ring-0",
              "text-base text-foreground placeholder:text-muted-foreground "
            )}
          />
        </div>
      </div>
    </div>
  );
}
