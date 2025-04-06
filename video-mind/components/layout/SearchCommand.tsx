"use client";

import { Search } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useVideoStore } from "@/store/videoStore";
import { USERS } from "@/store/userStore";

type SearchableItem = {
  id: string;
  type: "user" | "video" | "category" | "course";
  title: string;
  url: string;
};

// Maximum length for search result titles before truncation
const MAX_TITLE_LENGTH = 50;

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [forceRefresh, setForceRefresh] = useState(0);
  const router = useRouter();
  const { videos } = useVideoStore();

  // Force refresh after initial mount to ensure videos are loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceRefresh((prev) => prev + 1);
      // console.log("SearchCommand: Forced refresh after 1 second");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("Debug: videos in store =>", videos);
  }, [videos, forceRefresh]);

  // Extract categories and courses directly from videos
  const { allCategories, allCourses, categories } = useMemo(() => {
    const categoriesSet = new Set<string>();
    const coursesSet = new Set<string>();

    videos.forEach((video) => {
      // Extract categories
      video.categories?.forEach((category) => {
        if (category) categoriesSet.add(category);
      });

      // Extract courses
      video.courses?.forEach((course) => {
        if (course) coursesSet.add(course);
      });
    });

    // console.log(
    //   "SearchCommand: Extracted categories:",
    //   Array.from(categoriesSet)
    // );
    // console.log("SearchCommand: Extracted courses:", Array.from(coursesSet));

    const allCategoriesList = Array.from(categoriesSet).sort();
    const allCoursesList = Array.from(coursesSet).sort();

    // Map categories to searchable format
    const categoriesMapped = allCategoriesList.map((category) => ({
      id: category.toLowerCase().replace(/\s+/g, "-"),
      name: category,
    }));

    return {
      allCategories: allCategoriesList,
      allCourses: allCoursesList,
      categories: categoriesMapped,
    };
  }, [videos, forceRefresh]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (item: SearchableItem) => {
    setOpen(false);
    router.push(item.url);
  };

  const resetSearch = () => {
    setSearch("");
  };

  // Helper function to truncate text with ellipsis
  const truncateText = (text: string) => {
    if (!text) return "";
    return text.length > MAX_TITLE_LENGTH
      ? `${text.slice(0, MAX_TITLE_LENGTH)}...`
      : text;
  };

  // Filter results based on search term
  const results = useMemo(() => {
    if (!search) return [];

    const searchLower = search.toLowerCase();
    const filteredResults: SearchableItem[] = [];

    // Search users
    const userResults = USERS.filter((user) =>
      user.name.toLowerCase().includes(searchLower)
    ).map((user) => ({
      id: user.id,
      type: "user" as const,
      title: user.name,
      url: `/users/${user.username}`,
    }));
    filteredResults.push(...userResults);

    // Search videos
    const videoResults = videos
      .filter((video) => video.title?.toLowerCase().includes(searchLower))
      .map((video) => ({
        id: video.id,
        type: "video" as const,
        title: video.title,
        url: `/videos/${video.id}`,
      }));
    filteredResults.push(...videoResults);

    // Search categories
    const categoryResults = categories
      .filter((cat) => cat.name.toLowerCase().includes(searchLower))
      .map((cat) => ({
        id: cat.id,
        type: "category" as const,
        title: cat.name,
        url: `/explore/${cat.id}`,
      }));
    filteredResults.push(...categoryResults);

    // Search courses from video metadata
    const courseResults = allCourses
      .filter((course) => course.toLowerCase().includes(searchLower))
      .map((course) => ({
        id: course.toLowerCase().replace(/\s+/g, "-"),
        type: "course" as const,
        title: course,
        url: `/courses/${course.toLowerCase().replace(/\s+/g, "-")}`,
      }));

    filteredResults.push(...courseResults);

    return filteredResults;
  }, [search, videos, categories, allCourses]);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          // For mobile, show only the icon
          "relative h-9 md:w-[200px] lg:w-[300px]",
          "w-9 aspect-square md:aspect-auto justify-center md:justify-start",
          "text-sm text-muted-foreground md:pr-12"
        )}
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 md:mr-2" />
        <span className="sr-only md:not-sr-only md:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) resetSearch();
        }}
      >
        <CommandInput
          placeholder="Search users, videos, categories..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {!search ? (
            // Show helpful content when user hasn't typed anything
            <>
              <div className="px-3 py-3 text-sm text-muted-foreground">
                Start typing to search
              </div>
            </>
          ) : (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              {results.length > 0 && (
                <>
                  <CommandGroup heading="Users">
                    {results
                      .filter((item) => item.type === "user")
                      .map((item) => (
                        <CommandItem
                          key={`${item.type}-${item.id}`}
                          onSelect={() => handleSelect(item)}
                          className="truncate"
                          title={item.title}
                        >
                          {truncateText(item.title)}
                        </CommandItem>
                      ))}
                  </CommandGroup>

                  <CommandGroup heading="Videos">
                    {results
                      .filter((item) => item.type === "video")
                      .map((item) => (
                        <CommandItem
                          key={`${item.type}-${item.id}`}
                          onSelect={() => handleSelect(item)}
                          className="truncate"
                          title={item.title}
                        >
                          {truncateText(item.title)}
                        </CommandItem>
                      ))}
                  </CommandGroup>

                  <CommandGroup heading="Categories">
                    {results
                      .filter((item) => item.type === "category")
                      .map((item) => (
                        <CommandItem
                          key={`${item.type}-${item.id}`}
                          onSelect={() => handleSelect(item)}
                          className="truncate"
                          title={item.title}
                        >
                          {truncateText(item.title)}
                        </CommandItem>
                      ))}
                  </CommandGroup>

                  <CommandGroup heading="Courses">
                    {results
                      .filter((item) => item.type === "course")
                      .map((item) => (
                        <CommandItem
                          key={`${item.type}-${item.id}`}
                          onSelect={() => handleSelect(item)}
                          className="truncate"
                          title={item.title}
                        >
                          {truncateText(item.title)}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
