"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { CategoryIcon } from "@/components/ui/category-icon";
import { getNavigationIcon, getCategoryIcon, getCourseIcon } from "@/lib/icons";
import { UserSwitcher } from "@/components/ui/user-switcher";

export function AppSidebar() {
  const pathname = usePathname();
  const { open, isMobile } = useSidebar();

  const isExploreActive =
    pathname === "/" ||
    pathname === "/explore" ||
    pathname.startsWith("/explore/");

  // Get icon components
  const ExploreIcon = getNavigationIcon("explore");
  const CoursesIcon = getNavigationIcon("courses");
  const UsersIcon = getNavigationIcon("users");
  const AccountIcon = getNavigationIcon("account");

  // Get category icons
  const AIIcon = getCategoryIcon("artificial-intelligence");
  const WebDevIcon = getCategoryIcon("web-dev");

  // Get course icons
  const DeepLearningIcon = getCourseIcon("deep-learning");
  const MachineLearningIcon = getCourseIcon("machine-learning");
  const ReactIcon = getCourseIcon("react");
  const NodeIcon = getCourseIcon("node");

  return (
    <Sidebar
      collapsible="icon"
      className={cn("border-r", isMobile && "data-[mobile=true]:border-none")}
    >
      <SidebarContent
        className={isMobile ? "sidebar-mobile-content" : undefined}
      >
        <div className="flex flex-col h-full">
          <div className={cn("p-6", !open && "p-3")}>
            <Link href="/explore" className="flex items-center gap-2">
              <Image
                src="/logo-light-mode.svg"
                alt="Video Mind Logo"
                width={24}
                height={24}
                className={cn(
                  "dark:hidden transition-all duration-200",
                  !open && "scale-110"
                )}
              />
              <Image
                src="/logo-dark-mode.svg"
                alt="Video Mind Logo"
                width={24}
                height={24}
                className={cn(
                  "hidden dark:block transition-all duration-200",
                  !open && "scale-110"
                )}
              />
              {open && <span className="font-semibold text-lg">VideoMind</span>}
            </Link>
          </div>

          {/* Current user section */}
          <div
            className={cn("mb-2", open ? "px-2" : "flex justify-center px-0.5")}
          >
            <UserSwitcher compact={!open} />
          </div>

          <div className="flex-1">
            <SidebarGroup>
              <SidebarMenu>
                {/* Explore section */}
                <SidebarMenuItem className="mb-1">
                  <Link href="/explore">
                    <SidebarMenuButton
                      isActive={pathname === "/" || pathname === "/explore"}
                      tooltip={!open ? "Explore" : undefined}
                      className="p-2"
                    >
                      <ExploreIcon className="h-5 w-5" />
                      {open && <span>Explore</span>}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>

                {/* Subcategories under Explore - always visible when sidebar is open */}
                {open && (
                  <div className="relative ml-5 pl-4 mb-2">
                    {/* Vertical line indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border rounded-full"></div>

                    <SidebarMenuItem className="mb-1.5">
                      <Link
                        href="/explore/artificial-intelligence"
                        className="w-full"
                      >
                        <div
                          className={cn(
                            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
                            pathname === "/explore/artificial-intelligence"
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                          )}
                        >
                          <CategoryIcon
                            category="artificial-intelligence"
                            icon={<AIIcon />}
                            size="sm"
                            className="mr-2"
                          />
                          <span>Artificial Intelligence</span>
                        </div>
                      </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <Link href="/explore/web-dev" className="w-full">
                        <div
                          className={cn(
                            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
                            pathname === "/explore/web-dev"
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                          )}
                        >
                          <CategoryIcon
                            category="web-dev"
                            icon={<WebDevIcon />}
                            size="sm"
                            className="mr-2"
                          />
                          <span>Web Development</span>
                        </div>
                      </Link>
                    </SidebarMenuItem>
                  </div>
                )}

                <SidebarMenuItem className="mt-1 mb-1">
                  <Link href="/courses">
                    <SidebarMenuButton
                      isActive={pathname === "/courses"}
                      tooltip={!open ? "Courses" : undefined}
                      className="p-2"
                    >
                      <CoursesIcon className="h-5 w-5" />
                      {open && <span>Courses</span>}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>

                {/* Courses subcategories - always visible when sidebar is open */}
                {open && (
                  <div className="relative ml-5 pl-4 mb-2">
                    {/* Vertical line indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border rounded-full"></div>

                    <SidebarMenuItem className="mb-1.5">
                      <Link href="/courses/deep-learning" className="w-full">
                        <div
                          className={cn(
                            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
                            pathname === "/courses/deep-learning"
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                          )}
                        >
                          <CategoryIcon
                            category="deep-learning"
                            icon={<DeepLearningIcon />}
                            size="sm"
                            className="mr-2"
                          />
                          <span>Deep Learning</span>
                        </div>
                      </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="mb-1.5">
                      <Link href="/courses/machine-learning" className="w-full">
                        <div
                          className={cn(
                            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
                            pathname === "/courses/machine-learning"
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                          )}
                        >
                          <CategoryIcon
                            category="machine-learning"
                            icon={<MachineLearningIcon />}
                            size="sm"
                            className="mr-2"
                          />
                          <span>Machine Learning</span>
                        </div>
                      </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="mb-1.5">
                      <Link href="/courses/react" className="w-full">
                        <div
                          className={cn(
                            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
                            pathname === "/courses/react"
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                          )}
                        >
                          <CategoryIcon
                            category="react"
                            icon={<ReactIcon />}
                            size="sm"
                            className="mr-2"
                          />
                          <span>React</span>
                        </div>
                      </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <Link href="/courses/node" className="w-full">
                        <div
                          className={cn(
                            "flex items-center px-2 py-1.5 text-sm rounded-md w-full",
                            pathname === "/courses/node"
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                          )}
                        >
                          <CategoryIcon
                            category="node"
                            icon={<NodeIcon />}
                            size="sm"
                            className="mr-2"
                          />
                          <span>Node</span>
                        </div>
                      </Link>
                    </SidebarMenuItem>
                  </div>
                )}

                <SidebarMenuItem className="mt-1 mb-1">
                  <Link href="/users">
                    <SidebarMenuButton
                      isActive={pathname.startsWith("/users")}
                      tooltip={!open ? "Users" : undefined}
                      className="p-2"
                    >
                      <UsersIcon className="h-5 w-5" />
                      {open && <span>Users</span>}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>

                <SidebarMenuItem className="mt-1">
                  <Link href="/account">
                    <SidebarMenuButton
                      isActive={pathname === "/account"}
                      tooltip={!open ? "Account" : undefined}
                      className="p-2"
                    >
                      <AccountIcon className="h-5 w-5" />
                      {open && <span>Account</span>}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </div>

          <div
            className={cn("flex p-4", !open ? "justify-center" : "justify-end")}
          >
            <ThemeToggle />
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
