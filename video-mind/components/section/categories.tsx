import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type CategoryData = {
  title: string;
  description: string;
  slug: string;
  icon?: React.ReactNode;
};

type CategoriesProps = {
  title: string;
  categories: CategoryData[];
};

export function Categories({ title, categories }: CategoriesProps) {
  return (
    <section className="w-full py-6">
      <div className="container">
        <h2 className="text-2xl font-bold tracking-tight mb-4">{title}</h2>
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/explore/${category.slug}`}
              className="group"
            >
              <Card className="overflow-hidden h-full border transition-colors hover:border-primary">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  {category.icon && (
                    <div className="text-primary">{category.icon}</div>
                  )}
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{category.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
