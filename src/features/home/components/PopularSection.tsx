"use client";
import useGetCategories from "@/hooks/api/category/useGetCategory";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const PopularSection = () => {
  const { data = [], isPending } = useGetCategories();

  if (isPending) {
    return (
      <section className="bg-muted w-full py-12 md:py-24">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="bg-background space-y-3 rounded-lg p-6 shadow-sm transition-all hover:shadow-md"
              >
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted w-full py-12 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Popular Categories
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore content based on your interests
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((category, index) => (
            <Link
              id={category.id}
              key={index}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="bg-background space-y-3 rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
                <h3 className="text-xl font-bold">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
                <div className="text-primary flex items-center">
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
