"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const nextTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const getThemeLabel = () => {
    return resolvedTheme === "light" ? "Light Mode" : "Dark Mode";
  };

  if (!mounted || !resolvedTheme) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={nextTheme}>
            <SunIcon
              className={`h-[1.2rem] w-[1.2rem] transition-all ${
                resolvedTheme === "light" ? "scale-100" : "scale-0"
              }`}
            />
            <MoonIcon
              className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                resolvedTheme === "dark" ? "scale-100" : "scale-0"
              }`}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={5} className="border-none">
          <p>{getThemeLabel()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
