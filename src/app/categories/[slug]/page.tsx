import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug, getPostsByCategory } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(params.slug);

  return (
    <div className="container px-4 sm:px-6 mx-auto py-6 sm:py-10">
      <Button variant="ghost" asChild className="mb-4 sm:mb-8 -ml-3">
        <Link href="/categories">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>
      </Button>

      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">{category.title}</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2">{category.description}</p>
      </div>

      {posts.length === 0 ? (
        <div className="py-8 sm:py-10 text-center">
          <h3 className="text-lg font-medium">No posts found</h3>
          <p className="text-muted-foreground mt-2">
            There are no posts in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/articles/${post.slug}`} className="group">
              <div className="flex h-full flex-col space-y-2 sm:space-y-3 overflow-hidden rounded-lg border">
                <div className="overflow-hidden">
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="h-40 sm:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 space-y-1 sm:space-y-2 p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold line-clamp-2">{post.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 pt-1 sm:pt-2">
                    <Image
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="rounded-full h-5 w-5 sm:h-6 sm:w-6"
                    />
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      {post.author.name}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}