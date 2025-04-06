import { Metadata } from "next";
import { Brain, Code } from "lucide-react";
import { Categories } from "@/components/section/categories";
import { PageHeader } from "@/components/header/page-header";
import { getNavigationIcon } from "@/lib/icons";
import { ExploreClient } from "./client-component";

export const metadata: Metadata = {
  title: "Explore Categories",
  description: "Browse through different categories of content",
};

export default function ExplorePage() {
  const categories = [
    {
      title: "Artificial Intelligence",
      description:
        "Explore AI concepts, machine learning, neural networks, and practical applications",
      slug: "artificial-intelligence",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: "Web Development",
      description:
        "Learn web technologies, frameworks, best practices, and building modern web applications",
      slug: "web-dev",
      icon: <Code className="h-6 w-6" />,
    },
  ];

  // Get the explore icon from the navigation icons
  const ExploreIcon = getNavigationIcon("explore");

  return (
    <div className="container py-10">
      <PageHeader
        title="Explore Learning Paths"
        description="Discover curated content across different domains and technologies"
        icon={<ExploreIcon />}
        category="explore"
      />

      {/* Popular Categories section */}
      <div className="mt-8 mb-16">
        <Categories title="Popular Categories" categories={categories} />
      </div>

      {/* Display all videos */}
      <ExploreClient />
    </div>
  );
}
