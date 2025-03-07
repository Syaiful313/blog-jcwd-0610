import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetCategoryBySlug from "@/hooks/api/category/useGetCategoryBySlug";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const category = await useGetCategoryBySlug(slug);

  return (
    <main className="mx-4 md:mx-0">
      <div className="container mx-auto py-8 md:py-10">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/categories">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>
      </Button>
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{category.title}</h1>
          <p className="text-muted-foreground max-w-3xl">
            {category?.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.blogs.map((blog) => (
            <Card key={blog.objectId} className="flex h-full flex-col">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.thumbnail || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-2 p-6">
                <div className="flex justify-between">
                  <Badge variant="secondary">{category.title}</Badge>
                  <span className="text-muted-foreground text-sm">
                    {formatDate(blog.created)}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">
                  <Link
                    href={`/blog/${blog.objectId}`}
                    className="hover:underline"
                  >
                    {blog.title}
                  </Link>
                </CardTitle>
                <p className="text-muted-foreground line-clamp-3">
                  {blog.description}
                </p>
              </CardContent>
              <CardFooter className="flex items-center p-6 pt-0">
                <div className="flex items-center gap-2">
                  <Image
                    src={blog.author.avatar || "/placeholder.svg"}
                    alt={blog.author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-sm">{blog.author.name}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {category.blogs.length === 0 && (
          <div className="py-12 text-center">
            <h2 className="mb-4 text-2xl font-bold">
              No posts found in this category
            </h2>
            <p className="text-muted-foreground mb-6">
              Check back later for new content or explore other categories.
            </p>
            <Link
              href="/categories"
              className="bg-primary text-primary-foreground inline-block rounded-md px-4 py-2 text-sm font-medium"
            >
              Browse All Categories
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
