import { Metadata } from "next";
import { getCategoryIcon } from "@/lib/icons";
import { CategoryClient } from "@/app/explore/[category]/client-component";

// Define the type for the parameters
type CategoryPageProps = {
  params: {
    category: string;
  };
};

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  // Use a local variable to store the resolved value
  const params = await Promise.resolve(props.params);
  const categorySlug = await Promise.resolve(params.category);
  
  const category = getCategoryData(categorySlug);

  return {
    title: `${category.title} | Explore`,
    description: category.description,
  };
}

export type CategoryData = {
  title: string;
  description: string;
  slug: string;
};

export function getCategoryData(slug: string): CategoryData {
  const categories: Record<string, CategoryData> = {
    "artificial-intelligence": {
      title: "Artificial Intelligence",
      description:
        "Explore AI concepts, machine learning, neural networks, and practical applications",
      slug: "artificial-intelligence",
    },
    "web-dev": {
      title: "Web Development",
      description:
        "Learn web technologies, frameworks, best practices, and building modern web applications",
      slug: "web-dev",
    },
    other: {
      title: "Other Categories",
      description: "Discover more specialized topics and emerging technologies",
      slug: "other",
    },
  };

  // If the category is not in our predefined list, create a default one with formatted title
  if (!categories[slug]) {
    // Format the slug into a readable title (e.g., "mobile-dev" -> "Mobile Dev")
    const formattedTitle = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      title: formattedTitle,
      description: `Explore ${formattedTitle} content and resources`,
      slug: slug,
    };
  }

  return categories[slug];
}

// Use a client component wrapper
export default function CategoryPage(props: CategoryPageProps) {
  return <CategoryPageContent {...props} />;
}

// Create an async server component to handle the data fetching
async function CategoryPageContent({ params }: CategoryPageProps) {
  // Use a local variable to store the resolved value
  const resolvedParams = await Promise.resolve(params);
  const categorySlug = await Promise.resolve(resolvedParams.category);
  
  const category = getCategoryData(categorySlug);

  // Get the appropriate icon for this category, or use default
  const CategoryIconComponent = getCategoryIcon(categorySlug);

  return (
    <CategoryClient
      category={category}
      categorySlug={categorySlug}
      icon={<CategoryIconComponent />}
    />
  );
}