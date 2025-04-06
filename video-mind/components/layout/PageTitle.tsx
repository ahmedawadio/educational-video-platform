"use client";

import { usePathname } from "next/navigation";

export function PageTitle() {
  const pathname = usePathname();

  const getTitle = () => {
    switch (pathname) {
      case "/courses":
        return "Courses";
      case "/users":
        return "Users";
      case "/account":
        return "Account";
      default:
        return "Explore";
    }
  };

  return <h1 className="text-lg font-medium">{getTitle()}</h1>;
}
