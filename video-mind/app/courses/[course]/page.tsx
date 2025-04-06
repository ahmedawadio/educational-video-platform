import { Metadata } from "next";
import { CourseClient } from "@/app/courses/[course]/client-component";
import { getCourseIcon } from "@/lib/icons";

type CoursePageProps = {
  params: {
    course: string;
  };
};

export async function generateMetadata(props: CoursePageProps): Promise<Metadata> {
  const params = await Promise.resolve(props.params);
  const courseSlug = await Promise.resolve(params.course);

  const course = getCourseData(courseSlug);

  return {
    title: `${course.title} | Courses`,
    description: course.description,
  };
}

export type CourseData = {
  title: string;
  description: string;
  slug: string;
};

export function getCourseData(slug: string): CourseData {
  const courses: Record<string, CourseData> = {
    "deep-learning": {
      title: "Deep Learning",
      description:
        "Learn neural networks, deep learning architectures, and applications",
      slug: "deep-learning",
    },
    "machine-learning": {
      title: "Machine Learning",
      description:
        "Explore machine learning algorithms, techniques, and practical implementations",
      slug: "machine-learning",
    },
    react: {
      title: "React",
      description:
        "Master modern React development with hooks, state management, and best practices",
      slug: "react",
    },
    node: {
      title: "Node",
      description:
        "Build scalable backend applications with Node.js, Express, and databases",
      slug: "node",
    },
  };

  if (!courses[slug]) {
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

  return courses[slug];
}

export default function CoursePage(props: CoursePageProps) {
  return <CoursePageContent {...props} />;
}

async function CoursePageContent({ params }: CoursePageProps) {
  const resolvedParams = await Promise.resolve(params);
  const courseSlug = await Promise.resolve(resolvedParams.course);

  const course = getCourseData(courseSlug);
  const CourseIconComponent = getCourseIcon(courseSlug);

  return (
    <CourseClient
      course={course}
      courseSlug={courseSlug}
      icon={<CourseIconComponent />}
    />
  );
}
