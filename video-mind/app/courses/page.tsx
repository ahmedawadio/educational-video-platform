import { Metadata } from "next";
import { PageHeader } from "@/components/header/page-header";
import { getNavigationIcon } from "@/lib/icons";
import { BrainCircuit, Cpu, Layout, Server } from "lucide-react";
import { Categories } from "@/components/section/categories";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse through our available courses",
};

export default function CoursesPage() {
  // Get the courses icon
  const CoursesIcon = getNavigationIcon("courses");

  const courses = [
    {
      title: "Deep Learning",
      description:
        "Dive deep into neural networks, backpropagation, and advanced AI concepts",
      slug: "deep-learning",
      icon: <BrainCircuit className="h-6 w-6" />,
    },
    {
      title: "Machine Learning",
      description:
        "Master fundamental ML algorithms, data preprocessing, and model evaluation",
      slug: "machine-learning",
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      title: "React",
      description:
        "Build modern user interfaces with React's component-based architecture",
      slug: "react",
      icon: <Layout className="h-6 w-6" />,
    },
    {
      title: "Node",
      description:
        "Create scalable server-side applications with JavaScript and Node.js",
      slug: "node",
      icon: <Server className="h-6 w-6" />,
    },
  ];

  return (
    <div className="container py-10">
      <PageHeader
        title="Learning Courses"
        description="Explore our comprehensive courses on various technologies and concepts"
        icon={<CoursesIcon />}
        category="courses"
      />

      {/* Popular Courses section */}
      <div className="mt-8">
        <Categories title="Popular Courses" categories={courses} />
      </div>
    </div>
  );
}
